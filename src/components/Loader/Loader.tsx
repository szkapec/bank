import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

interface IProps {
  text?: string;
}

const Loader = ({ text }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="loader">
      <CircularProgress color="secondary" size={62}/>
      <div className="global-loader__loading">{text && t(text)}</div>
    </div>
  )
}

export default Loader
