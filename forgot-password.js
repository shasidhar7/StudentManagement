document.addEventListener("DOMContentLoaded", function () {
  let generatedOTP = ""; // Stores the generated OTP

  // Select forms
  const emailForm = document.getElementById("emailForm");
  const otpForm = document.getElementById("otpForm");
  const passwordForm = document.getElementById("passwordForm");

  // Step 1: Handle Email Submission
  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = document.getElementById("reset-email").value.trim();

    if (emailInput === "") {
      alert("Please enter a valid email!");
      return;
    }

    // Check if the email is registered
    const isRegistered = checkRegisteredEmail(emailInput);

    if (!isRegistered) {
      alert("This email is not registered. Please enter a correct email!");
      return;
    }

    // Generate 6-digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Show OTP in an alert (for testing purposes)
    alert(`Your OTP is: ${generatedOTP}`);

    emailForm.style.display = "none"; // Hide email form
    otpForm.style.display = "block"; // Show OTP form
  });

  // Step 2: Handle OTP Verification
  otpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const enteredOTP = document.getElementById("otp").value.trim();

    if (enteredOTP === generatedOTP) {
      alert("OTP Verified Successfully!");
      otpForm.style.display = "none"; // Hide OTP form
      passwordForm.style.display = "block"; // Show password reset form
    } else {
      alert("Invalid OTP! Please try again.");
    }
  });

  // Step 3: Handle Password Reset
  passwordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = document.getElementById("reset-email").value.trim();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Update the password in localStorage
    updatePassword(emailInput, newPassword);

    alert("Password reset successful! Redirecting to login page...");
    window.location.href = "index.html"; // Redirect to login page
  });

  // Function to check if the email is registered
  function checkRegisteredEmail(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
  }

  // Function to update the password in localStorage
  function updatePassword(email, newPassword) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
});
