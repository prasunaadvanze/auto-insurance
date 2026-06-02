import axios from "axios";


if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined in .env.local");
}

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;