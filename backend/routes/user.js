const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Simple test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'User API is working!',
    timestamp: new Date().toISOString()
  });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/profiles');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// @route   POST /api/complete-profile
// @desc    Complete user profile for first-time users
// @access  Private (requires authentication)
router.post('/complete-profile', async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      bio,
      address,
      profilePicture,
      isProfileComplete,
      profileCompletedAt
    } = req.body;

    console.log('Received complete profile request:', req.body);

    // Basic validation for required fields
    if (!fullName || !username || !email || !gender || !dateOfBirth || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (fullName, username, email, gender, dateOfBirth, phoneNumber)'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\(\)-]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // Date validation
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    if (birthDate >= today) {
      return res.status(400).json({
        success: false,
        message: 'Date of birth must be in the past'
      });
    }

    // Age validation (must be at least 13 years old)
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13) {
      return res.status(400).json({
        success: false,
        message: 'You must be at least 13 years old to use this platform'
      });
    }

    // Here you would typically:
    // 1. Get the user ID from the JWT token
    // 2. Check if user already has a completed profile
    // 3. Save the profile data to your database
    // 4. Update the user's isProfileComplete flag to true
    
    // For demo purposes, simulate successful profile completion
    const completedProfile = {
      id: 'user123', // This would come from your auth middleware
      fullName,
      username,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      bio: bio || '',
      address: address || '',
      profilePicture: profilePicture || null,
      isProfileComplete: true,
      profileCompletedAt: profileCompletedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simulate database update delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ Profile completed successfully:', completedProfile);

    res.status(200).json({
      success: true,
      message: '🎉 Profile completed successfully! Welcome to the platform!',
      data: completedProfile
    });

  } catch (error) {
    console.error('❌ Error completing profile:', error);
    
    res.status(500).json({
      success: false,
      message: '❌ Failed to complete profile. Please try again later.'
    });
  }
});

// @route   PUT /api/update-profile
// @desc    Update user profile with JSON data
// @access  Private (requires authentication)
router.put('/update-profile', async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address,
      website,
      socialMedia,
      skills,
      occupation,
      education,
      company,
      currentPassword,
      newPassword
    } = req.body;

    console.log('Received profile update request:', req.body);

    // Basic validation
    if (!fullName || !username || !email || !phone || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (fullName, username, email, phone, dateOfBirth)'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\(\)-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // URL validation for website
    const urlRegex = /^https?:\/\/.+/;
    if (website && !urlRegex.test(website)) {
      return res.status(400).json({
        success: false,
        message: 'Website URL must start with http:// or https://'
      });
    }

    // Validate social media URLs
    if (socialMedia && typeof socialMedia === 'object') {
      for (const [platform, url] of Object.entries(socialMedia)) {
        if (url && !urlRegex.test(url)) {
          return res.status(400).json({
            success: false,
            message: `Invalid URL for ${platform}. Must start with http:// or https://`
          });
        }
      }
    }

    // Here you would typically:
    // 1. Get the user ID from the JWT token
    // 2. Verify the current password if changing password
    // 3. Hash the new password if provided
    // 4. Update the user in your database
    
    // For demo purposes, simulate successful update
    const updatedProfile = {
      id: 'user123', // This would come from your auth middleware
      fullName,
      username,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address,
      website,
      socialMedia,
      skills: typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills,
      occupation,
      education,
      company,
      updatedAt: new Date().toISOString()
    };

    // Simulate database update delay
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log('✅ Profile updated successfully:', updatedProfile);

    res.status(200).json({
      success: true,
      message: '✅ Profile updated successfully',
      data: updatedProfile
    });

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    
    res.status(500).json({
      success: false,
      message: '❌ Internal server error. Please try again later.'
    });
  }
});

// @route   POST /api/update-profile
// @desc    Update user profile (legacy endpoint for file uploads)
// @access  Private (requires authentication)
router.post('/update-profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address,
      website,
      socialMedia,
      skills,
      occupation,
      education,
      company,
      currentPassword,
      newPassword
    } = req.body;

    // Basic validation
    if (!fullName || !username || !email || !phone || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\(\)-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // URL validation for website and social media
    const urlRegex = /^https?:\/\/.+/;
    if (website && !urlRegex.test(website)) {
      return res.status(400).json({
        success: false,
        message: 'Website URL must start with http:// or https://'
      });
    }

    // Parse JSON fields
    let parsedAddress = {};
    let parsedSocialMedia = {};
    
    try {
      if (address) parsedAddress = JSON.parse(address);
      if (socialMedia) parsedSocialMedia = JSON.parse(socialMedia);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format for address or social media'
      });
    }

    // Validate social media URLs
    for (const [platform, url] of Object.entries(parsedSocialMedia)) {
      if (url && !urlRegex.test(url)) {
        return res.status(400).json({
          success: false,
          message: `Invalid URL for ${platform}. Must start with http:// or https://`
        });
      }
    }

    // Handle profile picture
    let profilePictureUrl = null;
    if (req.file) {
      profilePictureUrl = `/uploads/profiles/${req.file.filename}`;
    }

    // Here you would typically:
    // 1. Get the user ID from the JWT token
    // 2. Update the user in your database
    // 3. Handle password change if provided
    
    // For now, we'll just return a success response
    const updatedProfile = {
      id: 'user123', // This would come from your auth middleware
      fullName,
      username,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address: parsedAddress,
      website,
      socialMedia: parsedSocialMedia,
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      occupation,
      education,
      company,
      profilePicture: profilePictureUrl,
      updatedAt: new Date()
    };

    // Simulate database update delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    // Here you would get the user ID from JWT and fetch from database
    // For now, return mock data
    const userProfile = {
      id: 'user123',
      fullName: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1999-05-15',
      gender: 'male',
      bio: 'Passionate computer science student with interest in web development and machine learning.',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      website: 'https://johndoe.dev',
      socialMedia: {
        instagram: 'https://instagram.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        github: 'https://github.com/johndoe'
      },
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
      occupation: 'Computer Science Student',
      education: "Bachelor's in Computer Science",
      company: 'University College',
      profilePicture: null,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    };

    res.status(200).json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/users/:userId
// @desc    Get user profile by ID
// @access  Public
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user by ID
    const user = await User.findById(userId)
      .select('-password -firebaseUid') // Exclude sensitive information
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if profile is public or user has permission to view
    if (user.preferences?.profileVisibility === 'private') {
      return res.status(403).json({
        success: false,
        message: 'This profile is private'
      });
    }

    // Format user data for response
    const userProfile = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role || 'Competitor',
      bio: user.bio || '',
      profilePic: user.profilePic || null,
      college: user.college || '',
      department: user.department || '',
      degree: user.degree || '',
      year: user.year || '',
      city: user.city || '',
      skills: user.skills || [],
      interests: user.interests || [],
      socialLinks: user.socialLinks || {},
      stats: user.stats || {
        problemsSolved: 0,
        contestsParticipated: 0,
        ranking: 'Beginner',
        menteeCount: 0,
        rating: 0
      },
      profile: user.profile || {},
      joinedDate: user.createdAt,
      experience: user.profile?.experience || 'Not specified',
      achievements: user.profile?.achievements || [],
      projects: user.profile?.projects || []
    };

    res.json({
      success: true,
      user: userProfile
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
