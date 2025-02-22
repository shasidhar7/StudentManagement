// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Get form values
//   const email = document.querySelector('input[name="email"]').value;
//   const password = document.querySelector('input[name="password"]').value;

//   // Get stored users from localStorage
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   // Find user by email
//   const user = users.find((user) => user.email === email);

//   // Get the forgot password element
//   const forgotPasswordElement = document.getElementById("forgot-password");

//   if (!user) {
//     alert("User not found. Please register.");
//     forgotPasswordElement.style.display = "none"; // Hide forgot password link
//     return;
//   }

//   // Check password
//   if (user.password !== password) {
//     alert("Incorrect password. Please try again.");
//     forgotPasswordElement.style.display = "block"; // Show forgot password link
//     return;
//   }

//   // Store the logged-in user's data in localStorage
//   localStorage.setItem("loggedInUser", JSON.stringify(user));

//   // Redirect based on role
//   if (user.role === "admin") {
//     alert("Login successful! Redirecting to Admin Portal...");
//     window.location.href = "admin-portal.html"; // Redirect to admin portal
//   } else if (user.role === "student") {
//     alert("Login successful! Redirecting to Student Portal...");
//     // Redirect to student portal with the student's email as a query parameter
//     window.location.href = `student-portal.html?email=${encodeURIComponent(user.email)}`;
//   } else {
//     alert("Login Failed, Please Check Your credentials.");
//   }
// });


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