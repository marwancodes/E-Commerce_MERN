import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/auth/AuthContext";



const CartPage = () => {

    const { token } = useAuth();
    const [cart, setCart] = useState();
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
    
            const data = await response.json();
            setCart(data);
        };
        fetchCart();
    }, [token]);

    console.log({ cart });

  return (
    <Container sx={{ mt: 3 }}>
        <Typography variant="h4">
            My Cart
        </Typography>
    </Container>
  )
}

export default CartPage