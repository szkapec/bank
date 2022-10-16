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
  id: string,
  body: string,
  createdAt: string,
  howMuchMoney: string,
  fromNumber: string,
  toNumber: string,
}[]