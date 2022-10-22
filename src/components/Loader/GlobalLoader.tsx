import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './loader.scss';

const GlobalLoader = () => {
  return (
    <div className="global-loader">
      <CircularProgress color="secondary" size={62}/>
      <div className="global-loader__loading">Ładuje dane...</div>
    </div>
  )
}

export default GlobalLoader;
