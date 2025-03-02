import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



const NotFound = () => {

    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 3000);

  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
        <Box display="flex" justifyContent="center">
            <img src="https://freight.cargo.site/w/1200/i/33bf886cb6a718eb75fb9b88e943a718a473500a7bc6374c6a8e7dadb6641de8/404-SHOPORTFOLIO-1-transp.png" width={250} alt="404" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" component="h1" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                We can't find the page you are looking for.
            </Typography>
        </Box>

    </Container>
  )
}

export default NotFound