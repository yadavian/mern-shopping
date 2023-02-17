import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCartProductAddress } from '../../../redux/slices/cartSlice'
import { setCartSingleProductAddress } from '../../../redux/slices/singleCartSlice'
import './ChooseAddress.css'

const ChooseAddress = () => {
    const cart = useSelector(state => state.cart)
    const home = useSelector(state => state.home)
    const login = useSelector(state => state.login)
    const [isAddAddressActive, setisAddAddressActive] = useState({ isActive: false, addressId: null })
    const [fetchedAddress, setFetchedAddress] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const [formValues, setFormValues] = useState({
        building_room_no: "",
        area_building_name: "PREM VISHNU APARTMENT",
        town: "MULUND",
        city: "MUMBAI",
        state: "MAHARASHTRA",
        country: "INDIA",
        pincode: "400081",
        userId: login.data._id
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handle_addNewAddress = (e) => {
        e.preventDefault()
        if (home.isCartSelected) {
            // const updatedProduct = { ...cart, address: formValues };
            fn_addAddress();
            // dispatch(setCartProductAddress(formValues))
        } else {
            fn_addAddress()
            // dispatch(setCartSingleProductAddress(formValues))
        }
        setisAddAddressActive({ ...isAddAddressActive, isActive: false });
        // navigate('/choose-payment-mode')
    }


    const handle_useThisAddress = () => {
        const jsonSelectedAddress = JSON.parse(selectedAddress)
        if (Object.keys(jsonSelectedAddress).length > 0) {
            setisAddAddressActive({ ...isAddAddressActive, sActive: false })
            if (home.isCartSelected) {
                // fn_addAddress();
                dispatch(setCartProductAddress(jsonSelectedAddress))
            } else {
                // fn_addAddress()
                dispatch(setCartSingleProductAddress(jsonSelectedAddress))
            }
            navigate('/choose-payment-mode')
        } else {
            alert("Please select")
        }
    }

    useEffect(() => {
        fn_getAddressByUserId()
    }, [isAddAddressActive])

    const fn_getAddressByUserId = async () => {
        try {

            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/address/${login.data._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.token}`
                    }
                },
            );
            if (res.success) {
                setFetchedAddress(res.data)
            } else {
                alert(res.msg)
            }
        } catch (error) {
            console.log('error', error)
            alert(error.response.data.msg)
        }
    }

    const fn_addAddress = async () => {

        let url = isAddAddressActive.addressId ? `${process.env.REACT_APP_API_URL}/address/${selectedAddress._id}` : `${process.env.REACT_APP_API_URL}/address`;
        let method = isAddAddressActive.addressId ? "put" : "post";

        try {
            const { data: res } = await axios({
                method: method,
                url: url,
                data: {
                    roomNo: formValues.building_room_no,
                    buildingName: formValues.area_building_name,
                    town: formValues.town,
                    city: formValues.city,
                    pincode: formValues.pincode,
                    state: formValues.state,
                    country: formValues.country,
                    userId: login.data._id
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${login.token}`
                }
            });


            if (res.success) {
                setFetchedAddress(res.data)
                setisAddAddressActive({ ...isAddAddressActive, isActive: false })

            } else {
                alert(res.msg)
            }
        } catch (error) {
            console.log('error', error)
            alert(error.response.data.msg)
        }
    }

    console.log('isAddAddressActive', isAddAddressActive)
    console.log('selectedAddress', selectedAddress)
    console.log('formValues', formValues)

    useEffect(() => {
        if (isAddAddressActive.addressId) {
            setFormValues({
                building_room_no: selectedAddress.roomNo,
                area_building_name: selectedAddress.buildingName,
                town: selectedAddress.town,
                city: selectedAddress.city,
                state: selectedAddress.state,
                country: selectedAddress.country,
                pincode: selectedAddress.pincode,
                userId: login.data._id
            })
        } else {
            setFormValues({
                building_room_no: Math.ceil(Math.random() * 100),
                area_building_name: "PREM " + Math.ceil(Math.random() * 1000),
                town: "MULUND",
                city: "MUMBAI",
                state: "MAHARASHTRA",
                country: "INDIA",
                pincode: "40" + Math.ceil(Math.random() * 10000),
                userId: login.data._id
            })
        }

    }, [isAddAddressActive.addressId])

    const fn_deleteAddress = async (id) => {

        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/address/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.token}`
                    }
                },
            );
            if (res.success) {
                fn_getAddressByUserId()
            } else {
                alert(res.msg)
            }
        } catch (error) {
            console.log('error', error)
            alert(error.response.data.msg)
        }
    }



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='choose-address-section'>
                        <div className='d-flex my-3' style={{ justifyContent: "space-between" }}>
                            <h3 style={{ color: "#c45500" }}>Select Delivery Address</h3>
                            {isAddAddressActive.isActive == false ?
                                <button className='btn btn-success mx-3' onClick={() => setisAddAddressActive({ ...isAddAddressActive, isActive: true, addressId: null })}>Add New Address</button>
                                :
                                <button className='btn btn-success mx-3' onClick={() => setisAddAddressActive({ ...isAddAddressActive, isActive: false })}>Back</button>
                            }
                        </div>
                        <div className='choose-address-box'>
                            <h5>Your Addresses</h5>

                            <hr />


                            {
                                isAddAddressActive.isActive == true ?
                                    <>
                                        <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
                                            <form onSubmit={handle_addNewAddress}>
                                                <div className='row'>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Building/Room no.</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.building_room_no}
                                                            onChange={e => setFormValues({ ...formValues, building_room_no: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Area/Building Name</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.area_building_name}
                                                            onChange={e => setFormValues({ ...formValues, area_building_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Town </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.town}
                                                            onChange={e => setFormValues({ ...formValues, town: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Pincode </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.pincode}
                                                            onChange={e => setFormValues({ ...formValues, pincode: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">City </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.city}
                                                            onChange={e => setFormValues({ ...formValues, city: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">State </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.state}
                                                            onChange={e => setFormValues({ ...formValues, state: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Country</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={formValues.country}
                                                            onChange={e => setFormValues({ ...formValues, country: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className='my-3' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <button type="submit" className="btn btn-warning">{isAddAddressActive.addressId ? "Edit" : "Add"} Address</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </> :
                                    <>
                                        {Array.isArray(fetchedAddress) && fetchedAddress.map((d, i) => {
                                            return (
                                                <div className="form-check address-item-box" style={{ backgroundColor: "#fcf5ee", margin: "2rem  0rem" }}>
                                                    <input type="radio" name="address" value={JSON.stringify(d)} className="form-check-input" onChange={(e) => {
                                                        setSelectedAddress(e.target.value)
                                                    }} />
                                                    <label className="form-check-label">
                                                        <strong>{login.data.name}, </strong>
                                                        {d.roomNo}, {d.buildingName}, {d.town}, {d.city}, {d.state}, {d.pincode}, {d.country}, Phone number: {login.data.phoneNumber}
                                                    </label>
                                                    <label>
                                                        <Link
                                                            onClick={() => {
                                                                setSelectedAddress(d)
                                                                setisAddAddressActive({ ...isAddAddressActive, isActive: true, addressId: d._id })
                                                            }}
                                                            style={{ color: '#007185'}}>
                                                            Edit address
                                                        </Link>
                                                        | <Link
                                                            onClick={() => { fn_deleteAddress(d._id) }}
                                                            style={{ color: 'red' }}>Delete</Link>
                                                        | <Link style={{ color: 'green' }}>Add delivery instructions</Link>
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </>
                            }

                            {isAddAddressActive.isActive == false &&
                                <div style={{ textAlign: 'center' }}>
                                    <button className='btn btn-warning' onClick={() => handle_useThisAddress()}>Use this address</button>
                                </div>

                            }
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ChooseAddress