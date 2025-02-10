import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface CartContextType {
    cartItem: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({ 
    cartItem: [],
    totalAmount: 0,
    addItemToCart: () => {}
});

export const useCart = () => useContext(CartContext);