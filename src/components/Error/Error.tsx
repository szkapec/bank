import { useTranslation } from "react-i18next";

const Error = ({ error }: { error: string }) => {
  return <div>Błąd np: {error}</div>;
};

export default Error;

export const ErrorFunction = (error: any, message: any) => {
  console.log("error :>> ", error, message);
};

export const useGlobalToastError = (errorMessage: string) => {
  const { t } = useTranslation();
  return null;
};
