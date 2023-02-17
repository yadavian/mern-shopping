import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styles from '../../../assets/css/global.module.css'
import { FaEdit, FaFolder } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import COLORS from '../../../constants/Colors';



const Product = () => {

    let initialState = {
        productName: "",
        productDescription: '',
        productImages: [],
        categories: [],
        size: '',
        color: '',
        prize: '',
        discount: '',
        productStock: '',
    }

    const navigate = useNavigate();
    const login = useSelector(state => state.login)
    const [formValues, setFormValues] = useState(initialState)
    const [allFetchedProduct, setAllFetchedProduct] = useState([])
    const [paginatedProduct, setPaginatedProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [showTable, setShowTable] = useState(true)
    const [chooseNoOfDataToShow, setChooseNoOfDataToShow] = useState(5)
    const [paginationSize, setPaginationSize] = useState(1)
    console.log('paginationSize', paginationSize)


    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('productName', formValues.productName);
        formData.append('productDescription', formValues.productDescription);
        for (let i = 0; i < formValues.productImages.length; i++) {
            formData.append('productImages', formValues.productImages[i]);
        }
        formData.append('categories', formValues.categories);
        formData.append('size', formValues.size);
        formData.append('color', formValues.color);
        formData.append('prize', formValues.prize);
        formData.append('discount', formValues.discount);
        formData.append('productStock', formValues.productStock);

        try {
            const { data: res } = await axios.post(
                `${process.env.REACT_APP_API_URL}/product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                alert(res.msg)
                // setFormValues(initialState)
            } else {
                alert(res.msg)
            }
        } catch (error) {
            alert(error.response.data.msg)
        }
    }


    useEffect(() => {
        (
            async () => {
                await fn_getProducts()
                const res = await fn_getCategorySelectionList();
                console.log('res', res)
            }
        )()
    }, [])

    useEffect(() => {
        fn_getProductFromPagination(allFetchedProduct)
    }, [showTable, chooseNoOfDataToShow, currentPage])

    const fn_getProductFromPagination = async (data) => {
        setPaginationSize(Math.ceil(allFetchedProduct.length / chooseNoOfDataToShow))
        const chunkOfData = await fn_sliceIntoChunks(data, chooseNoOfDataToShow)
        setPaginatedProduct(chunkOfData)
    }

    const fn_sliceIntoChunks = (arr, chunkSize) => {
        const res = [];
        // for (let i = 0; i < arr.length; i = i + chunkSize) {
        //     const chunk = arr.slice(i, i + chunkSize);
        //     res.push(chunk);
        // }
        // return res;
        let nxtpgeStart = currentPage * chunkSize - chunkSize
        let nxtpgeEnd = parseInt(nxtpgeStart) + parseInt(chunkSize)
        for (let i = nxtpgeStart; i < nxtpgeEnd; i++) {
            res.push(arr[i]);
        }
        console.log('res', res)
        const data = res.filter(Boolean);
        console.log('data', data)
        return data;
    }

    const fn_getCategorySelectionList = async () => {
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
            console.log('res', res)
            if (res.success) {
                return { success: false, message: res.msg, data: res.data };
            } else {
                return { success: false, message: res.msg };
            }
        } catch (error) {
            return { success: false, message: error.response.data.msg };
        }
    }

    const fn_getProducts = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/product`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                setAllFetchedProduct(res.data)
                fn_getProductFromPagination(res.data)
            } else {
                alert(res.msg)
            }
        } catch (error) {
            alert(error.response.data.msg)
        }
    }


    const fn_deleteProductById = async (id) => {
        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/product/${id}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                // alert("Category Deleted OF ID : " + id);
                const resObj = await fn_getProducts();
                if (resObj.success) {
                    setAllFetchedProduct(resObj.data)
                    fn_getProductFromPagination(resObj.data)
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
                        onClick={() => navigate('/admin/product-modify', {
                            state: { userId: null }
                        })}
                    > ADD PRODUCT
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row  mt-5'>
                        <div className={styles.fec}>
                            <button type="button" className="btn btn-warning header-kotak">FILTER</button>
                        </div>
                    </div>
                    <table className="table table-bordered mt-1">
                        <thead className='header-kotak'>
                            <tr>
                                {/* <th>Sr no.</th> */}
                                <th>Images</th>
                                <th onClick={() => {
                                    const sortedData = allFetchedProduct.sort((a, b) => a.productName.localeCompare(b.productName))
                                    fn_getProductFromPagination(sortedData)
                                }
                                }>Name</th>
                                <th>Categories</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Prize</th>
                                <th>Ratings</th>
                                <th>Discount</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProduct?.map((d, i) => {
                                return (
                                    <tr key={d._id}>
                                        {/* <th scope="row">{i + 1}</th> */}
                                        <td>
                                            <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${d.productImages[0]}`} style={{ width: '60px', height: '60px', alignSelf: 'center' }} alt='product' />
                                        </td>
                                        <td>{d.productName}</td>
                                        <td>{d.categories.map((d, i) => { return <li key={i}>{d}</li> })}</td>
                                        <td>{d.size}</td>
                                        <td>{d.color}</td>
                                        <td>{d.prize}</td>
                                        <td>{d.ratings}</td>
                                        <td>{d.discount}</td>
                                        <td>{d.productStock}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button"
                                                    className='btn'
                                                    style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}
                                                    onClick={() => fn_deleteProductById(d._id)}
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                                <button type="button"
                                                    className="btn "
                                                    style={{ backgroundColor: COLORS.SECONDARY, color: 'white' }}
                                                    onClick={() => {
                                                        navigate('/admin/product-modify', {
                                                            state: { productId: d._id }
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
                    <div className={styles.fbc}>
                        <select className='form-control-sm' onChange={(e) => setChooseNoOfDataToShow(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger" disabled={currentPage <= 1} onClick={() => currentPage != 1 && setCurrentPage(currentPage - 1)}>Previous</button>
                            <button type="button" className="btn btn-primary">{currentPage}</button>
                            <button type="button" className="btn" style={{ backgroundColor: COLORS.SECONDARY, color: 'white' }} disabled={currentPage >= paginationSize} onClick={() => paginationSize > currentPage && setCurrentPage(currentPage + 1)}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product