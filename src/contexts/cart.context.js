import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems already contains a productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //if productToAdd is found then increment the qty and return the new array with modified cartItems/new cart item
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 }
            :
            cartItem
        )
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    return cartItems.map((cartItem =>
        cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    ))
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    CartItem: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

//1 the state

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error(`unhandled type of cart${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { cartItems, isCartOpen, cartCount, cartTotal } = state

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

        /*
        
        generate newCartTotal and newCartCount
        
        dispatch new action with payload={
            newCartItems,
            newCartTotal,
            newCartCount
        } */

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemReducer(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemReducer(newCartItems)
    }

    const setIsCartOpen=(flag)=>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,flag))
    }

    const value = {
        isCartOpen,
        setIsCartOpen: setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}