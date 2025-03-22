import { useDispatch } from 'react-redux';
import {
  CartItem,
  removeFromCart,
  updateQuantity,
} from '../../redux/slices/cartSlice';
import { Box, Typography, IconButton, ListItem } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ebtIcon from '../../assets/images/etb.png';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      key={item.sku}
      className={`cart-item ${!item.ebt ? 'non-ebt' : ''}`}
    >
      <Box className='cart-item-info'>
        {item.ebt && (
          <Box className='ebt-icon-container'>
            <img src={ebtIcon} alt={'EBT'} />
          </Box>
        )}

        <Box className='cart-item-image'>
          <img src={item.image} alt={item.name} />
        </Box>
        <Box className='cart-item-name'>
          <Typography className='cart-item-title'>{item.name}</Typography>
          <Typography className='cart-item-measurement'>
            {item.quantity} × {item.weight} {item.measuringUnit}
          </Typography>
          <Typography className='cart-item-price'>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box className='cart-item-controls'>
        <IconButton
          disabled={item.quantity === 0}
          onClick={() => {
            if (item.quantity === 1) {
              dispatch(removeFromCart(item.sku));
            } else {
              dispatch(
                updateQuantity({
                  sku: item.sku,
                  quantity: item.quantity - 1,
                })
              );
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography>{item.quantity}</Typography>
        <IconButton
          onClick={() =>
            dispatch(
              updateQuantity({
                sku: item.sku,
                quantity: item.quantity + 1,
              })
            )
          }
        >
          <AddIcon />
        </IconButton>
        {/* <IconButton
          onClick={() => dispatch(removeFromCart(item.sku))}
          color='error'
        >
          <DeleteIcon />
        </IconButton> */}
      </Box>
    </ListItem>
  );
};

export default CartItemCard;
