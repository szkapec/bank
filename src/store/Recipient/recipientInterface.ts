export interface IRecipients {
  recipients: {
    saved: IAddRecipient[];
    loading: boolean;
  }
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