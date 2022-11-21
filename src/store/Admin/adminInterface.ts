export interface IAdminRoot {
  admin: IAdminUsersInitialState;
}

export interface IAdminUsersInitialState {
  users: AdminUsers[];
  loadingUsers: boolean;
}

export interface AdminUsers {
  id: string;
  _id: string;
  email: string;
  error: boolean;
  firstName: string;
  createdAt: string;
  premium: boolean;
}

export interface IAdminLoginUser {
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
}

export interface IAdminGetUser {
  email: string;
  name: string;
  lastName: string;
  id: string;
}
