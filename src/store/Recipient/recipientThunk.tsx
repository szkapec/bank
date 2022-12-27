import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import { IAddRecipient } from "./recipientInterface";
import { toast } from "react-toastify";
import { API } from "api/dev-api";

const host = process.env.REACT_APP_HOST;

export const userRecipients = createAsyncThunk("RECIPIENTS_GET", async () => {
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
    const res = await axios.get(API.GET_RECIPIENTS + userId, config);
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
  "RECIPIENTS_PUT",
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
      const res = await axios.put(API.PUT_RECIPIENTS, body, config);
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
  "RECIPIENTS_PATCH",
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
      const res = await axios.patch(API.PATCH_RECIPIENTS, body, config);
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
  "RECIPIENTS_DELETE",
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
        API.DELETE_RECIPIENTS + recipientId,
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
