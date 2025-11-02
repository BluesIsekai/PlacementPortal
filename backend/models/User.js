const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  
  // Profile Information
  role: {
    type: String,
    enum: ['Competitor', 'Guider'],
    default: 'Competitor'
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  profilePic: {
    type: String,
    default: null
  },
  
  // Education & Location
  college: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  degree: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  
  // Skills & Interests
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  
  // Contact Information
  phone: {
    type: String,
    trim: true
  },
  
  // Social Links
  socialLinks: {
    github: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  
  // Profile Completion
  profileCompleted: {
    type: Boolean,
    default: false
  },
  
  // Additional Profile Data
  profile: {
    experience: {
      type: String,
      trim: true
    },
    resumeUrl: {
      type: String,
      trim: true
    },
    about: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    achievements: [{
      title: String,
      description: String,
      date: Date
    }],
    projects: [{
      title: String,
      description: String,
      techStack: [String],
      link: String,
      startDate: Date,
      endDate: Date
    }]
  },
  
  // Statistics (for search display)
  stats: {
    problemsSolved: {
      type: Number,
      default: 0
    },
    contestsParticipated: {
      type: Number,
      default: 0
    },
    ranking: {
      type: String,
      default: 'Beginner'
    },
    menteeCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Firebase UID (if using Firebase)
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    profileVisibility: {
      type: String,
      enum: ['public', 'private', 'connections'],
      default: 'public'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better search performance
userSchema.index({ name: 'text', bio: 'text', skills: 'text', interests: 'text' });
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ college: 1 });
userSchema.index({ city: 1 });
userSchema.index({ profileCompleted: 1 });
userSchema.index({ 'skills': 1 });
userSchema.index({ 'interests': 1 });

// Virtual for full name search
userSchema.virtual('searchableContent').get(function() {
  return [
    this.name,
    this.username,
    this.bio,
    this.college,
    this.department,
    this.city,
    ...(this.skills || []),
    ...(this.interests || [])
  ].filter(Boolean).join(' ');
});

// Method to get public profile data
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    email: this.email,
    role: this.role,
    bio: this.bio,
    profilePic: this.profilePic,
    college: this.college,
    department: this.department,
    degree: this.degree,
    year: this.year,
    city: this.city,
    skills: this.skills,
    interests: this.interests,
    socialLinks: this.socialLinks,
    stats: this.stats,
    createdAt: this.createdAt,
    profile: this.profile
  };
};

// Method to check if profile is complete
userSchema.methods.isProfileComplete = function() {
  return !!(
    this.name &&
    this.bio &&
    this.skills &&
    this.skills.length > 0 &&
    this.interests &&
    this.interests.length > 0 &&
    this.college &&
    this.department
  );
};

// Pre-save middleware to update profileCompleted status
userSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isModified('bio') || this.isModified('skills') || this.isModified('interests') || this.isModified('college') || this.isModified('department')) {
    this.profileCompleted = this.isProfileComplete();
  }
  next();
});

// Static method for advanced search
userSchema.statics.searchUsers = function(query, filters = {}) {
  const searchCriteria = { profileCompleted: true };
  
  // Text search
  if (query && query.length >= 2) {
    searchCriteria.$or = [
      { name: { $regex: query, $options: 'i' } },
      { username: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } },
      { skills: { $in: [new RegExp(query, 'i')] } },
      { interests: { $in: [new RegExp(query, 'i')] } },
      { college: { $regex: query, $options: 'i' } },
      { department: { $regex: query, $options: 'i' } },
      { city: { $regex: query, $options: 'i' } }
    ];
  }
  
  // Apply filters
  if (filters.role && ['Competitor', 'Guider'].includes(filters.role)) {
    searchCriteria.role = filters.role;
  }
  
  if (filters.college) {
    searchCriteria.college = { $regex: filters.college, $options: 'i' };
  }
  
  if (filters.city) {
    searchCriteria.city = { $regex: filters.city, $options: 'i' };
  }
  
  if (filters.skills && filters.skills.length > 0) {
    searchCriteria.skills = { $in: filters.skills.map(skill => new RegExp(skill, 'i')) };
  }
  
  return this.find(searchCriteria)
    .select('name username role bio profilePic college department city skills interests stats createdAt')
    .sort({ name: 1, createdAt: -1 });
};

module.exports = mongoose.model('User', userSchema);