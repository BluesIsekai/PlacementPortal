import { quizCatalog } from './quizzes'

const calculateAverageScore = (quizzes) => {
  const scored = quizzes.filter((quiz) => typeof quiz.score === 'number')
  if (!scored.length) return 0
  const total = scored.reduce((sum, quiz) => sum + quiz.score, 0)
  return Math.round(total / scored.length)
}

const formatTotalTime = (minutes) => {
  if (!minutes) return '0h 0m'
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return `${hours}h ${remainder}m`
}

const completedQuizzes = quizCatalog.filter((quiz) => quiz.completed)
const totalMinutesSpent = completedQuizzes.reduce((sum, quiz) => sum + (quiz.time || 0), 0)

export const stats = {
  totalQuizzes: quizCatalog.length,
  completedQuizzes: completedQuizzes.length,
  averageScore: calculateAverageScore(quizCatalog),
  totalTimeSpent: formatTotalTime(totalMinutesSpent),
}

export const quizzes = quizCatalog
