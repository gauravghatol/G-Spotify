import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common.js";

// Production environment variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const APP_URL = import.meta.env.VITE_APP_URL; // e.g., "https://yourdomain.com"
const REDIRECT_URI = `${APP_URL}/login/callback.html`;

// Verify the production URL is being used
console.log("Production Redirect URI:", REDIRECT_URI);

if (!CLIENT_ID || !APP_URL) {
  throw new Error("Missing required environment variables");
}

const authorizeUser = () => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("client_id", CLIENT_ID);
  authUrl.searchParams.append("response_type", "token");
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.append("scope", "user-top-read user-follow-read playlist-read-private user-library-read");
  
  window.location.href = authUrl.toString();
};

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  
  if (loginButton) {
    loginButton.addEventListener("click", authorizeUser);
  } else {
    console.error("Login button not found");
  }

  // Redirect if already logged in
  if (localStorage.getItem(ACCESS_TOKEN)) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
});

// Make sure this matches callback.html's expected function
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, Date.now() + expiresIn * 1000);
  window.location.href = `${APP_URL}/dashboard/dashboard.html`;
};
