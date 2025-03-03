import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useCart } from "../contexts/cart/CartContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";



const CheckoutPage = () => {

    const { token } = useAuth();
    const { cartItems, totalAmount} = useCart();
    const addressRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const handleConfirmOrder = async () => {
        const address = addressRef.current?.value;
        if (!address) {
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/cart/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                address,
            }),
        });

        if (!response.ok) {
            console.error('Failed to checkout');
            return;
        }

        navigate('/order-success');
    }


    const renderCartItems = () => (
        <Box display="flex" flexDirection="column" gap={2} sx={{ border: 1, borderColor: '#DDDDDD', borderRadius: 5, padding: 2,  mt: 1 }}>
                {cartItems.map((item) => (
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width="100%" >
                        <Box display='flex' flexDirection='row' alignItems='center' gap={2} width="100%">
                            <img src={item.image} alt={item.title} width={100} />
                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography>{item.quantity} x {item.unitPrice.toFixed(2)} MAD</Typography>                            
                            </Box>
                        </Box>
                        
                    </Box>
                ))}
                <Box sx={{ textAlign: 'right', mt: 2 }}>
                    <Typography variant="h6">Total Amount: {totalAmount.toFixed(2)} MAD</Typography> 
                </Box>
        </Box>
    )
    

    return (
        <Container fixed sx={{ mt: 3 }}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ mb: 2 }}>
                <Typography variant="h4">Checkout</Typography>
            </Box>
            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth sx={{ mb: 2 }}/>
            {renderCartItems()}
            <Button variant="contained" fullWidth sx={{ mt: 1, background: "#008000" }} onClick={handleConfirmOrder}>Pay Now</Button>
        </Container>
      );
}
// toFixed() method formats a number using fixed-point notation. An integer between 0 and 100 that represents the number of digits to appear after the decimal point. If the number of digits is more than the digits in the number, it adds zeros to create the desired decimal length. If the number of digits is 0, the decimal point and the digits after the decimal point are removed. If the number of digits is not provided, it rounds the number to the nearest integer.

export default CheckoutPage;