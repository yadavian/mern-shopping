import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../../../assets/css/global.module.css'

const UserModify = () => {

  let { state: params } = useLocation();
  const login = useSelector(state => state.login)

  let initialState = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    isAdmin: 'false',
    profileImage: ""
  }

  const [fetchedUser, setFetchedUser] = useState(initialState)

  useEffect(() => {
    (
      async () => {
        if (params.userId) {
          const responseObj = await fn_getUserById(params.userId);
          if (responseObj.success) {
            setFetchedUser(responseObj.data)
          } else {
            console.log('data.message', responseObj.message)
          }
        }
      }
    )();
  }, [])

  const fn_getUserById = async (id) => {
    try {
      const { data: res } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${login.token}`
          }
        }
      );
      if (res.success) {
        return { success: true, message: res.msg, data: res.data };
      } else {
        return { success: false, message: res.msg };
      }
    } catch (error) {
      alert(error.response.data.msg)
      console.log('error', error)
      return { success: false, message: error.response.data.msg };
    }
  }

  const fn_editUser = async (data, userId) => {
    try {
      console.log('data', data)

      let formData = new FormData();
      formData.append("name", data.name)
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${login.token}`
          }
        }
      );
      console.log('res', res)
      if (res.success) {
        return { success: true, message: res.msg, data: res.data };
      } else {
        return { success: false, message: res.msg };
      }
    } catch (error) {
      alert(error.response.data.msg)
      console.log('error', error)
      return { success: false, message: error.response.data.msg };
    }
  }


  const fn_addUser = async (e) => {

    let formData = new FormData();    //formdata object

    formData.append('name', fetchedUser.name);
    formData.append('phoneNumber', fetchedUser.phoneNumber);
    formData.append('email', fetchedUser.email);
    formData.append('password', fetchedUser.password);
    formData.append('profilePicture', fetchedUser.profileImage);

    console.log('formData', formData)

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
        setFetchedUser(initialState)
        alert(res.msg)
        // navigate('/auth/send-otp')
      } else {
        alert(res.msg)
        // return { status: true, message: "Something went wrong please try again !!" };
      }
    } catch (error) {
      console.log('error', error)
      alert(error.response.data.msg)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('params.userId', params.userId)
    if (params.userId != null) {
      console.log('fetchedUser', fetchedUser)
      const resObj = fn_editUser(fetchedUser, params.userId);
      resObj.then(res => console.log('res', res))
    } else {
      console.log('fetchedUser', fetchedUser)
      const resObj = fn_addUser(fetchedUser);
      resObj.then(res => console.log('res', res))
    }
  }
  return (
    <div className='container'>
      <div className='row mt-5' >
        <div className='col-md-12'>
          <h1>Add New User</h1>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fetchedUser.name}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, name: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={fetchedUser.email}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, email: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={fetchedUser.phoneNumber}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, phoneNumber: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Product Images</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    e.preventDefault();
                    setFetchedUser({ ...fetchedUser, profileImage: e.target.files[0] })
                  }} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={fetchedUser.password}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, password: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">User Type</label>
                <select className='form-control'>
                  <option value='Admin' >Admin</option>
                  <option value='User'>User</option>
                </select>
              </div>

              <div className={`${styles.fec} mt-3`}>
                <button type="submit" className="btn btn-primary">{params.userId ? "Update" : "Add"} User</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserModify