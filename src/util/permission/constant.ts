export interface ILimitTransaction {
  limitDay: number,
  limitMouth: number,
  limitFull: number,
}

export const limitInputDone = {
  limitDay: 50,
  limitMouth: 500,
  limitFull: 250,
}

export const limitInputUser = {
  limitDay: 100,
  limitMouth: 1000,
  limitFull: 500,
}

export enum EnumLimitTransaction {
  DAY = 'limitDay',
  MOUTH = 'limitMouth',
  FULL = 'limitFull',
}