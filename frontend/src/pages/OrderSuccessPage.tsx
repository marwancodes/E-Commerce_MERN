import { Box, Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";



const OrderSuccessPage = () => {

    const navigate = useNavigate();

    // setTimeout(() => {
    //     navigate('/');
    // }, 4000);

    const goToHome = () => {
        navigate('/');
    };
    
  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
        <Box display="flex" justifyContent="center">
            <img src="https://static.vecteezy.com/system/resources/previews/054/343/094/non_2x/a-green-check-mark-in-a-circle-free-png.png" width={100} alt="checkout" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Thanks for your Order.
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Your order has been successfully placed.
            </Typography>
            <Button onClick={goToHome}>Go To Home</Button>

        </Box>
    </Container>
  )
}

export default OrderSuccessPage