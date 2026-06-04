import axios, { AxiosInstance } from "axios";

type TokenGetter = () => Promise<string | null>;

let accessTokenGetter: TokenGetter | null = null;

export function setAccessTokenGetter(getter: TokenGetter): void {
  accessTokenGetter = getter;
}

const clientApi: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.request.use(async (config) => {
  if (!accessTokenGetter) {
    return config;
  }

  const token = await accessTokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default clientApi;
