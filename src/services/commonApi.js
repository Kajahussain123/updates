import axios from "axios";

export const commonApi = async (method, url, reqBody = {}, reqHeader = {}) => {
  const config = {
    method,
    url,
    data: reqBody,
    headers: {
      "Content-Type": "application/json",
      ...reqHeader, 
    },
  };

  console.log("API Request Config:", config);

  try {
    const result = await axios(config);
    console.log("API Response:", result.data);
    return result;
  } catch (error) {
    console.error("API request failed:", error);
    if (error.response) {
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }
    return error.response;
  }
};
