const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('../config/database');

const sampleUsers = [
  {
    name: 'Rohit Sharma',
    username: 'rohit_dev',
    email: 'rohit.sharma@student.edu',
    password: 'password123',
    role: 'Competitor',
    bio: 'Passionate full-stack developer with 2+ years of experience in modern web technologies. Love building scalable applications and participating in competitive programming contests.',
    college: 'IIT Delhi',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech',
    year: '3rd Year',
    city: 'Delhi',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker', 'Git'],
    interests: ['Web Development', 'Competitive Programming', 'Machine Learning', 'Open Source'],
    profileCompleted: true,
    socialLinks: {
      github: 'https://github.com/rohitdev',
      linkedin: 'https://linkedin.com/in/rohit-sharma-dev',
      twitter: 'https://twitter.com/rohit_codes',
      website: 'https://rohitdev.portfolio.com'
    },
    profile: {
      experience: '2 years',
      achievements: [
        { title: 'Google Code Jam 2023', description: 'Qualified for Round 2', date: new Date('2023-04-15') },
        { title: 'Hackathon Winner', description: 'Smart India Hackathon 2023', date: new Date('2023-09-20') }
      ],
      projects: [
        {
          title: 'E-Commerce Platform',
          description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
          techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'https://github.com/rohit/ecommerce'
        }
      ]
    },
    stats: {
      problemsSolved: 450,
      contestsParticipated: 25,
      ranking: 'Expert',
      menteeCount: 0,
      rating: 4.8
    }
  },
  {
    name: 'Priya Singh',
    username: 'priya_mentor',
    email: 'priya.singh@company.com',
    password: 'password123',
    role: 'Guider',
    bio: 'Senior ML Engineer with 5+ years of experience in building production-grade AI systems. Passionate about mentoring the next generation of data scientists and ML engineers.',
    college: 'IIT Bombay',
    department: 'Computer Science & Engineering',
    degree: 'M.Tech',
    year: 'Alumni (2019)',
    city: 'Mumbai',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Kubernetes', 'MLOps', 'Statistics', 'Deep Learning'],
    interests: ['Machine Learning', 'AI Research', 'Data Science', 'Mentoring', 'Teaching'],
    profileCompleted: true,
    socialLinks: {
      github: 'https://github.com/priyaml',
      linkedin: 'https://linkedin.com/in/priya-singh-ml',
      twitter: 'https://twitter.com/priya_ml',
      website: 'https://priyasingh.ai'
    },
    profile: {
      experience: '5 years',
      achievements: [
        { title: 'ML Conference Speaker', description: 'Keynote at AI Summit 2023', date: new Date('2023-11-15') },
        { title: 'Research Publication', description: 'Published in ICML 2023', date: new Date('2023-07-10') }
      ]
    },
    stats: {
      problemsSolved: 200,
      contestsParticipated: 10,
      ranking: 'Specialist',
      menteeCount: 25,
      rating: 4.9
    }
  },
  {
    name: 'Arjun Kumar',
    username: 'arjun_coder',
    email: 'arjun.kumar@student.edu',
    password: 'password123',
    role: 'Competitor',
    bio: 'Backend developer specializing in scalable Java applications and distributed systems.',
    college: 'NIT Trichy',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech',
    year: '4th Year',
    city: 'Chennai',
    skills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis', 'Kafka'],
    interests: ['Backend Development', 'System Design', 'Distributed Systems'],
    profileCompleted: true,
    profile: {
      experience: '3 years'
    },
    stats: {
      problemsSolved: 350,
      contestsParticipated: 20,
      ranking: 'Candidate Master',
      menteeCount: 0,
      rating: 4.7
    }
  },
  {
    name: 'Sneha Patel',
    username: 'sneha_guide',
    email: 'sneha.patel@design.com',
    password: 'password123',
    role: 'Guider',
    bio: 'Senior UX designer helping students transition into design careers.',
    college: 'BITS Pilani',
    department: 'Design',
    degree: 'M.Des',
    year: 'Alumni (2018)',
    city: 'Pune',
    skills: ['UI/UX Design', 'Figma', 'Product Design', 'User Research', 'Prototyping'],
    interests: ['Design Thinking', 'User Research', 'Mentoring', 'Product Strategy'],
    profileCompleted: true,
    profile: {
      experience: '6 years'
    },
    stats: {
      problemsSolved: 0,
      contestsParticipated: 0,
      ranking: 'Designer',
      menteeCount: 15,
      rating: 4.8
    }
  },
  {
    name: 'Vikram Singh',
    username: 'vikram_dev',
    email: 'vikram.singh@student.edu',
    password: 'password123',
    role: 'Competitor',
    bio: 'Mobile app developer building innovative solutions for everyday problems.',
    college: 'VIT Vellore',
    department: 'Information Technology',
    degree: 'B.Tech',
    year: '2nd Year',
    city: 'Bangalore',
    skills: ['Flutter', 'Dart', 'Mobile Development', 'Firebase', 'React Native'],
    interests: ['App Development', 'Startup Ideas', 'Innovation'],
    profileCompleted: true,
    profile: {
      experience: '2 years'
    },
    stats: {
      problemsSolved: 180,
      contestsParticipated: 8,
      ranking: 'Specialist',
      menteeCount: 0,
      rating: 4.6
    }
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing users (optional - be careful in production!)
    console.log('🗑️ Clearing existing users...');
    await User.deleteMany({});
    
    // Hash passwords and create users
    console.log('👥 Creating sample users...');
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );
    
    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Created ${createdUsers.length} users successfully!`);
    
    // Log created users
    createdUsers.forEach(user => {
      console.log(`   📝 ${user.name} (${user.role}) - ${user.email}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Credentials:');
    console.log('   Email: rohit.sharma@student.edu, Password: password123');
    console.log('   Email: priya.singh@company.com, Password: password123');
    console.log('   Email: arjun.kumar@student.edu, Password: password123');
    console.log('   Email: sneha.patel@design.com, Password: password123');
    console.log('   Email: vikram.singh@student.edu, Password: password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleUsers };