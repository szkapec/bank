import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Error = ({ error }: { error: string }) => {
  return <div>Błąd np: {error}</div>;
};

export default Error;

export const ErrorFunction = (error: any, message: any) => {
  console.log("error :>> ", error);
  console.log("message :>> ", message);
};

export const useGlobalToastError = (errorMessage: string) => {
  const { t } = useTranslation();
  // toast.success(t("recipients.editingWentFine"));
  // toast.success('yyyyyy?');

  console.log("errorMessage :>> ", errorMessage);
  return null;
};
