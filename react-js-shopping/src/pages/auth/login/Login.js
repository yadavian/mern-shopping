import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setisLoggedIn } from '../../../redux/slices/loginSlice'

const Login = () => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // console.log('formData', formData)

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    try {

      const { data: res } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        // config,
        {
          headers: {
            "Content-Type": "application/json",
          }
        },
      ); 

      if (res.success) {
        alert(res.msg)
        dispatch(setisLoggedIn({
          isLoggedIn: true,
          token: res.data.accessToken,
          data: res.data,
          userType: res.data.isAdmin
        }))
        // console.log('res.data.isAdmin', res.data.isAdmin)
        if (res.data.isAdmin) {
          navigate('/admin')
        } else {
          navigate('/home')
        }
      } else {
        dispatch(setisLoggedIn({
          isLoggedIn: false,
          token: null
        }))
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
      <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
        <div className='col-md-6'>
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Link to='/auth/register'>Create new account</Link> <br />
                <Link to='/auth/forgot-password'>Forgot Password</Link>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login