export interface ISearch2 {
  search: {
    firstname: string;
    lastname: string;
    searchName: string;
    recExp: string;
    above: string;
    upTo: string;
  };
}

export enum RecExp2 {
  All,
  Receipts,
  Expenses,
}
