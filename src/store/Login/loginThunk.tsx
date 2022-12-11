import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import { IAuth, ILoginUser } from './loginInterface';
import { toast } from "react-toastify";

const host = process.env.REACT_APP_HOST;

const config = {
  headers: {
    "Content-Type": "application/json",
    mode: "cors",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
};

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
    const body = JSON.stringify(text);
    try {
      const res = await axios.post(`${host}/api/users/register`, body, config);
      if (res.status === 200) {
        useToken(res.data.token)
        return res.data;
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

export const userLoaded = createAsyncThunk("LOGIN", async () => {
  const token = localStorage.getItem("jwtToken");
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
    return;
  }
  try {
    const res = await axios.get(`${host}/api/auth/${userId}`, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    return {
      message: error.response.data,
      error: true,
    };
  }
});


export const remindPassword = createAsyncThunk("REMIND_PASSWORD", async({ value, navigate }: any) => {
  const body = JSON.stringify({ email: value.email});
  try {
    const res = await axios.post(`${host}/api/users/remind-password`, body, config);
    if (res.status === 200) {
      localStorage.setItem("emailChange", value.email);
      navigate('/remind-password')
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

export const remindCode = createAsyncThunk("REMIND_CODE", async ({ code, navigate }: any) => {
  const body = JSON.stringify({ code });
  try {
    const res = await axios.post(`${host}/api/users/remind-code`, body, config);
    console.log(`res.status`, res)
    if (res.status === 200) {
      localStorage.setItem("emailCode", code);
      navigate('/change-password')
      return res.data;
    }
    return;
  } catch (error) {
    toast.error('Nie prawidłowy kod')
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const changePassword = createAsyncThunk("CHANGE_PASSWORD", async ({ email, code, password, navigate }: any) => {
  const body = JSON.stringify({ email, code, password });
  try {
    const res = await axios.post(`${host}/api/users/change-password`, body, config);
    if (res.status === 200) {
      res.data.password && navigate('/login')
      toast.success("Hasło zostało zmienione!");
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