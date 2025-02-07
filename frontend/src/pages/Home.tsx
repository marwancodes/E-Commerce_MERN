import { Box, Container, Grid } from "@mui/material"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Product } from "../types/Product";


const Home = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('Fetching data error', error);
      setError(true);
    }
      
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>

        {products.map((product) => (
          <Grid item md={4}>
            <ProductCard {...product}/>
          </Grid>
        ))}

      </Grid>
    </Container>
  )
}

export default Home