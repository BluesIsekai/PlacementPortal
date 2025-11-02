const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Search users endpoint
router.get('/', async (req, res) => {
  try {
    const { query, role, skillCategory, college, limit = 20, page = 1 } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    // Build search criteria
    const searchCriteria = {
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
            { bio: { $regex: query, $options: 'i' } },
            { skills: { $in: [new RegExp(query, 'i')] } },
            { interests: { $in: [new RegExp(query, 'i')] } },
            { college: { $regex: query, $options: 'i' } },
            { city: { $regex: query, $options: 'i' } },
            { 'profile.degree': { $regex: query, $options: 'i' } },
            { 'profile.department': { $regex: query, $options: 'i' } }
          ]
        },
        // Make sure profile is completed
        { profileCompleted: true }
      ]
    };

    // Add role filter if specified
    if (role && ['Competitor', 'Guider'].includes(role)) {
      searchCriteria.$and.push({ role: role });
    }

    // Add skill category filter if specified
    if (skillCategory) {
      searchCriteria.$and.push({ 
        skills: { $in: [new RegExp(skillCategory, 'i')] }
      });
    }

    // Add college filter if specified
    if (college) {
      searchCriteria.$and.push({ 
        college: { $regex: college, $options: 'i' }
      });
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute search
    const users = await User.find(searchCriteria)
      .select('name username email role skills interests bio profilePic college city profile createdAt')
      .sort({ 
        // Prioritize exact name matches, then by creation date
        name: 1,
        createdAt: -1 
      })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const totalUsers = await User.countDocuments(searchCriteria);

    // Format results
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role || 'Competitor',
      skills: user.skills || [],
      interests: user.interests || [],
      profilePic: user.profilePic || null,
      bio: user.bio || '',
      college: user.college || user.profile?.college || '',
      city: user.city || user.profile?.city || '',
      experience: user.profile?.experience || 'Not specified',
      rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10, // Mock rating for demo
      department: user.profile?.department || '',
      degree: user.profile?.degree || ''
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(totalUsers / parseInt(limit));
    const hasNext = parseInt(page) < totalPages;
    const hasPrev = parseInt(page) > 1;

    res.json({
      success: true,
      users: formattedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalUsers,
        hasNext,
        hasPrev,
        limit: parseInt(limit)
      },
      searchQuery: query,
      filters: {
        role: role || null,
        skillCategory: skillCategory || null,
        college: college || null
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during search',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Get search suggestions endpoint
router.get('/suggestions', async (req, res) => {
  try {
    const { type } = req.query; // 'skills', 'colleges', 'cities', 'interests'

    let suggestions = [];

    switch (type) {
      case 'skills':
        suggestions = await User.aggregate([
          { $unwind: '$skills' },
          { $group: { _id: '$skills', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 20 },
          { $project: { _id: 0, skill: '$_id', count: 1 } }
        ]);
        break;

      case 'colleges':
        suggestions = await User.aggregate([
          { $match: { college: { $exists: true, $ne: '' } } },
          { $group: { _id: '$college', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 15 },
          { $project: { _id: 0, college: '$_id', count: 1 } }
        ]);
        break;

      case 'cities':
        suggestions = await User.aggregate([
          { $match: { city: { $exists: true, $ne: '' } } },
          { $group: { _id: '$city', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 15 },
          { $project: { _id: 0, city: '$_id', count: 1 } }
        ]);
        break;

      case 'interests':
        suggestions = await User.aggregate([
          { $unwind: '$interests' },
          { $group: { _id: '$interests', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 20 },
          { $project: { _id: 0, interest: '$_id', count: 1 } }
        ]);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid suggestion type. Use: skills, colleges, cities, or interests'
        });
    }

    res.json({
      success: true,
      suggestions,
      type
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching suggestions'
    });
  }
});

// Advanced search with multiple filters
router.post('/advanced', async (req, res) => {
  try {
    const {
      query = '',
      filters = {},
      sort = 'relevance',
      limit = 20,
      page = 1
    } = req.body;

    const searchCriteria = { profileCompleted: true };

    // Text search if query provided
    if (query && query.length >= 2) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } },
        { interests: { $in: [new RegExp(query, 'i')] } },
        { college: { $regex: query, $options: 'i' } }
      ];
    }

    // Apply filters
    if (filters.role && ['Competitor', 'Guider'].includes(filters.role)) {
      searchCriteria.role = filters.role;
    }

    if (filters.skills && filters.skills.length > 0) {
      searchCriteria.skills = { $in: filters.skills.map(skill => new RegExp(skill, 'i')) };
    }

    if (filters.college) {
      searchCriteria.college = { $regex: filters.college, $options: 'i' };
    }

    if (filters.city) {
      searchCriteria.city = { $regex: filters.city, $options: 'i' };
    }

    if (filters.experience) {
      searchCriteria['profile.experience'] = { $regex: filters.experience, $options: 'i' };
    }

    // Sorting options
    let sortCriteria = {};
    switch (sort) {
      case 'name':
        sortCriteria = { name: 1 };
        break;
      case 'newest':
        sortCriteria = { createdAt: -1 };
        break;
      case 'oldest':
        sortCriteria = { createdAt: 1 };
        break;
      default: // relevance
        sortCriteria = { name: 1, createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(searchCriteria)
      .select('name username role skills interests bio profilePic college city profile createdAt')
      .sort(sortCriteria)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const totalUsers = await User.countDocuments(searchCriteria);

    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role || 'Competitor',
      skills: user.skills || [],
      interests: user.interests || [],
      profilePic: user.profilePic || null,
      bio: user.bio || '',
      college: user.college || user.profile?.college || '',
      city: user.city || user.profile?.city || '',
      experience: user.profile?.experience || 'Not specified',
      rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10
    }));

    res.json({
      success: true,
      users: formattedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / parseInt(limit)),
        totalUsers,
        hasNext: parseInt(page) < Math.ceil(totalUsers / parseInt(limit)),
        hasPrev: parseInt(page) > 1,
        limit: parseInt(limit)
      },
      searchQuery: query,
      appliedFilters: filters,
      sortBy: sort
    });

  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during advanced search'
    });
  }
});

module.exports = router;
