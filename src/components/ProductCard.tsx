import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type Product = {
  sku: string;
  name: string;
  category: string;
  price: number;
  weight: number;
  measuringUnit: string;
  image?: string;
};
type ProductCardProps = {
  product: Product;
  isInCart: boolean;
  onAddToCart: () => void;
};

const ProductCard = ({ product, isInCart, onAddToCart }: ProductCardProps) => {
  console.log('product', product);

  return (
    <div className='product-card'>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={1}
        flexGrow={1}
      >
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>
          {product.weight} {product.measuringUnit}
        </p>
        <p className='price'>${product.price.toFixed(2)}</p>
      </Box>

      <button
        className={`add-to-cart ${isInCart ? 'added' : ''}`}
        onClick={onAddToCart}
        disabled={isInCart}
      >
        {isInCart ? (
          <>
            <CheckCircleIcon className='tick-icon' /> Added
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};

export default ProductCard;
