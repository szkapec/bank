import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loader = (props: any) => {
  return (
    <div className="loader">
      <CircularProgress color="secondary" size={62}/>
      <div className="global-loader__loading">{props.text}</div>
    </div>
  )
}

export default Loader
