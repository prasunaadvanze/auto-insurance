import axios, { AxiosInstance } from "axios";

if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined in .env.local");
}

export function createBackendClient(accessToken?: string | null): AxiosInstance {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.create({
    baseURL: process.env.BACKEND_URL,
    headers,
  });
}

/** Default client without auth — prefer createBackendClient in API routes. */
const api = createBackendClient();

export default api;
