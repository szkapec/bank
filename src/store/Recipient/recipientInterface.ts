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

export interface IAddRecipient {
  _id: string;
  recipientsAccount: string;
  recipientsAdress: string;
  recipientsName: string;
  sum: string;
  title: string;
  toRecipient: string;
  trustedRecipient?: boolean;
  createdAt: string
}

export interface IModalButton {
  buttons: {
    name: string;
    variant: any;
    disabled: boolean,
  }[],
}