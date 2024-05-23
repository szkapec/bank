export interface IGlobalSubAccount {
  subAccounts: ISubAccount;
}

export interface ISubAccount {
  accounts: IAccounts[];
  newAccount: {
    accountId: string;
    accountName: string;
  };
  message: string;
  loading: boolean;
  error: boolean;
}

export interface PayloadAccount {
  message: string;
  connectAccount: IAccounts[]
}
export interface IAccounts {
  _id: string;
  accountEmail: string;
  accountId: string;
  accountName: string;
}
export interface IConnectAccount {
  login: string;
  password: string;
}
