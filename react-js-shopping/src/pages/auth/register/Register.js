import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  let initialState = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    cpassword: "",
    profilePicture: ''
  }
  const [formValues, setFormValues] = useState(initialState)
  const navigate = useNavigate();

  let formData = new FormData();    //formdata object

  formData.append('name', formValues.name);
  formData.append('phoneNumber', formValues.phoneNumber);
  formData.append('email', formValues.email);
  formData.append('password', formValues.password);
  formData.append('profilePicture', formValues.profilePicture);

  console.log('formValues', formValues)

  const handleRegisterSubmit = async (e) => {
    console.log('formData', formData)
    e.preventDefault();

    try {
      const { data: res } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        formData,
        // config,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      console.log('res', res)

      if (res.success) {
        setFormValues(initialState)
        alert(res.msg)
        navigate('/auth/send-otp', {
          state: {
            phoneNumber: formValues.phoneNumber
          }
        })
      } else {
        alert(res.msg)
        // return { status: true, message: "Something went wrong please try again !!" };
      }
    } catch (error) {
      console.log('error', error)
      alert(error.response.data.msg)
    }

  }

  return (

    <div className='container'>
      <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: "5%" }}>
        <div className='col-md-6'>
          <h1>Register</h1>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                value={formValues.phoneNumber}
                onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="text"
                className="form-control"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={formValues.cpassword}
                onChange={(e) => setFormValues({ ...formValues, cpassword: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                // value={formValues.profilePicture}
                onChange={(e) => {
                  e.preventDefault();
                  setFormValues({ ...formValues, profilePicture: e.target.files[0] })
                }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to='/auth/login'>Back to Login</Link>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register