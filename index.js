
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Fetch registered users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find the user by email and password
  const user = users.find(user => user.email === email && user.password === password);

  // Get the Forgot Password element
  const forgotPasswordElement = document.getElementById('forgot-password');

  if (user) {
      // Set the logged-in user's email in localStorage
      localStorage.setItem('currentUserEmail', user.email);

      // Hide the Forgot Password link on successful login
      forgotPasswordElement.style.display = 'none';

      // Redirect based on role
      if (user.role === 'admin') {
          alert('Login successful! Redirecting to Admin Portal...');
          window.location.href = 'admin-portal.html';
      } else if (user.role === 'student') {
          alert('Login successful! Redirecting to Student Portal...');
          window.location.href = 'student-portal.html';
      }
  } else {
      // Show the Forgot Password link on failed login
      forgotPasswordElement.style.display = 'block';
      alert('Invalid email or password. Please try again.');
  }
});