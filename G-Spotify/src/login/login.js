import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common.js";
import { APP_URL } from "../config.js";

// 🔑 Load from Vite environment variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `${APP_URL}/login/callback.html`;
const SCOPES = [
  "user-top-read",
  "user-follow-read",
  "playlist-read-private",
  "user-library-read"
].join(" ");

if (!CLIENT_ID || !REDIRECT_URI) {
  alert("❌ Error: Missing CLIENT_ID or REDIRECT_URI. Please check your .env and Vercel setup.");
  console.error("CLIENT_ID:", CLIENT_ID);
  console.error("REDIRECT_URI:", REDIRECT_URI);
}

const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;

  console.log("🔐 Redirecting to:", url);
  window.open(url, "Spotify Login", "width=800,height=600");
};

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  if (loginButton) {
    loginButton.addEventListener("click", authorizeUser);
  } else {
    console.error("❌ login-to-spotify button not found.");
  }

  // Auto redirect to dashboard if token exists
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
});

// Called from callback.html to set token data
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, Date.now() + Number(expiresIn) * 1000);

  window.location.href = `${APP_URL}/dashboard/dashboard.html`;
};
