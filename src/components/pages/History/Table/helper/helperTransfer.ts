import { IColumn } from "./helper.interface";
import { RecExp } from "../../../../../store/Search/searchInterface";

export const CountDay = (day: string) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const newData = new Date(day).getDate();
  if (newData === today.getDate()) {
    return "Dzisiaj";
  } else if (newData === yesterday.getDate()) {
    return "Wczoraj";
  }
  return day?.substr(0, 10);
};

export const filterRecExp = (
  transfers: IColumn[],
  recExpSelector: string,
  numberAccount: string
) => {
  if (recExpSelector === RecExp[1]) {
    return transfers?.filter(
      (transfer) =>
        transfer.fromUser.bankAccountNumber !== numberAccount && transfer
    );
  } else if (recExpSelector === RecExp[2]) {
    return transfers?.filter(
      (transfer) =>
        transfer.fromUser.bankAccountNumber === numberAccount && transfer
    );
  } else return transfers;
};

export const filterMoneyRecExp = (
  transfer: IColumn[],
  above: string,
  upTo: string,
  bankAccountNumber: string
) => {
  const aboveConvert = parseFloat(above);
  const upToConvert = parseFloat(upTo);

  return transfer.filter(transfer => {
    let negative;
    if (transfer.fromUser.bankAccountNumber === bankAccountNumber) {
      negative = -transfer.howMuchMoney;
    }
    let money = parseFloat(negative?.toString() || transfer.howMuchMoney);
    if (aboveConvert && upToConvert) {
      return money >= aboveConvert && money <= upToConvert && transfer;
    } else if (aboveConvert) {
      return money >= aboveConvert && transfer;
    } else if (upToConvert) {
      return money <= upToConvert && transfer;
    } else return [];
  });
};

export const filterName = (
  transfers: IColumn[],
  searchNameSelector: string
) => {
  console.log(`transfers`, transfers)
  const newTransfersFromUser = transfers.filter(
    (transfer) => transfer.fromUser.lastName.search(searchNameSelector) === 0
  );
  const newTransfersToUser = transfers.filter(
    (transfer) => transfer.toUser.lastName.search(searchNameSelector) === 0
  );
  return newTransfersFromUser.concat(newTransfersToUser);
};
