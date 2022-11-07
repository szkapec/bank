
export interface ITransfer {
  transfer: {
    error: boolean;
    message: string;
  }
  data: IColumn[];
  loading: boolean;
}
export interface ITransfers {
  transfers: ITransfer
}
export interface IColumn {
  fromUser: {
    bankAccountNumber: string,
    email: string,
    id: string,
    firstName: string,
    lastName: string,
  };
  toUser: {
    bankAccountNumber: string,
    email: string,
    id: string,
    firstName: string,
    lastName: string,
  };
  _id: string,
  id: string,
  body: string,
  createdAt: string,
  howMuchMoney: string,
  fromNumber: string,
  error?: boolean,
  toNumber: string,
}

export interface IPropsTransfer {
  error: {
    errorAccount: boolean,
    errorMoney: boolean,
    errorBody: boolean,
  },
  formData: {
    body: string,
    howMuchMoney: string,
    numberReceived:string,
    nameReceived: string,
  }
  setFormData: Function,
  money: number,
}
