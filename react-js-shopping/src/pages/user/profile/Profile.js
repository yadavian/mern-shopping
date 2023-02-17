import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>

          <div className='choose-address-section'>
            <div className='choose-address-box'>
              <h5>PROFILE</h5>
              <hr />
              <div className='container'>
                <div className='row' style={{ display: 'flex', justifyContent: 'center', margin: "0% 5% 5% 5%" }}>
                  <div className='col-md-12'>
                    <form className='row'>
                      <div className="col-12 mt-3">
                        <label className="form-label">Profile Picture</label>
                        <input type="file" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-lg-6 col-md-12 mt-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link to='/view-orders' className='btn btn-warning'>Check Your Orders</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile