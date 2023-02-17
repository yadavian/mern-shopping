import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styles from '../../../assets/css/global.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
// import { Editor } from "react-draft-wysiwyg";

const myTheme = createTheme({
    // Set up your custom MUI theme here
})


const ProductModify = () => {

    let { state: params } = useLocation();
    // console.log('params', params)

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
    console.log('formValues', formValues)
    const [allfetchedCategories, setAllfetchedCategories] = useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty());



    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('productName', formValues.productName);
        formData.append('productDescription', formValues.productDescription);
        for (let i = 0; i < formValues.productImages.length; i++) {
            formData.append('productImages', formValues.productImages[i]);
        }
        // formData.append('categories', formValues.categories);
        formValues.categories.forEach(category => formData.append('categories[]', category))
        formData.append('size', formValues.size);
        formData.append('color', formValues.color);
        formData.append('prize', formValues.prize);
        formData.append('discount', formValues.discount);
        formData.append('productStock', formValues.productStock);

        // console.log('formValues', formValues)
        // return

        if (params.productId) {
            fn_editNewProduct(formData, params.productId)
        } else {
            fn_addNewProduct(formData)
        }
    }

    useEffect(() => {
        (
            async () => {
                if (params.productId != null) {
                    console.log('params', params)
                    const resObj = await fn_getProductById(params.productId);
                    console.log('resObj', resObj)
                    setFormValues(resObj.data)
                }
                const resObj = await fn_getAllCategories();
                console.log('resObj', resObj)
                if (resObj.success) {
                    setAllfetchedCategories(resObj.data)
                } else {
                    console.log('resObj.message', resObj.message)
                }
            }
        )()
    }, [])


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


    const fn_getProductById = async (id) => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/product/${id}`,
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



    const fn_addNewProduct = async (data, id) => {
        try {
            const { data: res } = await axios.post(
                `${process.env.REACT_APP_API_URL}/product`,
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
                setFormValues(initialState)
                navigate('/admin/product')
            } else {
                alert(res.msg)
                // return { status: true, message: "Something went wrong please try again !!" };
            }
        } catch (error) {
            console.log('error', error)
            alert(error.response.data.msg)
        }
    }


    const fn_editNewProduct = async (data, id) => {
        try {
            const { data: res } = await axios.put(
                `${process.env.REACT_APP_API_URL}/product/${id}`,
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
                setFormValues(initialState)
                navigate('/admin/product')
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

            <div className='row mt-5' >
                <div className='col-md-12'>
                    <h1>Add New Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className="col-md-4">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.productName}
                                    onChange={(e) => setFormValues({ ...formValues, productName: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.productDescription}
                                    onChange={(e) => setFormValues({ ...formValues, productDescription: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Images</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple="multiple"
                                    // value={formValues.productImages}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setFormValues({ ...formValues, productImages: e.target.files })
                                    }} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Categories</label>
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.categories}
                                    onChange={(e) => setFormValues({ ...formValues, categories: e.target.value })} /> */}
                                <select
                                    className='form-control'
                                    onChange={(e) => setFormValues({ ...formValues, categories: [...formValues.categories, e.target.value] })}
                                    value={formValues.categories[0]}
                                >
                                    <option value="">Select Category</option>
                                    {allfetchedCategories?.map((d, i) => {
                                        return (
                                            <option value={d.categoryName} key={d._id}>{d.categoryName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product size</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.size}
                                    onChange={(e) => setFormValues({ ...formValues, size: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.color}
                                    onChange={(e) => setFormValues({ ...formValues, color: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Prize</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.prize}
                                    onChange={(e) => setFormValues({ ...formValues, prize: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Ratings</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.ratings}
                                    onChange={(e) => setFormValues({ ...formValues, ratings: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Discount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.discount}
                                    onChange={(e) => setFormValues({ ...formValues, discount: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Product Stock</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.productStock}
                                    onChange={(e) => setFormValues({ ...formValues, productStock: e.target.value })} />
                            </div>
                            <div className='col=md-12'>
                                <label className='form-label'>Product Description</label>

                                <div className='form-control'>
                                    <ThemeProvider theme={myTheme}>
                                        <MUIRichTextEditor
                                            // label={draftToHtml(formValues.productDescription)}
                                            label={"Start Typing..."}
                                            // defaultValue={formValues.productDescription}
                                            onChange={(editorState) => {
                                                // console.log('editorState', editorState.getCurrentContent().getPlainText());
                                                // console.log('formatted', convertToRaw(editorState.getCurrentContent()))
                                                // console.log('htmlFromat', draftToHtml(convertToRaw(editorState.getCurrentContent())))
                                                setFormValues({ ...formValues, productDescription: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
                                            }}
                                        />
                                    </ThemeProvider>
                                </div>

                            </div>


                            <div className={`${styles.fec} mt-5`}>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default ProductModify