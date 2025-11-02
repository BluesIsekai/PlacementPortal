// Test signup flow script
// Run this in browser console on /register page

async function testSignupFlow() {
  console.log('🧪 Testing signup flow...');
  
  // Test data
  const testUser = {
    name: 'Test User',
    email: 'test' + Date.now() + '@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  };
  
  console.log('📝 Test user data:', testUser);
  
  try {
    // Test backend registration API
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        confirmPassword: testUser.confirmPassword
      })
    });

    const data = await response.json();
    
    console.log('🔍 API Response:', {
      status: response.status,
      ok: response.ok,
      data: data
    });
    
    if (response.ok && data.success) {
      console.log('✅ Registration API test successful!');
      console.log('📧 User email:', data.user.email);
      console.log('🎫 Token received:', data.token);
      console.log('👤 User data:', data.user);
      
      // Test localStorage storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
      console.log('💾 Data stored in localStorage');
      
      // Test redirection logic
      console.log('🔄 Should redirect to /complete-profile for new users');
      
    } else {
      console.error('❌ Registration failed:', data.message);
    }
    
  } catch (error) {
    console.error('🚨 Network error:', error);
  }
}

// Run the test
testSignupFlow();
