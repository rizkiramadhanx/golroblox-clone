import axios from "axios";
import type {AxiosInstance} from 'axios'

const baseUrlAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export { baseUrlAxios };
