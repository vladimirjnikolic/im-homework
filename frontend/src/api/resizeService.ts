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

export const checkStatus = async (uploadId: string, fileName: string) => {
  const response = await axois.get(
    `${API_URL}/api/check-status?uploadId=${uploadId}&fileName=${encodeURIComponent(
      fileName
    )}`
  );
  return response.data;
};
