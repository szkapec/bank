import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendTransfer = createAsyncThunk("TRANSFER", async (text: any) => {
  const host = process.env.REACT_APP_HOST;
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = JSON.stringify(text);
  try {
    const res = await axios.post(`${host}/api/transfer`, body, config);
    if (res.status === 200) {
      return res.data;
    }
    return;
  } catch (error) {
    console.log(`error`, error);
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const getTransfers = createAsyncThunk(
  "GET_TRANSFER",
  async (bankAccountNumber: string) => {
    const host = process.env.REACT_APP_HOST;
    const token = localStorage.getItem("jwtToken");
    console.log(`token`, token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        `${host}/api/transfers/${bankAccountNumber}`,
        config
      );
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
  }
);
