const express = require('express');
const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Here you would typically:
    // 1. Check if user exists in database
    // 2. Verify password
    // 3. Generate JWT token
    
    // For demo purposes, simulate successful login
    const mockUser = {
      id: 'user_' + Date.now(),
      email: email,
      name: email.split('@')[0],
      isProfileComplete: false // New users need to complete profile
    };

    const mockToken = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: mockToken,
      user: mockUser
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log('Received registration request:', { name, email });

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
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

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Generate JWT token

    // For demo purposes, simulate successful registration
    const newUser = {
      id: 'user_' + Date.now(),
      name: name,
      email: email,
      isProfileComplete: false, // New users need to complete profile
      createdAt: new Date().toISOString()
    };

    const authToken = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Simulate database save delay
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log('✅ User registered successfully:', newUser);

    res.status(201).json({
      success: true,
      message: '🎉 Registration successful! Welcome to the platform!',
      token: authToken,
      user: newUser
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
