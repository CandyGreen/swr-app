import AxiosStatic from "axios";

import { config } from "../configs/axios.config";

export const axios = AxiosStatic.create({
  baseURL: config.BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
