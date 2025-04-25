// login.js

import { APP_URL } from "../config.js";
import { ACCESS_TOKEN, TOKEN_TYPE, EXPIRES_IN } from "../common.js";

// Read environment variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

// Scopes for Spotify access
const SCOPES = [
  "user-top-read",
  "user-follow-read",
  "playlist-read-private",
  "user-library-read"
].join(" ");

if (!CLIENT_ID || !REDIRECT_URI) {
  alert("❌ Missing CLIENT_ID or REDIRECT_URI. Please check your .env file.");
  console.error("CLIENT_ID:", CLIENT_ID);
  console.error("REDIRECT_URI:", REDIRECT_URI);
}

// Open Spotify auth popup
const authorizeUser = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;

  window.open(authUrl, "Spotify Login", "width=800,height=600");
};

// When DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");

  if (loginButton) {
    loginButton.addEventListener("click", authorizeUser);
  } else {
    console.error("❌ Login button not found (id='login-to-spotify'). Check login.html.");
  }

  // Auto-redirect if token exists
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
});

// Called by callback.html (via window.opener)
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, Date.now() + Number(expiresIn) * 1000);
  window.location.href = `${APP_URL}/dashboard/dashboard.html`;
};
