import { IColumn } from "./helper.interface";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const CountDay = (day: string) => {
  const newData = new Date(day).getDate();
  if (newData === today.getDate()) {
    return "Dzisiaj";
  } else if (newData === yesterday.getDate()) {
    return "Wczoraj";
  }
  return day?.substr(0, 10);
};

export const TableData = (
  transfersSelector: any,
  accountNumberSelector: string
) => {
  try {
    return transfersSelector?.map(
      ({ fromUser, toUser, body, howMuchMoney, createdAt }: IColumn) => ({
        firstName:
          accountNumberSelector === toUser.bankAccountNumber
            ? fromUser.firstName + " " + fromUser.lastName
            : toUser.firstName + " " + toUser.lastName,
        body: body,
        account:
          accountNumberSelector === toUser.bankAccountNumber
            ? fromUser.bankAccountNumber
            : toUser.bankAccountNumber,
        price:
          accountNumberSelector === toUser.bankAccountNumber
            ? `${howMuchMoney}PLN`
            : `${-howMuchMoney}PLN`,
        date: CountDay(createdAt),
        subRows: [
          {
            firstName:
              accountNumberSelector !== toUser.bankAccountNumber
                ? fromUser.firstName + " " + fromUser.lastName
                : toUser.firstName + " " + toUser.lastName,
            body: "",
            account:
              accountNumberSelector !== toUser.bankAccountNumber
                ? fromUser.bankAccountNumber
                : toUser.bankAccountNumber,
          },
        ],
      })
    );
  } catch (error) {
    return [];
  }
};
