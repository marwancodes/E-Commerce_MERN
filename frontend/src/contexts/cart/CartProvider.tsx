import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from '../../types/CartItem';
import { useAuth } from '../auth/AuthContext';


const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const { token } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCart = async () => {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                setError('failed to fetch user cart. Please try again!')
            }
    
            const cart = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: {product: any; quantity: number; unitPrice: number}) => ({ // we map the data to make it the same as the CartItem type if it is not the same to change name or type
                /* cart.items.map((i) => { productId: i.product._id, ... })  This is another way*/
                productId: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice,
            }));

            setCartItems(cartItemsMapped);
            setTotalAmount(cart.totalAmount);
        };
        fetchCart();
    }, [token]);

    const addItemToCart = async (productId: string) => {
        try {
            // console.log("This is URL: ",import.meta.env.VITE_REACT_APP_BACKEND_BASEURL);
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                setError('Failed to add to cart')
            }

            const cart = await response.json();

            if (!cart) {
                setError('Failed to parse cart data');
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped = cart.items.map(({ product, quantity }: {product: any; quantity: number;}) => ({ // we map the data to make it the same as the CartItem type if it is not the same to change name or type
                /* cart.items.map((i) => { productId: i.product._id, ... })  This is another way*/
                productId: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice: product.unitPrice
            }));

            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <CartContext.Provider
            value={{ cartItems, totalAmount, addItemToCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;