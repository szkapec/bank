import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userSelector } from './store/User/user.selector';
import { useSelector } from 'react-redux';
import Test from './components/Test';

const App = () => {

  const selector = useSelector(userSelector)

  console.log('selector :>> ', selector);
  return (
    <div>
      sdasdsa
      <Test/>
    </div>
  )
}

export default App
