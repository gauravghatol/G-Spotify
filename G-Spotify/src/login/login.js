import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";
import { APP_URL } from "../config";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `${APP_URL}/login/login.html`;
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";

// Open Spotify Login
const authorizeUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login", "width=800,height=600");
};

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);
});

// Utility to save to localStorage
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, (Date.now() + expiresIn * 1000));
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;  // ✅ Immediately redirect to dashboard
};

window.addEventListener("load", () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
        // Already logged in, go to dashboard
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
        return;
    }

    // Check if this page was opened by Spotify callback
    if (window.opener && !window.opener.closed) {
        const { hash } = window.location;
        const searchParams = new URLSearchParams(hash.substring(1));  // REMOVE # before parsing

        const accessToken = searchParams.get("access_token");  // Correct param name
        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");

        if (accessToken) {
            // Pass access token to opener (main window)
            window.opener.setItemsInLocalStorage({ accessToken, tokenType, expiresIn });
            window.close();
        } else {
            console.error("Login failed. No access token found.");
            window.close();
        }
    }
});
