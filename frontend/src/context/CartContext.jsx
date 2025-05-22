import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    const addToCart = (item) => {
        setCart((prevCart) => ({
            ...prevCart,
            [item.name]: {
                ...item,
                quantity: (prevCart[item.name]?.quantity || 0) + 1,
            },
        }));
    };

    const removeFromCart = (itemName) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart[itemName]?.quantity > 1) {
                updatedCart[itemName].quantity -= 1;
            } else {
                delete updatedCart[itemName];
            }
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart({});
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
