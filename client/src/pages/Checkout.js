import React from 'react'
import { useLocation } from 'react-router-dom';

const Checkout = () => {

    const { state } = useLocation();
    console.log(state);
    return (
        <div>Checkout</div>
    )
}

export default Checkout