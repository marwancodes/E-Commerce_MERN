import { Box, Container, Typography, Button, ButtonGroup } from "@mui/material"
import { useCart } from "../contexts/cart/CartContext";



const CartPage = () => {

    const { cartItems, totalAmount } = useCart();



    return (
        <Container fixed sx={{ mt: 3 }}>
          <Typography variant="h4">My Cart</Typography>
        {cartItems.map((item) => (
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ border: 1, borderColor: '#DDDDDD', borderRadius: 5, padding: 2,  mt: 1 }}>
                <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                    <img src={item.image} alt={item.title} width={150} />
                    <Box>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.quantity} x {item.unitPrice.toFixed(2)} MAD</Typography>                            <Button color="error">Remove Item</Button>
                    </Box>
                </Box>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>-</Button>
                    <Button>+</Button>
                </ButtonGroup>
            </Box>
        ))}
        <Box>
            <Typography variant="h5">Total Amount: {totalAmount.toFixed(2)} MAD</Typography> 
        </Box>
        </Container>
      );
}
// toFixed() method formats a number using fixed-point notation. An integer between 0 and 100 that represents the number of digits to appear after the decimal point. If the number of digits is more than the digits in the number, it adds zeros to create the desired decimal length. If the number of digits is 0, the decimal point and the digits after the decimal point are removed. If the number of digits is not provided, it rounds the number to the nearest integer.

export default CartPage