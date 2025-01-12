import React, { useState, useEffect } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import validation from './RegisterValidation'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Register = ({ closeModal }) => {

  const [values, setValues] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    re_password: '',
    checkbox: false
  })
  const [errors, setErrors] = useState({})
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (refresh) { setErrors(validation(values)) }
  }, [values])


  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const RegisterHandler = (e) => {
    setRefresh(true)
    e.preventDefault()
    setErrors(validation(values))
    let url = 'http://127.23.23.43:8000/user/register'
    let allValues = values.fname !== "" && values.mobile !== "" && values.email !== "" && values.password !== "" && values.re_password !== ""
    console.log(allValues)
    if (Object.keys(errors).length === 0 && !allValues) {
      Axios.post(url, values).then((resp) => {
        console.log(resp)
      })
        .catch(() => { })
    }
  }

  return <>
    <div className='Register-page-wrapper'>
      <div className='register-header'>
      <h1 className='register-heading'>Registration</h1>
        {/* <FontAwesomeIcon icon={faClose} className='close-icon' onClick={closeModal} /> */}
      </div>
      <div className="register-container">
        <form onSubmit={RegisterHandler} className='register-form'>
          <div className="register-content name-wrapper">
            <div className="name-cols">
              <label className='register-label'>FirstName <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name='fname' value={values.fname} className='register-input' onChange={changeHandler} />
              <p style={{ color: 'red' }}>{errors.fname}</p>
            </div>
            <div className="name-cols">
              <label className='register-label'>LastName (optional)</label>
              <input type="text" name='lname' value={values.lname} className='register-input' onChange={changeHandler} />
            </div>
          </div>
          <div className="register-content">
            <label className='register-label'>Mobile Number <span style={{ color: 'red' }}>*</span></label>
            <input type="number" name='mobile' value={values.mobile} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.mobile}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Email ID <span style={{ color: 'red' }}>*</span></label>
            <input type="text" name='email' value={values.email} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.email}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" name='password' value={values.password} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.password}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Confirm Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" name='re_password' value={values.re_password} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.re_password}</p>
          </div>
          <div className="submit-register-cont">
            <div className="terms-wrapper">
              <input type="checkbox" className='checkbox' onChange={() => { setValues({ ...values, checkbox: !values.checkbox }) }} /> <span className='terms-msg' >I accept all terms & conditions</span>
              <span style={{ color: 'red', marginLeft: '20px' }}>{errors.checkbox}</span>
            </div>

            <input type="submit" value='Register' className='register-btn' />
            <span className="exist-account-msg">Already have an account? <Link to='/login' className='navigate'>Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Register
