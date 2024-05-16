import { useSelector } from "react-redux";
import { IColumn } from "store/Transfer/transferInterface";
import {
  selectorSearchName,
  selectorSearchRecExp,
  selectorSearchAbove,
  selectorSearchUpTo,
} from "store/Search/searchSelector";
import {
  CountDay,
  filterMoneyRecExp,
  filterName,
  filterRecExp,
} from "./helperTransfer";

export const TableData = (
  transfersSelector: IColumn[],
  accountNumberSelector: string
) => {
  const searchNameSelector: string = useSelector(selectorSearchName);
  const searchAboveSelector: string = useSelector(selectorSearchAbove);
  const searchUpToSelector: string = useSelector(selectorSearchUpTo);
  const searchRecExpSelector: string = useSelector(selectorSearchRecExp);

  let newTransfers = filterRecExp(
    transfersSelector,
    searchRecExpSelector,
    accountNumberSelector
  );

  if (searchNameSelector.length > 3) {
    newTransfers = filterName(newTransfers, searchNameSelector);
  } else {
    newTransfers = filterRecExp(
      transfersSelector,
      searchRecExpSelector,
      accountNumberSelector
    );
  }

  if (Number(searchAboveSelector) || Number(searchUpToSelector)) {
    newTransfers = filterMoneyRecExp(
      newTransfers,
      searchAboveSelector,
      searchUpToSelector,
      accountNumberSelector
    );
  }

  try {
    return newTransfers?.map(
      ({ fromUser, toUser, body, howMuchMoney, createdAt, _id }: IColumn) => ({
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
        confirmation: _id + "&&" + createdAt,
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
        settings: ":"
      })
    );
  } catch (error) {
    return [];
  }
};
