import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/css/global.module.css'
import { FaEdit, FaFolder } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import COLORS from '../../../constants/Colors';

const User = () => {
    const navigate = useNavigate();
    const login = useSelector(state => state.login)

    const [allFethcedUsers, setAllFethcedUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationSize, setPaginationSize] = useState(0)
    const [chooseNoOfDataToShow, setChooseNoOfDataToShow] = useState(5)

    useEffect(() => {
        (async () => {
            const responseObj = await fn_getAllUsers();
            if (responseObj.success) {
                setAllFethcedUsers(responseObj.data)
            } else {
                console.log('data.message', responseObj.message)
            }
        })();
    }, [])

    const fn_getAllUsers = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/user`,
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

    const fn_deleteUserById = async (id) => {
        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/user/${id}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                // alert("Category Deleted OF ID : " + id);
                const resObj = await fn_getAllUsers();
                if (resObj.success) {
                    setAllFethcedUsers(resObj.data)
                } else {
                    console.log('resObj.message', resObj.message)
                }
            } else {
                alert(res.msg)
            }
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row mt-5'>
                        <div className={styles.fec}>
                            <button
                                type="button"
                                className="btn header-kotak"
                                onClick={() => navigate('/admin/user-modify', {
                                    state: { userId: null }
                                })}
                            >
                                ADD USER</button>
                        </div>
                    </div>
                    <div className='row  mt-5'>
                        <div className={styles.fec}>
                            <button type="button" className="btn btn-warning">FILTER</button>
                        </div>
                    </div>
                    <table className="table table-bordered mt-1">
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Profile Image</th>
                                <th>User Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFethcedUsers?.map((d, i) => {
                                return (
                                    <tr key={d._id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{d.name}</td>
                                        <td>{d.email}</td>
                                        <td>{d.phoneNumber}</td>
                                        <td>
                                            <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${d.profileImage}`} style={{ width: '60px', height: '60px', alignSelf: 'center' }} alt='product' />
                                        </td>
                                        <td>{d.isAdmin ? "Admin" : "User"}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => fn_deleteUserById(d._id)}
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn "
                                                    style={{ backgroundColor: COLORS.SECONDARY, color: 'white' }}
                                                    onClick={() => navigate(`/admin/user-modify`, {
                                                        state: { userId: d._id }
                                                    })}
                                                // onClick={() => navigate(`/admin/user-modify/${d._id}`)}
                                                >
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={styles.fbc}>
                        <select className='form-control-sm' onChange={(e) => setChooseNoOfDataToShow(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-danger"
                                disabled={currentPage <= 1}
                                onClick={() => currentPage != 1 && setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary">{currentPage}</button>
                            <button
                                type="button"
                                className="btn"
                                style={{ backgroundColor: COLORS.SECONDARY, color: 'white' }}
                                disabled={currentPage >= paginationSize}
                                onClick={() => paginationSize > currentPage && setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default User