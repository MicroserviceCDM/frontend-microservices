import React from 'react'

const FooterCart = (props) => {

    const handleClearCart = () => {
        props.onclickClearCart();
    }

    return (
        <footer>
            <hr />
            <div className="cart-total">
                <h4>
                    total <span className='text-[18px] text-[#fc6603]'>{props.totalPrice}$</span>
                </h4>
            </div>

            <div className='footer-cart-btn'>
                <button className="cart-btn clear-cart-btn" onClick={handleClearCart}>
                    Clear cart
                </button>
                <button className="cart-btn checkout-cart-btn" onClick={() => {alert("Navigate to checkout page!")}}>
                    Check out 
                </button>
            </div>
            
        </footer>
    )
}

export default FooterCart