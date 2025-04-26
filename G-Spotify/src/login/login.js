import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";
import { APP_URL } from "../config";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `${APP_URL}/login/login.html`;
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";

const authorizeUser = () => {
    // Instead of window.open, just use window.location.href
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.location.href = url; // 👈 full page redirect
};

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);
});

window.addEventListener("load", () => {
    const { hash } = window.location;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove the #
        const accessToken = params.get("access_token");
        const tokenType = params.get("token_type");
        const expiresIn = params.get("expires_in");

        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(TOKEN_TYPE, tokenType);
            localStorage.setItem(EXPIRES_IN, Date.now() + parseInt(expiresIn) * 1000);
            window.location.href = `${APP_URL}/dashboard/dashboard.html`;  // redirect user to dashboard
        }
    }
});
