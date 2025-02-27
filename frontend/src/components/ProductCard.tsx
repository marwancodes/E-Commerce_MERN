import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../types/Product';
import { useCart } from '../contexts/cart/CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductCard = ({ _id, title, image, price }: Product) => {

  const { addItemToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price.toFixed(2)} MAD
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={() => addItemToCart(_id)}><AddShoppingCartIcon /> Add to cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;