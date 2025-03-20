import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { Product } from '../../redux/slices/productSlice';

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

      {isInCart ? (
        <SecondaryButton disabled>
          <CheckCircleIcon className='tick-icon' /> Added
        </SecondaryButton>
      ) : (
        <PrimaryButton onClick={onAddToCart}>Add to Cart</PrimaryButton>
      )}
    </div>
  );
};

export default ProductCard;
