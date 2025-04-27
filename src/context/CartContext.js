import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {

    // Initialize cart state from localStorage if needed, or as an empty array
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Helper function to persist cart in localStorage (optional)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Check if product already exists in cart
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Increase quantity if it exists
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add product with quantity 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }

    // Update quantity of a product in the cart
    const updateCartItemQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    }
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};