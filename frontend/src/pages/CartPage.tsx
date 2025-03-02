import { Box, Container, Typography, Button, ButtonGroup } from "@mui/material"
import { useCart } from "../contexts/cart/CartContext";
import { useNavigate } from "react-router-dom";



const CartPage = () => {

    const navigate = useNavigate();
    const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart();

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            return;
        }
        updateItemInCart(productId, quantity);
    };

    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId);
    }

    const renderCartItems = () => (
        <Box>
                {cartItems.map((item) => (
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ border: 1, borderColor: '#DDDDDD', borderRadius: 5, padding: 2,  mt: 1 }}>
                        <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                            <img src={item.image} alt={item.title} width={150} />
                            <Box>
                                <Typography variant="h5">{item.title}</Typography>
                                <Typography>{item.quantity} x {item.unitPrice.toFixed(2)} MAD</Typography>                            
                                <Button color="error" onClick={() => handleRemoveItem(item.productId)}>Remove Item</Button>
                            </Box>
                        </Box>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                            <Button disabled>{item.quantity}</Button>
                            <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                            
                        </ButtonGroup>
                    </Box>
                ))}
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ mt: 2 }}>
                    <Typography variant="h5">Total Amount: {totalAmount.toFixed(2)} MAD</Typography> 
                    <Button variant="contained" onClick={() => navigate('/checkout')}>Go To Checkout</Button>
                </Box>
        </Box>
    )
    

    return (
        <Container fixed sx={{ mt: 3 }}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ mb: 2 }}>
                <Typography variant="h4">My Cart</Typography>
                <Button onClick={() => clearCart()}>Clear Cart</Button>
            </Box>

            {cartItems.length ? 
                renderCartItems()
            
            :
            ( 
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ mt: 3 }}>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png" alt="" width={200} />
                    <Typography color="#808080">Your cart is empty! Please start shopping and add Items now.</Typography> 
                </Box>
            )}
        </Container>
      );
}
// toFixed() method formats a number using fixed-point notation. An integer between 0 and 100 that represents the number of digits to appear after the decimal point. If the number of digits is more than the digits in the number, it adds zeros to create the desired decimal length. If the number of digits is 0, the decimal point and the digits after the decimal point are removed. If the number of digits is not provided, it rounds the number to the nearest integer.

export default CartPage