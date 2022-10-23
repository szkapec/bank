export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface IModalButton {
  buttons: {
    name: string;
    variant: any;
    disabled: boolean,
  }[],
}

export const buttons = [
  { name: "modal.buttons.domesticTransfer", variant: "contained", disabled: false },
  { name: "modal.buttons.topUpPhone", variant: "outlined", disabled: true },
  { name: "modal.buttons.transferOffice", variant: "outlined", disabled: true },
  { name: "modal.buttons.exchange", variant: "outlined", disabled: true },
];

export const initialFormValue = () => ({
  recipientsAccount: '',
  recipientsAdress: '',
  recipientsName: '',
  sum: '',
  title: '',
  toRecipient: ''
})