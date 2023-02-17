import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaFolder } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';
import Colors from '../../../constants/Colors';
import styles from '../../../assets/css/global.module.css'
import { IconContext } from "react-icons";
import COLORS from '../../../constants/Colors';
import { color } from '@mui/system';

const Category = () => {

    const navigate = useNavigate();
    const login = useSelector(state => state.login)
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [chooseNoOfDataToShow, setChooseNoOfDataToShow] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationSize, setPaginationSize] = useState(1)
    const [paginatedCategory, setPaginatedCategory] = useState([])

    useEffect(() => {
        (
            async () => {
                const resObj = await fn_getAllCategories();
                if (resObj.success) {
                    setFetchedCategories(resObj.data)
                    fn_getCategoryForPagination(resObj.data)
                } else {
                    console.log('resObj.message', resObj.message)
                }
            }
        )()
    }, [])


    useEffect(() => {
        fn_getCategoryForPagination(fetchedCategories)
        console.log(`### currentPage => ${currentPage} => paginationSize => ${paginationSize} `)
        if (currentPage > paginationSize) {
            setCurrentPage(paginationSize)
        }
        if (currentPage < 1) {
            setCurrentPage(1)
        }
    }, [chooseNoOfDataToShow, currentPage, paginationSize])

    const fn_getCategoryForPagination = async (data) => {
        const res = await fn_sliceIntoChunks(data, chooseNoOfDataToShow);
        setPaginatedCategory(res)
        setPaginationSize(Math.ceil(fetchedCategories.length / chooseNoOfDataToShow))
    }

    const fn_sliceIntoChunks = (arr, chunkSize) => {
        let res = [];
        // for (let i = 0; i < arr.length; i = i + chunkSize) {
        //     const chunk = arr.slice(i, i + chunkSize);
        //     r
        let nxtpgeStart = currentPage * chunkSize - chunkSize
        let nxtpgeEnd = parseInt(nxtpgeStart) + parseInt(chunkSize)
        for (let i = nxtpgeStart; i < nxtpgeEnd; i++) {
            res.push(arr[i]);
        }
        const data = res.filter(Boolean);
        return data;
    }


    const fn_getAllCategories = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/category`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );

            if (res.success) {
                return { success: true, message: res.msg, data: res.data }
            } else {
                return { success: false, message: res.msg }
            }
        } catch (error) {
            alert(error.response.data.msg)
            console.log('error', error)
            return { success: false, message: error.response.data.msg };
        }
    }

    const fn_deleteCategoryById = async (id) => {
        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/category/${id}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                // alert("Category Deleted OF ID : " + id);
                const resObj = await fn_getAllCategories();
                if (resObj.success) {
                    setFetchedCategories(resObj.data)
                    fn_getCategoryForPagination(resObj.data)
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
            <div className='row mt-5'>
                <div className={styles.fec}>
                    <button
                        type="button"
                        className="btn btn-success header-kotak"
                        onClick={() => navigate('/admin/category-modify', {
                            state: { userId: null }
                        })}
                    >
                        ADD CATEGORY</button>
                </div>
            </div>
            <div className='row mt-3'>
                <table className='table table-bordered'>
                    <thead className='header-kotak'>
                        <tr>
                            <th
                                onClick={() => {
                                    const sortedData = fetchedCategories.sort((a, b) => a.categoryName.localeCompare(b.categoryName))
                                    fn_getCategoryForPagination(sortedData)
                                }}
                            >Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCategory.length != 0 && typeof paginatedCategory[0] != "undefined" && paginatedCategory.map((d, i) => {
                            return (
                                <tr key={d.i}>
                                    <td>{d.categoryName}</td>
                                    <td style={{ maxWidth: "3rem" }}>
                                        <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${d.categoryImage}`} style={{ width: '60px', height: '60px', alignSelf: 'center' }} alt='product' />
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button"
                                                className='btn'
                                                style={{ backgroundColor: Colors.PRIMARY, color: 'white' }}
                                                onClick={() => fn_deleteCategoryById(d._id)}
                                            >
                                                <MdDeleteForever />
                                            </button>
                                            <button type="button"
                                                className="btn "
                                                style={{ backgroundColor: Colors.SECONDARY, color: 'white' }}
                                                onClick={() => {
                                                    navigate('/admin/category-modify', {
                                                        state: { categoryId: d._id }
                                                    })
                                                }}
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
            </div>


            <div className={styles.fbc}>
                <div className={'d-flex'}>
                    Rows Per Page : <select className='form-control-sm' onChange={(e) => setChooseNoOfDataToShow(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div className={styles.fc}>
                    <p className='mx-5'>Showing 1- 5 of {fetchedCategories.length} </p>
                    <div className="btn-group" role="group" aria-label="Basic example">

                        <button type="button"
                            className="btn btn-danger"
                            disabled={currentPage <= 1}
                            onClick={() => currentPage != 1 && setCurrentPage(currentPage - 1)}
                        >
                            <IconContext.Provider value={{ color: "white" }}>
                                <IoIosArrowBack />
                            </IconContext.Provider>
                            Previous
                        </button>

                        <button
                            type="button"
                            className="btn "
                            style={{ backgroundColor: Colors.REDISH_BLUE, color: "white", fontWeight: "bold" }}>
                            {currentPage} of {paginationSize}
                        </button>
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.SECONDARY, color: "white" }}
                            disabled={currentPage >= paginationSize} onClick={() => paginationSize > currentPage && setCurrentPage(currentPage + 1)}
                        >
                            Next
                            <IconContext.Provider value={{ color: "white" }}><IoIosArrowForward /></IconContext.Provider>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category