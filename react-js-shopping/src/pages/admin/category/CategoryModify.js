import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styles from '../../../assets/css/global.module.css'

const CategoryModify = () => {

    const navigate = useNavigate();
    let { state: params } = useLocation();
    const login = useSelector(state => state.login)

    let initialCategoryState = {
        categoryName: "",
        categoryImage: ''
    }
    const [formValues, setFormValues] = useState(initialCategoryState)

    useEffect(() => {
        (
            async () => {
                if (params.categoryId) {
                    const resp = await fn_getCategoryById(params.categoryId);
                    if (resp.success) {
                        console.log('resp', resp.data)
                        const data = {
                            categoryName: resp.data.categoryName,
                            categoryImage: resp.data.categoryImage,
                        }
                        setFormValues(data)
                    } else {
                        console.log('resp.message', resp.message)
                    }
                }
            }
        )()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();    //formdata object
        formData.append('categoryName', formValues.categoryName);
        formData.append('categoryImage', formValues.categoryImage);
        console.log('formData', formData)

        if (params.categoryId) {
            fn_editCategory(formData, params.categoryId)
        } else {
            fn_addNewCategory(formData)
        }
    }

    const fn_getCategoryById = async (id) => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/category/${id}`,
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

        }
    }

    const fn_addNewCategory = async (data) => {
        try {
            const { data: res } = await axios.post(
                `${process.env.REACT_APP_API_URL}/category`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );

            console.log('res', res)

            if (res.success) {
                // alert(res.msg)
                setFormValues(initialCategoryState)
                navigate('/admin/category')
            } else {
                alert(res.msg)
                // return { status: true, message: "Something went wrong please try again !!" };
            }
        } catch (error) {
            console.log('error', error)
            alert(error.response.data.msg)
        }
    }

    const fn_editCategory = async (data, id) => {
        try {
            const { data: res } = await axios.put(
                `${process.env.REACT_APP_API_URL}/category/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );

            console.log('res', res)

            if (res.success) {
                alert(res.msg)
                setFormValues(initialCategoryState)
                navigate('/admin/category')
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
                    <h1>Add New Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formValues.categoryName}
                                onChange={(e) => setFormValues({ ...formValues, categoryName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profile Picture</label>
                            <input
                                type="file"
                                className="form-control"
                                // value={formValues.profilePicture}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormValues({ ...formValues, categoryImage: e.target.files[0] })
                                }} />
                        </div>
                        <div className={styles.fec}>
                            {/* <Link to='/auth/login'>Back to Login</Link> */}
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryModify