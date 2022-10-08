import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectorLoginTransferUser } from '../../../store/Login/loginSelector.ts';

const Transfer = () => {

  const userDataSelector = useSelector(selectorLoginTransferUser)
  const { bankAccountNumber, email } = userDataSelector || {}
  const initialFormData = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialFormData)
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const submit = (event) => {
    event.preventDefault()
    console.log(`event`, event)
  }

  return (
    <div>
      Transfer

      <h2>Zleć przelew krajowy:</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            <div>Numer konta bankowego</div>
            <input type='number'  onChange={handleChange}/>
          </div>
          <div>
            <div>Imię</div>
            <input type='text' onChange={handleChange}/>
          </div>
          <div>
            <div>Nazwisko</div>
            <input type="text" onChange={handleChange}/>
          </div>
        </div>
        <button type="submit">Wyślij</button>
      </form>


      <div>
        <div>Moje dane</div>
        <div>
          Numer konta: { bankAccountNumber }
        </div>
        <div>
          email: { email } 
        </div>
      </div>
    </div>
  )
}

export default Transfer
