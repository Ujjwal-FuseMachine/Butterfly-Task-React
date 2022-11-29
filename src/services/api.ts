import axios from "axios";
import qs from "qs";

const apiConfig = {
  local: {
    baseUrl: "http://localhost:3001"
  }
};

axios.defaults.baseURL= apiConfig.local.baseUrl;
const api = axios.create({
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
    }),
});

export default api;


