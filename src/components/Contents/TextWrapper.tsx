import React from 'react'
import { useTranslation } from 'react-i18next';

const TextWrapper = ({ label, Selector = 'span' }: any) => {
  const { t } = useTranslation();
  return (
    <Selector>
      {t(label)}
    </Selector>
  )
}

export default TextWrapper
