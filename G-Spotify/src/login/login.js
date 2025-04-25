import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";
import { APP_URL } from "../config";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `${APP_URL}/login/callback.html`;
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";

if (!CLIENT_ID) {
  alert("Error: Missing Spotify CLIENT_ID. Please check your .env configuration.");
}

const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
  window.open(url, "login", "width=800,height=600");
};

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  loginButton.addEventListener("click", authorizeUser);
});

window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_TYPE, tokenType);
  localStorage.setItem(EXPIRES_IN, (Date.now() + expiresIn * 1000));
  window.location.href = APP_URL + "/dashboard/dashboard.html";
};

window.addEventListener("load", () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
});
