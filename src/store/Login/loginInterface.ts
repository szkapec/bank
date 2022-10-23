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
  money: number
}

export interface IAuth {
  auth: {
    user: ILoginUser;
    error: boolean;
    loading: boolean;
  };
}
