export interface IGlobalSubAccount {
  subAccounts: ISubAccount
}

export interface ISubAccount {
  accounts: any;
  newAccount: {
    accountId: string,
    accountName: string
  };
  message: string;
  loading: boolean;
  error: boolean;
}

export interface IConnectAccount {
  login: string;
  password: string;
}
