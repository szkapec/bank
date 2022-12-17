import { EUserPermission } from "store/Login/loginInterface";
import {
  EnumLimitTransaction,
  ILimitTransaction,
  limitInputDone,
  limitInputUser,
} from "./constant";

export const checkPermissions = (
  permissionUser: [EUserPermission],
  permissionSelected?: string,
  component?: string
) => {
  const levelPermission = selectPermission(permissionUser);
  if (permissionSelected && levelPermission) {
    const isVisible = permissionForInput(levelPermission, permissionSelected);
    return !isVisible;
  } else {
    return true
  }
};

export const permissionForInput = (
  levelPermission: number,
  permissionSelected: string
) => {
  switch (levelPermission) {
    case 1: {
      return permissionSelected === EUserPermission.DONE;
    }
    case 2: {
      const user = permissionSelected === EUserPermission.USER
      const done = permissionSelected === EUserPermission.DONE
      return user || done;
    }
    default:
      return true;
  }
};

export const permissionForChangeLimitTransaction = (
  permissionUser: [EUserPermission],
  value: any,
  name: any
) => {
  const permision = selectPermission(permissionUser);

  const validate = (limit: ILimitTransaction) => {
    if (name === EnumLimitTransaction.DAY) {
      return value <= limit.limitDay;
    } else if (name === EnumLimitTransaction.MOUTH) {
      return value <= limit.limitMouth;
    } else if (name === EnumLimitTransaction.FULL) {
      return value <= limit.limitFull;
    }
  }

  switch (permision) {
    case 1: {
      const value = validate(limitInputDone)
      return value;
    }
    case 2: {
      const value = validate(limitInputUser)
      return value;
    }
  }
  return false;
};

export const selectPermission = (permissionUser: [EUserPermission]) => {
  const level = permissionUser.map((perm) => {
    switch (perm) {
      case EUserPermission.DONE:
        return 1;
      case EUserPermission.USER:
        return 2;
    }
  });
  return level.sort()[level.length - 1];
};
