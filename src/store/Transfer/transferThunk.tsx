import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import i18n from "util/initTranslation";

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
      const message = i18n.t("global.transferHasBeenCompleted")
      toast.success(message);
      return res.data;
    } else if (res.status >= 500) {
      const message = i18n.t("global.transferWasNotCompleted")
      toast.info(message);
      return res.data;
    }
    return;
  } catch (error) {
    console.log(`error`, error.response.data.message);
    const message = i18n.t("global.transferWasNotCompleted")
    toast.error(message);
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
