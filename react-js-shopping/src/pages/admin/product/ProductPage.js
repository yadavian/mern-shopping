import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaFolder } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BiLastPage, BiFirstPage } from 'react-icons/bi';
import Colors from '../../../constants/Colors';
import styles from '../../../assets/css/global.module.css'
import { IconContext } from "react-icons";
import COLORS from '../../../constants/Colors';
import { color } from '@mui/system';

const ProductPage = () => {

    const navigate = useNavigate();
    const login = useSelector(state => state.login)

    const [allProducts, setAllProducts] = useState([])
    const [chooseNoOfRowsToShow, setChooseNoOfRowsToShow] = useState(2);
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedData, setPaginatedData] = useState([])
    console.log('chooseNoOfRowsToShow', chooseNoOfRowsToShow)
    console.log('totalPages', totalPages)
    console.log('paginatedData', paginatedData)

    useEffect(() => {
        (
            async () => {
                const res = await fn_getProductData();
                setAllProducts(res.data)
                setTotalPages(Math.ceil(res.data.length / chooseNoOfRowsToShow));
                fn_getPaginatedData(res.data, chooseNoOfRowsToShow)
            }
        )();
    }, [])


    const fn_getProductData = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/product`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            console.log('res', res)
            return res;
        } catch (error) {
            console.log('error', error.response)
            return error.response.data.msg;
        }
    }

    const fn_deleteProductById = async (ProductId) => {
        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/Product/${ProductId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            return res
        } catch (error) {
            return error.response.data.msg
        }
    }

    useEffect(() => {
        setTotalPages(Math.ceil(allProducts.length / chooseNoOfRowsToShow))
        fn_getPaginatedData(allProducts, chooseNoOfRowsToShow)
    }, [chooseNoOfRowsToShow, currentPage, allProducts])



    const fn_getPaginatedData = async (data, rowSize) => {
        const paginatedData = await fn_sliceIntoSinglePages(data, rowSize);
        setPaginatedData(paginatedData)
    }

    const fn_sliceIntoSinglePages = (arr, rowSize) => {
        console.log(arr, rowSize);
        const res = [];
        let nextPageStart = currentPage * rowSize - rowSize
        let nextPageEnd = parseInt(nextPageStart) + parseInt(rowSize)
        for (let i = nextPageStart; i < nextPageEnd; i++) {
            res.push(arr[i]);
        }
        const data = res.filter(Boolean);
        return data;
    }




    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className={styles.fec}>
                    <button
                        type="button"
                        className="btn btn-success header-kotak"
                        onClick={() => navigate('/admin/product-modify', {
                            state: { productId: null }
                        })}
                    > ADD PRODUCT
                    </button>
                </div>
            </div>
            <div className='row mt-3'>
                <table className='table table-bordered'>
                    <thead className='header-kotak'>
                        <tr>
                            <th>Product</th>
                            <th>Categories</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody className=''>
                        {
                            paginatedData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.categories.map((d, i) => { return (<h6>{d}</h6>) })}</td>
                                        <td style={{ maxWidth: "3rem" }}>
                                            <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${item.productImages[0]}`} style={{ width: '60px', height: '60px', alignSelf: 'center' }} alt='product' />
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button"
                                                    className='btn'
                                                    style={{ backgroundColor: Colors.PRIMARY, color: 'white' }}
                                                    onClick={async () => {
                                                        const res = await fn_deleteProductById(item._id);
                                                        if (res.success) {
                                                            const resProduct = await fn_getProductData();
                                                            console.log('resProduct', resProduct)
                                                            setAllProducts(resProduct.data)
                                                        } else {
                                                            console.log('res', res)
                                                        }
                                                    }}
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                                <button type="button"
                                                    className="btn "
                                                    style={{ backgroundColor: Colors.SECONDARY, color: 'white' }}
                                                    onClick={() => {
                                                        navigate('/admin/Product-modify', {
                                                            state: { productId: item._id }
                                                        })
                                                    }}
                                                >
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className={styles.fbc}>
                <div className={'d-flex'}>
                    Rows Per Page : <select className='form-control-sm' onChange={(e) => setChooseNoOfRowsToShow(e.target.value)}>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div className={styles.fc}>
                    <p className='mx-5'>Showing {chooseNoOfRowsToShow * currentPage + 1 - chooseNoOfRowsToShow} - {currentPage * chooseNoOfRowsToShow} of {allProducts?.length}  entries  </p>
                    <div className="btn-group" role="group" aria-label="Basic example">

                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.PRIMARY, color: "white" }}
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage(1)}
                        >
                            <IconContext.Provider value={{ color: "white" }}>
                                <BiFirstPage />
                            </IconContext.Provider>

                        </button>

                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.PRIMARY, color: "white" }}
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <IconContext.Provider value={{ color: "white" }}>
                                <IoIosArrowBack />
                            </IconContext.Provider>
                            {/* Previous */}
                        </button>

                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.REDISH_BLUE, color: "white", fontWeight: "bold" }}
                        >
                            {currentPage} of {totalPages} Pages
                        </button>


                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.SECONDARY, color: "white" }}
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            {/* Next */}
                            <IconContext.Provider value={{ color: "white" }}><IoIosArrowForward /></IconContext.Provider>
                        </button>

                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: Colors.SECONDARY, color: "white" }}
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            {/* Last */}
                            <IconContext.Provider value={{ color: "white" }}><BiLastPage /></IconContext.Provider>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductPage