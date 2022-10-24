import axios from "axios";
import { getRecipientTest } from './recipientSlice';

export const getRecipients = async() => {
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`http://localhost:5000/api/recipient/63503f3f4093e59d0eaf3c9c`, config);
  console.log(`response`, res.data)
  getRecipientTest(res.data)
  return res.data;
};