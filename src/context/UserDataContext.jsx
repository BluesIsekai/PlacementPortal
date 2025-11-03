import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signOut, updateProfile as updateAuthProfile } from 'firebase/auth'
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../lib/firebase'

const initialStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
}

const defaultProfile = {
  uid: '',
  email: '',
  displayName: '',
  name: '',
  phone: '',
  location: '',
  college: '',
  department: '',
  graduationYear: '',
  cgpa: '',
  resumeLink: '',
  linkedin: '',
  github: '',
  portfolio: '',
  bio: '',
  avatarUrl: '',
  skills: [],
  projects: [],
  achievements: [],
  createdAt: null,
  updatedAt: null,
}

const normalizeProfileInput = (input = {}) => {
  const merged = {
    ...defaultProfile,
    ...input,
  }

  merged.displayName = `${merged.displayName || merged.name || ''}`.trim()
  merged.name = `${merged.name || merged.displayName || ''}`.trim()
  merged.email = `${merged.email || ''}`.trim()
  merged.uid = `${merged.uid || ''}`.trim()
  merged.phone = `${merged.phone || ''}`.trim()
  merged.location = `${merged.location || ''}`.trim()
  merged.college = `${merged.college || ''}`.trim()
  merged.department = `${merged.department || ''}`.trim()
  merged.graduationYear = `${merged.graduationYear || ''}`.trim()
  merged.cgpa = `${merged.cgpa || ''}`.trim()
  merged.resumeLink = `${merged.resumeLink || ''}`.trim()
  merged.linkedin = `${merged.linkedin || ''}`.trim()
  merged.github = `${merged.github || ''}`.trim()
  merged.portfolio = `${merged.portfolio || ''}`.trim()
  merged.bio = `${merged.bio || ''}`.trim()
  merged.avatarUrl = `${merged.avatarUrl || ''}`.trim()

  merged.skills = Array.isArray(input.skills)
    ? input.skills
        .map((skill) => {
          const name = `${skill?.name || ''}`.trim()
          if (!name) return null
          const parsed = Number.parseInt(skill?.level, 10)
          const level = Number.isFinite(parsed)
            ? Math.min(100, Math.max(0, parsed))
            : 0
          return { name, level }
        })
        .filter(Boolean)
    : []

  merged.projects = Array.isArray(input.projects)
    ? input.projects
        .map((project) => {
          const name = `${project?.name || ''}`.trim()
          const description = `${project?.description || ''}`.trim()
          const link = `${project?.link || ''}`.trim()
          const source = project?.technologies
          const technologies = Array.isArray(source)
            ? source
                .map((tech) => `${tech || ''}`.trim())
                .filter(Boolean)
            : `${source || ''}`
                .split(',')
                .map((tech) => tech.trim())
                .filter(Boolean)

          if (!name && !description && technologies.length === 0 && !link) {
            return null
          }

          return { name, description, technologies, link }
        })
        .filter(Boolean)
    : []

  merged.achievements = Array.isArray(input.achievements)
    ? input.achievements
        .map((achievement) => `${achievement || ''}`.trim())
        .filter(Boolean)
    : []

  merged.createdAt = input?.createdAt ?? merged.createdAt ?? null
  merged.updatedAt = input?.updatedAt ?? merged.updatedAt ?? null

  return merged
}

const buildDefaultUserData = () => ({
  profile: normalizeProfileInput(),
  stats: { ...initialStats },
  completedProblems: {},
  submissions: [],
})

const UserDataContext = createContext({
  user: null,
  userData: buildDefaultUserData(),
  loadingUser: true,
  loadingUserData: false,
  refreshUserData: async () => {},
  recordSubmissionResult: async () => ({ success: false }),
  updateUserProfile: async () => ({ success: false }),
  logout: async () => ({ success: false }),
})

const difficultyKeyMap = {
  easy: 'easySolved',
  medium: 'mediumSolved',
  hard: 'hardSolved',
}

const convertTimestamp = (value) => {
  if (!value) return value
  if (typeof value.toDate === 'function') {
    return value.toDate()
  }
  return value
}

const hydrateUserData = (data) => {
  if (!data) return buildDefaultUserData()

  const base = buildDefaultUserData()
  const profileSource = data.profile || {}
  const profile = normalizeProfileInput(profileSource)
  profile.createdAt = convertTimestamp(profileSource?.createdAt) || null
  profile.updatedAt = convertTimestamp(profileSource?.updatedAt) || null

  const hydratedSubmissions = (data.submissions || []).map((submission) => ({
    ...submission,
    submittedAt: convertTimestamp(submission?.submittedAt) || null,
  }))

  const hydratedCompleted = Object.entries(data.completedProblems || {}).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...value,
        solvedAt: convertTimestamp(value?.solvedAt) || null,
      },
    }),
    {},
  )

  return {
    ...base,
    profile,
    stats: {
      totalSolved: data.stats?.totalSolved ?? 0,
      easySolved: data.stats?.easySolved ?? 0,
      mediumSolved: data.stats?.mediumSolved ?? 0,
      hardSolved: data.stats?.hardSolved ?? 0,
    },
    completedProblems: hydratedCompleted,
    submissions: hydratedSubmissions,
  }
}

const ensureUserDocument = async (user) => {
  if (!db || !user) return buildDefaultUserData()
  const userRef = doc(db, 'users', user.uid)
  const snapshot = await getDoc(userRef)
  if (snapshot.exists()) {
    return hydrateUserData(snapshot.data())
  }

  const profileData = normalizeProfileInput({
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    name: user.displayName || '',
  })

  const payload = {
    profile: {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    stats: { ...initialStats },
    completedProblems: {},
    submissions: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(userRef, payload)
  const freshSnapshot = await getDoc(userRef)
  return hydrateUserData(freshSnapshot.exists() ? freshSnapshot.data() : payload)
}

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(buildDefaultUserData)
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingUserData, setLoadingUserData] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoadingUser(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (!currentUser) {
        setUserData(buildDefaultUserData())
        setLoadingUser(false)
        return
      }

      setLoadingUserData(true)
      try {
        const hydrated = await ensureUserDocument(currentUser)
        setUserData(hydrated)
      } catch (error) {
        console.error('Failed to load user data', error)
        setUserData(buildDefaultUserData())
      } finally {
        setLoadingUser(false)
        setLoadingUserData(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshUserData = async () => {
    if (!user || !db) return
    setLoadingUserData(true)
    try {
      const ref = doc(db, 'users', user.uid)
      const snapshot = await getDoc(ref)
      if (snapshot.exists()) {
        setUserData(hydrateUserData(snapshot.data()))
      }
    } catch (error) {
      console.error('Failed to refresh user data', error)
    } finally {
      setLoadingUserData(false)
    }
  }

  const updateUserProfile = async (updates) => {
    if (!isFirebaseConfigured) {
      return { success: false, error: 'Firebase is not configured.' }
    }

    if (!user || !db) {
      return { success: false, error: 'User is not authenticated.' }
    }

    const merged = {
      ...(userData?.profile || {}),
      ...updates,
      uid: user.uid,
      email: user.email || userData?.profile?.email || '',
    }

    const normalizedProfile = normalizeProfileInput(merged)

    try {
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        profile: {
          ...normalizedProfile,
          updatedAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      })

      setUserData((prev) => {
        const previous = prev || buildDefaultUserData()
        return {
          ...previous,
          profile: {
            ...normalizedProfile,
            updatedAt: new Date(),
          },
        }
      })

      if (
        auth?.currentUser &&
        normalizedProfile.displayName &&
        auth.currentUser.displayName !== normalizedProfile.displayName
      ) {
        try {
          await updateAuthProfile(auth.currentUser, {
            displayName: normalizedProfile.displayName,
          })
        } catch (profileError) {
          console.warn('Failed to update auth display name', profileError)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Failed to update profile', error)
      return {
        success: false,
        error: error?.message || 'Profile update failed',
      }
    }
  }

  const recordSubmissionResult = async ({
    problem,
    passed,
    language,
    testResults,
  }) => {
    if (!isFirebaseConfigured) {
      return { success: false, error: 'Firebase is not configured.' }
    }

    if (!user || !db) {
      return { success: false, error: 'User is not authenticated.' }
    }

    const userRef = doc(db, 'users', user.uid)
    const submissionEntry = {
      problemId: problem.id,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
      language,
      status: passed ? 'passed' : 'failed',
      submittedAt: Timestamp.now(),
      testResults,
    }

    const updates = {
      submissions: arrayUnion(submissionEntry),
      updatedAt: serverTimestamp(),
    }

    const alreadySolved = Boolean(
      userData.completedProblems?.[problem.id]?.solved,
    )

    if (passed && !alreadySolved) {
      updates[`completedProblems.${problem.id}`] = {
        solved: true,
        language,
        problemTitle: problem.title,
        solvedAt: Timestamp.now(),
      }
      updates['stats.totalSolved'] = increment(1)
      const difficultyField = difficultyKeyMap[problem.difficulty]
      if (difficultyField) {
        updates[`stats.${difficultyField}`] = increment(1)
      }
    }

    try {
      await updateDoc(userRef, updates)

      setUserData((prev) => {
        const previous = prev || buildDefaultUserData()
        const submissions = [...(previous.submissions || [])]
        submissions.push({
          ...submissionEntry,
          submittedAt: new Date(),
        })

        const updatedStats = { ...previous.stats }
        if (passed && !alreadySolved) {
          updatedStats.totalSolved += 1
          const difficultyField = difficultyKeyMap[problem.difficulty]
          if (difficultyField) {
            updatedStats[difficultyField] += 1
          }
        }

        const completedProblems = {
          ...(previous.completedProblems || {}),
        }
        if (passed && !alreadySolved) {
          completedProblems[problem.id] = {
            solved: true,
            language,
            problemTitle: problem.title,
            solvedAt: new Date(),
          }
        }

        return {
          ...previous,
          stats: updatedStats,
          submissions,
          completedProblems,
        }
      })

      return { success: true }
    } catch (error) {
      console.error('Failed to update submission', error)
      return { success: false, error: error?.message || 'Update failed' }
    }
  }

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) {
      setUser(null)
      setUserData(buildDefaultUserData())
      return { success: true }
    }

    try {
      await signOut(auth)
      setUser(null)
      setUserData(buildDefaultUserData())
      return { success: true }
    } catch (error) {
      console.error('Failed to sign out', error)
      return { success: false, error: error?.message || 'Sign out failed' }
    }
  }

  const value = useMemo(
    () => ({
      user,
      userData,
      loadingUser,
      loadingUserData,
      refreshUserData,
      recordSubmissionResult,
      updateUserProfile,
      logout,
    }),
    [
      user,
      userData,
      loadingUser,
      loadingUserData,
      refreshUserData,
      recordSubmissionResult,
      updateUserProfile,
      logout,
    ],
  )

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserData = () => useContext(UserDataContext)
