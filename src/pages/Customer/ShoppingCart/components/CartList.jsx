import React from 'react'
import CartItem from './CartItem'

const CartList = (props) => {

    const cartListRender =  props.cartData.map((cartItem) => {
        return( 
                <CartItem 
                    cartItem={cartItem} 
                    key={cartItem.id} 
                    onclickRemove={props.onclickRemove} 
                    onclickIncreaseAmount={props.onclickIncreaseAmount}
                    onclickDecreaseAmount={props.onclickDecreaseAmount}
                    
                    />

        )
    })
    return (
        <div>
            {cartListRender}
        </div>
    )
}

export default CartList