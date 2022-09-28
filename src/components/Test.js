import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { next, newRedcer } from '../store/User/user.slice';


const Test = () => {

  const dispatch = useDispatch();

  const click = (e, name) => {
    e.preventDefault();
    console.log(`name`, name)
    dispatch(newRedcer(name))
  }
  const [name, setName] = useState('')
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={(e) => click(e, name)}>CLICK</button>
    </div>
  )
}

export default Test
