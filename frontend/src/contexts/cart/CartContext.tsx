import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface CartContextType {
    cartItems: CartItem[];
    totalAmount: number;
    error: string;
    addItemToCart: (productId: string) => void;
    updateItemInCart: (productId: string, quantity: number) => void;
    removeItemInCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({ 
    cartItems: [],
    totalAmount: 0,
    error: '',
    addItemToCart: () => {},
    updateItemInCart: () => {},
    removeItemInCart: () => {},
    clearCart: () => {},
});

export const useCart = () => useContext(CartContext);