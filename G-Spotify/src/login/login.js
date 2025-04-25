// login.js
import { APP_URL } from "../config.js";
import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common.js";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const SCOPES = [
  "user-top-read",
  "user-follow-read",
  "playlist-read-private",
  "user-library-read"
].join(" ");

if (!CLIENT_ID || !REDIRECT_URI) {
  alert("Error: Missing Spotify CLIENT_ID or REDIRECT_URI. Check .env setup.");
}

const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;

  window.open(url, "Spotify Login", "width=800,height=600");
};

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  if (loginButton) {
    loginButton.addEventListener("click", authorizeUser);
  }

  // If user already has a token, redirect to dashboard
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
});

// Called by /login/callback.html window
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, Date.now() + Number(expiresIn) * 1000);
  window.location.href = `${APP_URL}/dashboard/dashboard.html`;
};
