export interface ISearch {
  search: {
    firstname: string;
    lastname: string;
    searchName: string;
    recExp: string;
    above: string;
    upTo: string;
  };
}

export enum RecExp {
  All,
  Receipts,
  Expenses,
}
