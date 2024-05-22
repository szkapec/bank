import { NavigateFunction } from "react-router";

export interface ILoginUser {
  id: string;
  token: string;
  refreshToken: string;
  email: string;
  error: boolean;
  bankAccountNumber: string;
  savedRecipients: any;
  transfers: any;
  premium: boolean;
  message: string;
  money: number;
  language: string;
  permission: [EUserPermission];
  limit: IUserLimit;
  lastName: string;
  firstName: string;
  account: string;
  color: string;
}

export interface ILoginToApp {
  email: string;
  password: string;
}
export interface IAuth {
  auth: {
    user: ILoginUser;
    error: boolean;
    loading: boolean;
  };
}

export interface IUserLimit {
  limitDay: number;
  limitMouth: number; 
  limitFull: number;
}

export enum EUserPermission {
  DONE = "done",
  USER = 'user',
}

export interface IRegisterUser {
  account: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string
  sex: "male" | "female"
}

export interface IErrorFormRegister {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
}

export interface IChangePassword {
  password: string;
  repeatPassword?: string;
  code?: string | null;
  navigate?: NavigateFunction;
  email?: string | null;
}