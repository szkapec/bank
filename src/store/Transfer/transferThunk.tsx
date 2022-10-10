import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host = process.env.REACT_APP_HOST;
const token = localStorage.getItem("jwtToken");

export const sendTransfer = createAsyncThunk("TRANSFER", async (text: any) => {
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
      console.log('res.data :>> ', res.data);
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


export const getTransfers = createAsyncThunk('GET_TRANSFER', async(text: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(`${host}/api/transfers`, config);
    if (res.status === 200) {
      console.log('res.data :>> ', res.data);
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
})