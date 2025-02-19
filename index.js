document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by email
  const user = users.find((user) => user.email === email);

  // Get the forgot password element
  const forgotPasswordElement = document.getElementById("forgot-password");

  if (!user) {
    alert("User not found. Please register.");
    forgotPasswordElement.style.display = "none"; // Hide forgot password link
    return;
  }

  // Check password
  if (user.password !== password) {
    alert("Incorrect password. Please try again.");
    forgotPasswordElement.style.display = "block"; // Show forgot password link
    return;
  }
  

  // Redirect based on role
  if (user.role === "admin") {
    alert("Login successful! Redirecting to Admin Portal...");
    window.location.href = "admin-portal.html"; // Redirect to admin portal
  } else if (user.role === "student") {
    alert("Login successful! Redirecting to Student Portal...");
    window.location.href = "student-portal.html"; // Redirect to student portal
  } else {
    alert("Login Failed, Please Check Your credentials.");
  }
});