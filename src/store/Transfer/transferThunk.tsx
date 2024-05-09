import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.success("Przelew został zrealizowany!");
      return res.data;
    } else if (res.status >= 500) {
      toast.success("Przelew nie został zrealizowany!");
      return res.data;
    }
    return;
  } catch (error) {
    console.log(`error`, error.response.data.message);
    toast.info(
      error.response.data.message || "Przelew nie został zrealizowany!"
    );
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const getTransfers = createAsyncThunk(
  "GET_TRANSFER",
  async (data: any) => {
    const host = process.env.REACT_APP_HOST;
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log(`data xxxxd`, data);
      const res = await axios.get(
        `${host}/api/transfers/${data.bankAccountNumber}/${data.pageNumber}`,
        config
      );
      if (res.status === 200) {
        return res.data.fromClient;
      }
      return;
    } catch (error) {
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
