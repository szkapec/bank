import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import { IAddRecipient } from "./recipientInterface";
import { toast } from "react-toastify";

const host = process.env.REACT_APP_HOST;

export const userRecipients = createAsyncThunk("RECIPIENTS", async () => {
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
    const res = await axios.get(`${host}/api/recipient/${userId}`, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`error`, error);
    toast.error("Coś poszło nie tak", error);
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const addUserRecipients = createAsyncThunk(
  "RECIPIENTS",
  async (data: IAddRecipient) => {
    const token = localStorage.getItem("jwtToken");
    let id = null;
    if (token) {
      id = setAuthenticationToken();
    } else {
      id = null;
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
      const body = JSON.stringify({ ...data, id });
      const res = await axios.put(`${host}/api/recipient`, body, config);
      if (res.status === 200) {
        toast.success("Dodany nowy odbiorca");
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("Coś poszło nie tak", error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const editUserRecipients = createAsyncThunk(
  "RECIPIENTS",
  async (data: IAddRecipient) => {
    const token = localStorage.getItem("jwtToken");
    let id = null;
    if (token) {
      id = setAuthenticationToken();
    } else {
      id = null;
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
      const body = JSON.stringify({ ...data, id });
      const res = await axios.patch(`${host}/api/recipient/edit`, body, config);
      if (res.status === 200) {
        toast.success("Edycja przebiegła prawidłowo");
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("Coś poszło nie tak", error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const deleteUserRecipients = createAsyncThunk(
  "RECIPIENTS",
  async (recipientId: string) => {
    const token = localStorage.getItem("jwtToken");
    let id = null;
    if (token) {
      id = setAuthenticationToken();
    } else {
      id = null;
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
      const res = await axios.delete(
        `${host}/api/recipient/${recipientId}`,
        config
      );
      if (res.status === 200) {
        toast.success("Odbiorca usunięty");
        return res.data;
      }
      toast.error("Coś poszło nie tak");
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("Coś poszło nie tak", error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
