import axois from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const resizeImages = async (formData: FormData) => {
  const response = await axois.post(`${API_URL}/api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
