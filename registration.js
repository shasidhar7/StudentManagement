document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const role = document.querySelector('input[name="role"]:checked').value;

  // Validate password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert("Email already in use. Please use a different email.");
    return;
  }

  // Create user object
  const user = { username, email, password, gender, role };

  // Store user in localStorage
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Redirecting to login page...");
  window.location.href = "index.html";
});
