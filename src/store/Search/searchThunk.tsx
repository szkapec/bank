import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host = process.env.REACT_APP_HOST;
const token = localStorage.getItem("jwtToken");


export const getTransfers = createAsyncThunk('GET_TRANSFER', async(bankAccountNumber: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${host}/api/transfers/${bankAccountNumber}`, config);
    if (res.status === 200) {
      return res.data.fromClient;
    }
    return;
  } catch (error) {
    console.log(`error`, error);
    return {
      message: error.response.data,
      error: true,
    };
  }
})