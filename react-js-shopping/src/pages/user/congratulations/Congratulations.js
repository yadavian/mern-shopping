import React from 'react'
import { Link } from 'react-router-dom'

const Congratulations = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>

                    <div className='choose-address-section'>
                        <h3 style={{ color: "#c45500" }}>Payment Status</h3>
                        <div className='choose-address-box'>
                            <h5>Payment Modes</h5>
                            <hr />
                            <h1 style={{ textAlign: 'center', margin: "5rem" }}>Congratulations</h1>
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

export default Congratulations