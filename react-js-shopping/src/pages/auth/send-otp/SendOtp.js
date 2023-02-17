import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    phoneNumber: location.state.phoneNumber,
    otp: "12345",
  })

  const handleLoginSubmit = async (e) => {
    console.log('formValues', formValues)
    e.preventDefault();

    try {
      const { data: res } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/verify-otp`,
        formValues,
        // config,
        {
          "Content-Type": "application/json",
        }
      );

      console.log('res', res)

      if (res.success) {
        alert(res.msg)
        navigate('/auth/login')
      } else {
        alert(res.msg)
      }
    } catch (error) {
      console.log('error', error)
      alert(error.response.data.msg)
    }

  }
  return (
    <div className='container'>
      <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
        <div className='col-md-6'>
          <h1>Send OTP</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                value={formValues.phoneNumber}
                onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} disabled/>
            </div>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input type="text" className="form-control" value={formValues.otp} onChange={(e) => setFormValues({ ...formValues, otp: e.target.value })} disabled/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to='/auth/register'>Back to Register</Link>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login