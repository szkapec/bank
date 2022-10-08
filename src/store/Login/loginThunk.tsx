import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken.ts";

const host = process.env.REACT_APP_HOST;

interface ILogin {
  email: string;
  password: string;
}
interface IRegister {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk("LOGIN", async (text: ILogin) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
  };
  const body = JSON.stringify(text);

  try {
    const res = await axios.post(`${host}/api/users/login`, body, config);
    console.log(`res`, res);
    console.log(`res`, res.data);
    if (res.status === 200) {
      console.log("res.data.user :>> ", res.data);
      localStorage.setItem("jwtToken", res.data.token);
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

export const register = createAsyncThunk(
  "REGISTER",
  async (text: IRegister) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
      },
    };
    const body = JSON.stringify(text);
    try {
      const res = await axios.post(`${host}/api/users/register`, body, config);
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
  }
);

export const userLoaded = createAsyncThunk("LOGIN", async (id) => {
  const token = localStorage.getItem("jwtToken");
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
    return;
  }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${host}/api/auth/${userId}`, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`error`, error);
    return {
      message: error.response.data,
      error: true,
    };
  }
});
