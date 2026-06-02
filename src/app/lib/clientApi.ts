import axios, { AxiosInstance } from "axios";

const clientApi: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientApi;