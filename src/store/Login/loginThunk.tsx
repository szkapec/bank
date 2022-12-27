import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import {
  ILoginUser,
  IUserLimit,
  IRegisterUser,
  ILoginToApp,
  IChangePassword,
} from "./loginInterface";
import { toast } from "react-toastify";
import { sleep } from "helpers/sleep";
import { API } from "api/dev-api";

const host = process.env.REACT_APP_HOST;

const useToken = (token: string) => {
  if (token) {
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", token);
  } else {
    console.log("Brak tokena :>> ");
    localStorage.removeItem("jwtToken");
  }
};

export const login = createAsyncThunk("LOGIN", async (text: ILoginToApp) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const body = JSON.stringify(text);
  try {
    const res = await axios.post(API.POST_USER_LOGIN, body, config);
    if (res.status === 200) {
      useToken(res.data.token);
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
  async (text: IRegisterUser) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify(text);
    try {
      const res = await axios.post(API.POST_USER_REGISTER, body, config);
      if (res.status === 200) {
        useToken(res.data.token);
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

export const loginUserLoaded = createAsyncThunk("LOGIN", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const token = localStorage.getItem("jwtToken");
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
    return;
  }
  try {
    const res = await axios.get(API.GET_USER_AUTH + userId, config);
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

export const loginRemindPassword = createAsyncThunk(
  "REMIND_PASSWORD",
  async ({ value, navigate }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email: value.email });
    try {
      const res = await axios.post(API.POST_USER_REMIND_PASSWORD, body, config);
      if (res.status === 200) {
        localStorage.setItem("emailChange", value.email);
        navigate("/remind-password");
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

export const loginRemindCode = createAsyncThunk(
  "REMIND_CODE",
  async ({ code, navigate }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ code });
    try {
      const res = await axios.post(API.POST_USER_REMIND_CODE, body, config);
      console.log(`res.status`, res);
      if (res.status === 200) {
        localStorage.setItem("emailCode", code);
        navigate("/change-password");
        return res.data;
      }
      return;
    } catch (error) {
      toast.error("Nie prawidłowy kod");
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginChangePassword = createAsyncThunk(
  "CHANGE_PASSWORD",
  async ({ email, code, password, navigate }: IChangePassword) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, code, password });
    try {
      const res = await axios.post(API.POST_USER_CHANGE_PASSWORD, body, config);
      if (res.status === 200) {
        res.data.password && navigate?.("/login");
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
  }
);

export const loginCheckPassword = createAsyncThunk(
  "CHANGE_PASSWORD_ACCOUNT",
  async ({ email, password }: {email: string; password: string}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(API.POST_USER_CHECK_PASSWORD, body, config);
      if (res.status === 200) {
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

export const loginSetNewPassword = createAsyncThunk(
  "SET_NEW_PASSWORD",
  async ({
    email,
    newPassword,
    oldPassword,
  }: {
    email: string;
    newPassword: string;
    oldPassword: string;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, newPassword, oldPassword });
    try {
      const res = await axios.post(
        API.POST_USER_SET_NEW_PASSWORD,
        body,
        config
      );
      if (res.status === 200) {
        toast.success(res.data.message);
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

export const loginChangeMyAccountPassword = createAsyncThunk(
  "CHANGE_PASSWORD_ACCOUNT",
  async ({ email, password }: { email: string; password: string }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(API.POST_USER_CHANGE_PASSWORD, body, config);
      if (res.status === 200) {
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
  }
);

export const loginChangeUserLanguage = createAsyncThunk(
  "CHANGE_USER_LANGUAGE",
  async (language: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    console.log("language :>> ", language);
    const body = JSON.stringify({ language });
    try {
      const res = await axios.post(API.POST_USER_CHANGE_LANGUAGE, body, config);
      if (res.status === 200) {
        toast.success("Język został zmieniony!");
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

export const loginChangeLanguage = createAsyncThunk(
  "CHANGE_USER_LIMIT",
  async ({ limitDay, limitMouth, limitFull }: IUserLimit) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ limitDay, limitMouth, limitFull });
    try {
      const res = await axios.post(API.POST_USER_CHANGE_LIMIT, body, config);
      if (res.status === 200) {
        toast.success("Limity zostały zmienione!");
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

export const loginSwitchAccount = createAsyncThunk(
  "SWITCH_ACCOUNT",
  async ({ accountId }: { accountId: string }) => {
    const useToken = (token: string) => {
      if (token) {
        localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);
      } else {
        console.log("Brak tokena :>> ");
        localStorage.removeItem("jwtToken");
      }
    };
    const body = JSON.stringify({ accountId });
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      const res = await axios.post(API.POST_USER_SWITCH_ACCOUNT, body, config);
      if (res.status === 200) {
        await sleep(6000);
        await toast.success("Zostałeś przelogowany");
        useToken(res.data.token);
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
