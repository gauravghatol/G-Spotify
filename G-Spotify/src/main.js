import './style.css';
import { APP_URL } from "./config";

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem("ACCESS_TOKEN"); // 🔥 Correct Key Name
  if (token) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`; // redirect to dashboard
  } else {
    window.location.href = `${APP_URL}/login/login.html`; // redirect to login
  }
});
