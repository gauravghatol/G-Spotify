const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = [
  "user-top-read",
  "user-follow-read",
  "playlist-read-private",
  "user-library-read"
].join(" ");

const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;

window.open(authUrl, "Spotify Login", "width=800,height=600");
