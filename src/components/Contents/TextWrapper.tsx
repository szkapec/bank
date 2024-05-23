import React from "react";
import { useTranslation } from "react-i18next";

interface propsType {
  label: string;
  Selector?: any;
}

const TextWrapper = ({ label = '', Selector = 'span' }: propsType) => {
  const { t } = useTranslation();
  return <Selector>{t(label || '')}</Selector>;
};

export default TextWrapper;