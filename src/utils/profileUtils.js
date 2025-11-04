import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'

const PROFILE_LOCAL_KEY = 'userProfile'
const PROFILE_COLLECTION = 'userProfiles'
const DEFAULT_PROFILE = Object.freeze({
  fullName: '',
  username: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bio: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  website: '',
  socialMedia: {
    instagram: '',
    linkedin: '',
    twitter: '',
    github: '',
  },
  skills: '',
  occupation: '',
  education: '',
  company: '',
  profilePictureUrl: '',
  isProfileComplete: false,
})

const isBrowser = typeof window !== 'undefined'
let hasTokenDecodeWarning = false

const sanitizeKey = (email = '') => encodeURIComponent(String(email).trim().toLowerCase())

const getProfileDocRef = (email) => {
  if (!db) {
    throw new Error('Firebase is not configured')
  }
  return doc(db, PROFILE_COLLECTION, sanitizeKey(email))
}

const readLocalProfile = () => {
  if (!isBrowser) {
    return null
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_LOCAL_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('Failed to parse cached profile data', error)
    window.localStorage.removeItem(PROFILE_LOCAL_KEY)
    return null
  }
}

const writeLocalProfile = (profile) => {
  if (!isBrowser) {
    return
  }
  try {
    window.localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(profile))
  } catch (error) {
    console.warn('Failed to persist profile locally', error)
  }
}

const clearLocalProfile = () => {
  if (isBrowser) {
    window.localStorage.removeItem(PROFILE_LOCAL_KEY)
  }
}

const normalizeTimestamp = (value) => {
  if (!value) {
    return value
  }
  if (typeof value === 'object') {
    if (typeof value.toDate === 'function') {
      return value.toDate().toISOString()
    }
    return value
  }
  return value
}

const applyProfileDefaults = (profile = {}) => {
  const { address, socialMedia, profilePicture, ...rest } = profile || {}
  const normalizedAddress = {
    ...DEFAULT_PROFILE.address,
    ...(typeof address === 'object' && address ? address : {}),
  }
  const normalizedSocial = {
    ...DEFAULT_PROFILE.socialMedia,
    ...(typeof socialMedia === 'object' && socialMedia ? socialMedia : {}),
  }
  const normalized = {
    ...DEFAULT_PROFILE,
    ...rest,
    address: normalizedAddress,
    socialMedia: normalizedSocial,
  }
  if (typeof normalized.profilePictureUrl !== 'string') {
    normalized.profilePictureUrl = ''
  }
  if (typeof normalized.email !== 'string') {
    normalized.email = ''
  }
  normalized.updatedAt = normalizeTimestamp(normalized.updatedAt)
  normalized.lastSyncedAt = normalizeTimestamp(normalized.lastSyncedAt)
  return normalized
}

const ensureProfileCompleteFlag = (profile, isComplete = true) => ({
  ...profile,
  isProfileComplete: Boolean(isComplete),
})

const updateLocalCompletionFlag = (isComplete) => {
  if (!isBrowser) {
    return
  }
  window.localStorage.setItem('isProfileComplete', isComplete ? 'true' : 'false')
}

export const loadUserProfile = async (email) => {
  const localProfile = applyProfileDefaults(readLocalProfile() || { email })

  if (!email) {
    return {
      profile: localProfile,
      firebaseUnavailable: !isFirebaseConfigured,
      source: localProfile ? 'local' : 'default',
    }
  }

  if (!isFirebaseConfigured || !db) {
    return {
      profile: localProfile,
      firebaseUnavailable: true,
      source: localProfile ? 'local' : 'default',
    }
  }

  try {
    const ref = getProfileDocRef(email)
    const snapshot = await getDoc(ref)

    if (!snapshot.exists()) {
      writeLocalProfile(localProfile)
      return {
        profile: localProfile,
        created: false,
        source: localProfile ? 'local' : 'default',
      }
    }

    const data = snapshot.data() || {}
    const normalized = applyProfileDefaults({ ...data, email })
    writeLocalProfile(normalized)
    updateLocalCompletionFlag(Boolean(normalized.isProfileComplete))

    return {
      profile: normalized,
      source: 'firebase',
    }
  } catch (error) {
    console.warn('loadUserProfile fell back to local cache', error)
    return {
      profile: localProfile,
      firebaseUnavailable: true,
      error,
      source: localProfile ? 'local' : 'default',
    }
  }
}

export const saveUserProfile = async (email, profileInput = {}) => {
  if (!email) {
    throw new Error('Email is required to save profile')
  }

  const profile = ensureProfileCompleteFlag(
    applyProfileDefaults({ ...profileInput, email }),
    true,
  )

  writeLocalProfile(profile)
  updateLocalCompletionFlag(true)

  if (!isFirebaseConfigured || !db) {
    return {
      profile,
      firebaseUnavailable: true,
      source: 'local',
    }
  }

  try {
    const ref = getProfileDocRef(email)
    const payload = {
      ...profile,
      updatedAt: serverTimestamp(),
      lastSyncedAt: serverTimestamp(),
    }
    await setDoc(ref, payload, { merge: true })
    return {
      profile,
      source: 'firebase',
    }
  } catch (error) {
    console.warn('saveUserProfile fell back to local cache', error)
    return {
      profile,
      firebaseUnavailable: true,
      source: 'local',
      error,
    }
  }
}

export const checkProfileCompletion = (user) => {
  if (user && typeof user.isProfileComplete === 'boolean') {
    return user.isProfileComplete
  }

  const cachedProfile = readLocalProfile()
  if (cachedProfile?.isProfileComplete) {
    return true
  }

  const isCompleteFlag = isBrowser ? window.localStorage.getItem('isProfileComplete') : null
  if (isCompleteFlag === 'true') {
    return true
  }

  const requiredFields = ['fullName', 'username', 'email', 'gender', 'dateOfBirth', 'phoneNumber']
  const hasRequiredFields = requiredFields.every((field) => {
    const value = cachedProfile?.[field]
    return value && String(value).trim() !== ''
  })

  return Boolean(hasRequiredFields && cachedProfile?.isProfileComplete)
}

export const getUserProfileStatus = () => {
  const token = isBrowser
    ? window.localStorage.getItem('token') || window.localStorage.getItem('authToken')
    : null

  if (token && token.includes('.')) {
    try {
      const payloadSegment = token.split('.')[1]
      if (payloadSegment) {
        let base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/')
        while (base64.length % 4 !== 0) {
          base64 += '='
        }
        const decodedPayload = atob(base64)
        const payload = JSON.parse(decodedPayload)
        if (payload && payload.isProfileComplete !== undefined) {
          return {
            isComplete: payload.isProfileComplete,
            user: payload,
          }
        }
      }
    } catch (error) {
      if (!hasTokenDecodeWarning) {
        console.warn('Token decode failed, falling back to local profile state:', error?.message || error)
        hasTokenDecodeWarning = true
      }
    }
  }

  const profile = applyProfileDefaults(readLocalProfile())
  const isComplete = checkProfileCompletion(profile)

  return {
    isComplete,
    user: profile,
  }
}

export const updateProfileCompletionStatus = (isComplete = true) => {
  updateLocalCompletionFlag(isComplete)
  const profile = readLocalProfile()
  if (profile) {
    const updated = ensureProfileCompleteFlag(profile, isComplete)
    writeLocalProfile({
      ...updated,
      profileCompletedAt: isComplete ? new Date().toISOString() : updated.profileCompletedAt,
    })
  }
}

export const shouldRedirectToCompleteProfile = () => {
  if (!isBrowser) {
    return false
  }
  const { isComplete } = getUserProfileStatus()
  const currentPath = window.location.pathname
  const excludePaths = ['/complete-profile', '/login', '/register', '/']
  if (excludePaths.includes(currentPath)) {
    return false
  }
  return !isComplete
}

export const isFirstTimeLogin = () => {
  if (!isBrowser) {
    return false
  }
  const firstTimeFlag = window.localStorage.getItem('hasLoggedInBefore')
  return firstTimeFlag !== 'true'
}

export const markAsReturningUser = () => {
  if (isBrowser) {
    window.localStorage.setItem('hasLoggedInBefore', 'true')
  }
}

export const resetProfileCompletion = () => {
  if (!isBrowser) {
    return
  }
  window.localStorage.removeItem('isProfileComplete')
  window.localStorage.removeItem('hasLoggedInBefore')
  clearLocalProfile()
  console.log('Profile completion status reset')
}
