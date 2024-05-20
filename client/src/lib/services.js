import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const commonAPI = async (
  endpoint = "",
  reqType = "GET",
  params = {},
  headers = {}
) => {
  const url = `${API_URL}/${endpoint}`;
  const config = {
    headers: headers,
    timeout: 7500,
    // retry: 1,
  };

  switch (reqType) {
    case "POST":
      return await axios.post(url, params, config);
    case "PUT":
      return await axios.put(url, params, config);
    case "DELETE":
      return await axios.delete(url, config);
    default:
      return await axios.get(url, config);
  }
};
