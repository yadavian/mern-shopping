import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/home')
  }
  return (
    <div className='container'>
      <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
        <div className='col-md-6'>
          <h1>Forgot Password</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center'  }}>
              <Link to='/auth/login'>Back to login</Link>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login