document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  loginButton.addEventListener("click", () => {
    window.location.href = "/dashboard/dashboard.html"; // 🚀 Instant redirect
  });
});
