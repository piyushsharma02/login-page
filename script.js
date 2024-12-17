document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  if (localStorage.getItem("authToken")) {
    window.location.href = "/home";
  }

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if (username !== "emilys") {
      alert("Invalid username. Only 'emilys' is allowed.");
      return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // API Call
    try {
      const response = await fetch("https://dummyjson.com/auth/login/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          email,
          expiresInMins: 30
        })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      alert("Login successful!");

      window.location.href = "home.html"; // Redirect to Home Page
    } catch (error) {
      alert(error.message);
    }

    
  });
});

function logout() {
  alert("You have been logged out!");
  // Additional logout logic can go here
  window.location.href = "index.html"; // Redirect or handle logout
}
