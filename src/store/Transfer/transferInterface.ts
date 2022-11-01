export interface ITransfer {
  transfers: {
    transfer: {
      error: boolean,
      message: string,
    }
    data: [
      {
        _id: string,
        body: string,
        fromNumber: string,
        toNumber: string,
        error: boolean,
        message: string,
        createdAt: string
        toUser: {
          bankAccountNumber: String,
          email: string,
          id: string
        },
        fromUser: {
          bankAccountNumber: String,
          email: string,
          id: string
        }
      }
    ],
    loading: boolean
  }
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
