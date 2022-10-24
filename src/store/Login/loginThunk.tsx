import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import { IAuth, ILoginUser } from './loginInterface';
const host = process.env.REACT_APP_HOST;

const useToken = (token: string) => {
  if(token){
     localStorage.removeItem('jwtToken');
     localStorage.setItem('jwtToken', token)
  } else {
    console.log('Brak tokena :>> ', );
    localStorage.removeItem('jwtToken');
  }
}

export const login = createAsyncThunk("LOGIN", async (text: ILoginUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
  };
  const body = JSON.stringify(text);

  try {
    const res = await axios.post(`${host}/api/users/login`, body, config);
    if (res.status === 200) {
      useToken(res.data.token)
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
  async (text: IAuth) => {
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
        useToken(res.data.token)
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
