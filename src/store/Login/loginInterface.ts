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
  color: string;
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