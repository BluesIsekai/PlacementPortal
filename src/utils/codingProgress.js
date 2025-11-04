import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'

export const INITIAL_CODING_STATS = Object.freeze({
  problemsSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
})

const LOCAL_STORAGE_KEY = 'pp_coding_progress'
const PERMISSION_RETRY_DELAY_MS = 5 * 60 * 1000

const firebaseFailureCache = new Map()
let hasLoggedPermissionWarning = false

const readLocalProgress = (userId) => {
  if (typeof window === 'undefined') {
    return {
      stats: { ...INITIAL_CODING_STATS },
      solvedProblems: {},
    }
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      return {
        stats: { ...INITIAL_CODING_STATS },
        solvedProblems: {},
      }
    }
    const parsed = JSON.parse(raw)
    const entry = parsed?.[userId]
    if (!entry) {
      return {
        stats: { ...INITIAL_CODING_STATS },
        solvedProblems: {},
      }
    }
    return {
      stats: { ...INITIAL_CODING_STATS, ...(entry.stats || {}) },
      solvedProblems: normalizeSolvedProblems(entry.solvedProblems || {}),
    }
  } catch (error) {
    console.warn('Failed to read local coding progress', error)
    return {
      stats: { ...INITIAL_CODING_STATS },
      solvedProblems: {},
    }
  }
}

const writeLocalProgress = (userId, data) => {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    const existing = raw ? JSON.parse(raw) : {}
    existing[userId] = {
      stats: { ...INITIAL_CODING_STATS, ...(data.stats || {}) },
      solvedProblems: data.solvedProblems || {},
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing))
  } catch (error) {
    console.warn('Failed to persist local coding progress', error)
  }
}

const getProgressDocRef = (userId) => {
  if (!db) {
    throw new Error('Firebase is not configured')
  }
  return doc(db, 'codingProgress', userId)
}

export const ensureCodingProgress = async (userId) => {
  if (!userId) {
    throw new Error('User id is required')
  }
  const local = readLocalProgress(userId)

  const failureEntry = firebaseFailureCache.get(userId)
  if (failureEntry && Date.now() - failureEntry.timestamp < PERMISSION_RETRY_DELAY_MS) {
    return {
      ...local,
      firebaseUnavailable: true,
      source: 'local',
      firebaseReason: failureEntry.code === 'permission-denied' ? 'permission-denied' : 'unknown',
      cachedFailure: failureEntry,
    }
  }

  if (!isFirebaseConfigured || !db) {
    return {
      ...local,
      firebaseUnavailable: true,
      source: 'local',
      firebaseReason: 'not-configured',
    }
  }

  try {
    const ref = getProgressDocRef(userId)
    const snapshot = await getDoc(ref)

    if (!snapshot.exists()) {
      const payload = {
        stats: { ...INITIAL_CODING_STATS },
        solvedProblems: {},
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
      }
      await setDoc(ref, payload)
      writeLocalProgress(userId, payload)
      firebaseFailureCache.delete(userId)
      return {
        stats: { ...INITIAL_CODING_STATS },
        solvedProblems: {},
        created: true,
      }
    }

    const data = snapshot.data() || {}
    const normalized = {
      stats: { ...INITIAL_CODING_STATS, ...(data.stats || {}) },
      solvedProblems: normalizeSolvedProblems(data.solvedProblems || {}),
      created: false,
    }
    writeLocalProgress(userId, normalized)
    firebaseFailureCache.delete(userId)
    return normalized
  } catch (error) {
    if (error?.code === 'permission-denied') {
      firebaseFailureCache.set(userId, { timestamp: Date.now(), code: error.code })
      if (!hasLoggedPermissionWarning) {
        console.warn(
          'Firebase denied access to coding progress. Using local storage cache until permissions are updated.',
          error
        )
        hasLoggedPermissionWarning = true
      }
    } else {
      console.warn('ensureCodingProgress fell back to local storage', error)
    }
    return {
      ...local,
      firebaseUnavailable: true,
      source: 'local',
      error,
      firebaseReason: error?.code === 'permission-denied' ? 'permission-denied' : 'unknown',
    }
  }
}

export const recordSuccessfulSubmission = async (
  userId,
  problem,
  submission
) => {
  if (!userId) {
    throw new Error('User id is required')
  }
  if (!problem?.id) {
    throw new Error('Problem metadata missing')
  }
  const applySubmission = (statsSource, solvedSource, useServerTimestamp) => {
    const currentStats = { ...INITIAL_CODING_STATS, ...(statsSource || {}) }
    const currentSolved = { ...(solvedSource || {}) }

    const alreadySolved = currentSolved[problem.id]?.status === 'completed'

    if (!alreadySolved) {
      currentStats.problemsSolved += 1
      if (problem.difficulty === 'easy') currentStats.easySolved += 1
      if (problem.difficulty === 'medium') currentStats.mediumSolved += 1
      if (problem.difficulty === 'hard') currentStats.hardSolved += 1
    }

    const attempts = currentSolved[problem.id]?.attempts || 0
    currentSolved[problem.id] = {
      status: 'completed',
      problemId: problem.id,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
      language: submission.language,
      lastSubmittedAt: useServerTimestamp ? serverTimestamp() : new Date().toISOString(),
      lastSubmittedAtClient: new Date().toISOString(),
      codeSnapshot: submission.code,
      lastTestResults: submission.results,
      attempts: attempts + 1,
    }

    return { currentStats, currentSolved }
  }

  const finalizeLocal = (stats, solved, overrides = {}) => {
    const normalized = {
      stats: { ...stats },
      solvedProblems: normalizeSolvedProblems(solved),
      firebaseUnavailable: true,
      source: 'local',
      ...overrides,
    }
    writeLocalProgress(userId, normalized)
    return normalized
  }

  if (!isFirebaseConfigured || !db) {
    const local = readLocalProgress(userId)
    const { currentStats, currentSolved } = applySubmission(
      local.stats,
      local.solvedProblems,
      false
    )
    return finalizeLocal(currentStats, currentSolved, {
      firebaseReason: 'not-configured',
    })
  }

  const cachedFailure = firebaseFailureCache.get(userId)
  if (cachedFailure && Date.now() - cachedFailure.timestamp < PERMISSION_RETRY_DELAY_MS) {
    const local = readLocalProgress(userId)
    const { currentStats, currentSolved } = applySubmission(
      local.stats,
      local.solvedProblems,
      false
    )
    return finalizeLocal(currentStats, currentSolved, {
      firebaseReason: cachedFailure.code === 'permission-denied' ? 'permission-denied' : 'unknown',
    })
  }

  try {
    const ref = getProgressDocRef(userId)
    const snapshot = await getDoc(ref)
    const data = snapshot.exists() ? snapshot.data() || {} : {}
    const { currentStats, currentSolved } = applySubmission(
      data.stats,
      data.solvedProblems,
      true
    )

    const payload = {
      stats: currentStats,
      solvedProblems: currentSolved,
      lastUpdatedAt: serverTimestamp(),
    }

    await setDoc(ref, payload, { merge: true })
    const normalized = {
      stats: { ...currentStats },
      solvedProblems: normalizeSolvedProblems(currentSolved),
    }
    writeLocalProgress(userId, normalized)
    firebaseFailureCache.delete(userId)
    return normalized
  } catch (error) {
    if (error?.code === 'permission-denied') {
      firebaseFailureCache.set(userId, { timestamp: Date.now(), code: error.code })
      if (!hasLoggedPermissionWarning) {
        console.warn(
          'Firebase denied access to coding progress updates. New submissions are saved locally only until permissions are fixed.',
          error
        )
        hasLoggedPermissionWarning = true
      }
    } else {
      console.warn('recordSuccessfulSubmission fell back to local storage', error)
    }
    const local = readLocalProgress(userId)
    const { currentStats, currentSolved } = applySubmission(
      local.stats,
      local.solvedProblems,
      false
    )
    return finalizeLocal(currentStats, currentSolved, {
      firebaseReason: error?.code === 'permission-denied' ? 'permission-denied' : 'unknown',
    })
  }
}

const normalizeSolvedProblems = (solved = {}) => {
  const normalized = {}
  Object.entries(solved).forEach(([key, value]) => {
    if (!value) return
    const entry = { ...value }
    if (entry.lastSubmittedAt && typeof entry.lastSubmittedAt === 'object') {
      if (typeof entry.lastSubmittedAt.toDate === 'function') {
        entry.lastSubmittedAt = entry.lastSubmittedAt.toDate().toISOString()
      } else if (entry.lastSubmittedAt._methodName) {
        entry.lastSubmittedAtPending = true
        entry.lastSubmittedAt = entry.lastSubmittedAtClient || new Date().toISOString()
      }
    }
    if (!entry.lastSubmittedAt && entry.lastSubmittedAtClient) {
      entry.lastSubmittedAt = entry.lastSubmittedAtClient
    }
    normalized[key] = entry
  })
  return normalized
}
