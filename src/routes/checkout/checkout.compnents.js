import './checkout.styles.scss'
import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../component/checkout-item/checkout-item.component'

const Checkout = () => {

    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <div className='checkout-container' >
            <div className='checkout-header' >
                <div className='header-section'>
                    <span>Product</span>
                </div>
                <div className='header-section'>
                    <span>Description</span>
                </div>
                <div className='header-section'>
                    <span>Quantity</span>
                </div>
                <div className='header-section'>
                    <span>Price</span>
                </div>
                <div className='header-section'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='total' >Total:&#8377;{cartTotal}</span>
        </div >
    )
}

export default Checkout