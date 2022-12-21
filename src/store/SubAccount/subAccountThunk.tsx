import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sleep } from "helpers/sleep";
import { toast } from "react-toastify";
import { IConnectAccount } from "./subAccountInterface";

const host = process.env.REACT_APP_HOST;

export const newConnectAccount = createAsyncThunk(
  "NEW_CONNECT_ACCOUNT",
  async ({ login, password }: IConnectAccount) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    
    const body = JSON.stringify({ email: login, password });
    console.log('config :>> ', config);
    try {
      
      const res = await axios.post(
        `${host}/api/users/new-connect-account`,
        body,
        config
      );
      
      if (res.status === 200) {
        await sleep();
        await toast.success("Konto zostało połączone!");
        return await res.data;
      }
      return;
    } catch (error) {
      toast.error("Coś poszło nie tak");
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);


export const getConnectAccount = createAsyncThunk(
  "GET_CONNECT_ACCOUNT",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      const res = await axios.get(
        `${host}/api/users/connect-account`, config);
      if (res.status === 200) {
        return res.data;
      }
      return;
    } catch (error) {
      toast.error("Coś poszło nie tak");
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

