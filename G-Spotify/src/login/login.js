const CLIENT_ID = "33ed0c317813438a9a6084c38234fb6f"; // hardcoded
const APP_URL = "https://g-spotify.vercel.app"; // hardcoded
const REDIRECT_URI = `${APP_URL}/login/login.html`;

const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";

const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
  window.location.href = url;
};

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  loginButton.addEventListener("click", authorizeUser);
});

window.addEventListener("load", () => {
  const { hash } = window.location;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const tokenType = params.get("token_type");
    const expiresIn = params.get("expires_in");

    if (accessToken) {
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("TOKEN_TYPE", tokenType);
      localStorage.setItem("EXPIRES_IN", Date.now() + parseInt(expiresIn) * 1000);
      window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }
  }
});
