import React, { createContext, useState, useContext } from 'react';

// CartContext, uygulamanın herhangi bir yerinden sepete erişmek için kullanılır.
const CartContext = createContext();

// CartProvider, uygulamanın etrafını saran ve sepetle ilgili fonksiyonları sağlayan bileşendir.
export const CartProvider = ({ children }) => {
    // Sepet verisini tutan state. Her ürün adı bir anahtar, değeri ise ürün bilgisi ve miktarıdır.
    const [cart, setCart] = useState({});

    // Sepete ürün ekler. Eğer ürün zaten varsa miktarını artırır.
    const addToCart = (item) => {
        setCart((prevCart) => ({
            ...prevCart,
            [item.name]: {
                ...item,
                quantity: (prevCart[item.name]?.quantity || 0) + 1,
            },
        }));
    };

    // Sepetten ürün çıkarır. Miktar 1'den fazlaysa azaltır, 1 ise ürünü tamamen siler.
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

    // Sepeti tamamen temizler.
    const clearCart = () => {
        setCart({});
    };

    // Sepetteki toplam ürün adedini döndürür.
    const getCartCount = () => {
        // Her ürünün miktarını toplayarak toplamı bulur.
        return Object.values(cart).reduce((total, item) => total + (item.quantity || 0), 0);
    };

    // Sağlanan fonksiyonlar ve cart state'i context ile tüm uygulamaya sunulur.
    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            getCartCount // Sepetteki toplam ürün adedini sağlayan fonksiyon
        }}>
            {children}
        </CartContext.Provider>
    );
};

// useCart, context'i kolayca kullanmak için özel bir hook'tur.
export const useCart = () => useContext(CartContext);