import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const QUIZ_PROGRESS_STORAGE_KEY = 'placement-portal::quiz-progress'

const createDefaultState = () => ({
  attempts: {},
  category: {},
  difficulty: {},
  totals: {
    attempts: 0,
    correct: 0,
    timeSpentMinutes: 0,
  },
  history: [],
  lastUpdated: null,
})

const loadStoredState = () => {
  if (typeof window === 'undefined') return createDefaultState()
  try {
    const raw = window.localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY)
    if (!raw) return createDefaultState()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return createDefaultState()
    return {
      ...createDefaultState(),
      ...parsed,
      attempts: parsed.attempts || {},
      category: parsed.category || {},
      difficulty: parsed.difficulty || {},
      totals: {
        attempts: parsed.totals?.attempts || 0,
        correct: parsed.totals?.correct || 0,
        timeSpentMinutes: parsed.totals?.timeSpentMinutes || 0,
      },
      history: Array.isArray(parsed.history) ? parsed.history : [],
      lastUpdated: parsed.lastUpdated || null,
    }
  } catch (error) {
    console.error('Unable to load quiz progress state', error)
    return createDefaultState()
  }
}

const QuizContext = createContext(null)

const adjustBucket = (bucket, key, deltaAttempts, deltaCorrect) => {
  const safeKey = key || 'general'
  const current = bucket[safeKey] || { attempts: 0, correct: 0 }
  const nextAttempts = Math.max(0, current.attempts + deltaAttempts)
  const nextCorrect = Math.min(Math.max(0, current.correct + deltaCorrect), Math.max(0, nextAttempts))

  const nextBucket = { ...bucket }
  if (!nextAttempts) {
    delete nextBucket[safeKey]
  } else {
    nextBucket[safeKey] = {
      attempts: nextAttempts,
      correct: nextCorrect,
    }
  }
  return nextBucket
}

export const QuizProvider = ({ children }) => {
  const [state, setState] = useState(loadStoredState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Unable to persist quiz progress state', error)
    }
  }, [state])

  const recordAttempt = useCallback(
    ({
      questionId,
      correct,
      category,
      difficulty,
      timeTaken = 1,
      prompt = '',
      source = 'quiz',
      quizId = null,
    }) => {
      if (!questionId) return

      setState((prev) => {
        const timestamp = Date.now()
        const prevAttempt = prev.attempts[questionId]

        let totals = { ...prev.totals }
        let categoryBucket = { ...prev.category }
        let difficultyBucket = { ...prev.difficulty }
        let history = [...prev.history]
        const attempts = { ...prev.attempts }

        if (prevAttempt) {
          totals.attempts = Math.max(0, totals.attempts - 1)
          totals.correct = Math.max(0, totals.correct - (prevAttempt.correct ? 1 : 0))
          totals.timeSpentMinutes = Math.max(0, totals.timeSpentMinutes - (prevAttempt.timeTaken || 0))

          categoryBucket = adjustBucket(
            categoryBucket,
            prevAttempt.category,
            -1,
            prevAttempt.correct ? -1 : 0,
          )
          difficultyBucket = adjustBucket(
            difficultyBucket,
            prevAttempt.difficulty,
            -1,
            prevAttempt.correct ? -1 : 0,
          )

          delete attempts[questionId]
          history = history.filter((entry) => entry.questionId !== questionId)
        }

        totals = {
          attempts: totals.attempts + 1,
          correct: totals.correct + (correct ? 1 : 0),
          timeSpentMinutes: totals.timeSpentMinutes + (timeTaken || 0),
        }

        const normalizedCategory = category || 'general'
        const normalizedDifficulty = difficulty || 'unknown'

        categoryBucket = adjustBucket(
          categoryBucket,
          normalizedCategory,
          1,
          correct ? 1 : 0,
        )
        difficultyBucket = adjustBucket(
          difficultyBucket,
          normalizedDifficulty,
          1,
          correct ? 1 : 0,
        )

        const attemptRecord = {
          questionId,
          correct,
          category: normalizedCategory,
          difficulty: normalizedDifficulty,
          timeTaken,
          prompt,
          source,
          quizId,
          updatedAt: timestamp,
        }

        attempts[questionId] = attemptRecord

        const updatedHistory = [
          {
            id: `${questionId}-${timestamp}`,
            questionId,
            correct,
            category: normalizedCategory,
            difficulty: normalizedDifficulty,
            timeTaken,
            timestamp,
            prompt,
            source,
            quizId,
          },
          ...history,
        ].slice(0, 25)

        return {
          attempts,
          category: categoryBucket,
          difficulty: difficultyBucket,
          totals,
          history: updatedHistory,
          lastUpdated: timestamp,
        }
      })
    },
    [],
  )

  const resetProgress = useCallback(() => {
    setState(createDefaultState())
  }, [])

  const value = useMemo(() => {
    const accuracy = state.totals.attempts
      ? Math.round((state.totals.correct / state.totals.attempts) * 100)
      : 0

    const categoryBreakdown = Object.entries(state.category).map(([key, value]) => ({
      category: key,
      attempts: value.attempts,
      correct: value.correct,
      averageScore: value.attempts
        ? Math.round((value.correct / value.attempts) * 100)
        : 0,
    }))

    const difficultyBreakdown = Object.entries(state.difficulty).map(([key, value]) => ({
      difficulty: key,
      attempts: value.attempts,
      correct: value.correct,
      averageScore: value.attempts
        ? Math.round((value.correct / value.attempts) * 100)
        : 0,
    }))

    let quickPracticeStats = {
      answered: 0,
      correct: 0,
      timeSpentMinutes: 0,
    }

    const groupedQuizStats = Object.values(state.attempts).reduce((acc, attempt) => {
      if (attempt.quizId === 'quick-practice') {
        quickPracticeStats = {
          answered: quickPracticeStats.answered + 1,
          correct: quickPracticeStats.correct + (attempt.correct ? 1 : 0),
          timeSpentMinutes: quickPracticeStats.timeSpentMinutes + (attempt.timeTaken || 0),
        }
        return acc
      }

      if (!attempt.quizId) {
        return acc
      }

      const existing = acc[attempt.quizId] || {
        answered: 0,
        correct: 0,
        timeSpentMinutes: 0,
        lastUpdated: 0,
      }

      const answered = existing.answered + 1
      const correctTotal = existing.correct + (attempt.correct ? 1 : 0)
      const timeSpent = existing.timeSpentMinutes + (attempt.timeTaken || 0)
      const lastUpdated = Math.max(existing.lastUpdated, attempt.updatedAt || 0)

      acc[attempt.quizId] = {
        answered,
        correct: correctTotal,
        timeSpentMinutes: timeSpent,
        lastUpdated,
      }

      return acc
    }, {})

    const quizStats = Object.entries(groupedQuizStats).reduce((acc, [quizId, data]) => {
      const accuracyForQuiz = data.answered
        ? Math.round((data.correct / data.answered) * 100)
        : 0

      acc[quizId] = {
        ...data,
        accuracy: accuracyForQuiz,
      }
      return acc
    }, {})

    const quickPractice = quickPracticeStats.answered
      ? {
          attempts: quickPracticeStats.answered,
          correct: quickPracticeStats.correct,
          timeSpentMinutes: quickPracticeStats.timeSpentMinutes,
          accuracy: Math.round((quickPracticeStats.correct / quickPracticeStats.answered) * 100),
        }
      : {
          attempts: 0,
          correct: 0,
          timeSpentMinutes: 0,
          accuracy: 0,
        }

    return {
      totals: state.totals,
      categoryStats: state.category,
      difficultyStats: state.difficulty,
      history: state.history,
      lastUpdated: state.lastUpdated,
      accuracy,
      categoryBreakdown,
      difficultyBreakdown,
      quizStats,
      quickPractice,
      recordAttempt,
      resetProgress,
    }
  }, [recordAttempt, resetProgress, state])

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
