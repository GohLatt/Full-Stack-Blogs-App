import { APT_URL } from "@/lib/types";
import toast from "react-hot-toast";
export const fetchAuthApi = async (endpoint = "", data = {}) => {
  const url = APT_URL + endpoint;
  const method = "POST";
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const options = { method, headers, body: JSON.stringify(data) };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const res = await response.json();

      toast.error(res.message);

      return null;
    }

    return response.json();
  } catch (error: any) {
    toast.error("Server Error");
  }
};
