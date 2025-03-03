import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../contexts/auth/AuthContext";
import { useEffect } from "react";



const MyOrdersPage = () => {
    const { getMyOrders, myOrders } = useAuth();


    useEffect(() => {
        getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // console.log(myOrders);

  return (
    <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }} maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>My Orders</Typography>
        {myOrders.map((order) => (
            <Box key={order._id} sx={{ border: 1, borderColor: '#DDDDDD', borderRadius: 5, padding: 2 }} >
                <Typography>Address: {order.address}</Typography>
                <Typography>Items: {order.orderItems.length}</Typography>
                <Typography>Total: {order.total} MAD</Typography>
            </Box>
        ))}
    </Container>
  )
}

export default MyOrdersPage;