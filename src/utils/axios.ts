import type { AxiosInstance } from "axios";
import axios from "axios";
import { deleteCookie } from "cookies-next";

const baseUrlAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

baseUrlAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response;
    if (status === 401) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { baseUrlAxios };

