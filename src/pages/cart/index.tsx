import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from '../../redux/slices/cartSlice';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../../styles/Cart.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector(
    (state: RootState) => state?.cart?.totalAmount
  );
  const orderId = 'ORD12345';

  return (
    <Box className='cart-container'>
      {cart.length > 0 ? (
        <>
          <Box className='cart-header'>
            <Box className='cart-title'>
              <Typography>Order ID : {orderId}</Typography>
              {cart.length > 0 && (
                <Button
                  onClick={() => dispatch(clearCart())}
                  className='clear-cart'
                >
                  Clear
                </Button>
              )}
            </Box>
            <Box className='cart-title'>
              <Typography variant='h6'>Cart</Typography>
              <Typography>{cart.length} Items</Typography>
            </Box>
          </Box>

          <List className='cart-items'>
            {cart?.map((item) => (
              <ListItem key={item.sku} className='cart-item'>
                <Box className='cart-item-info'>
                  <Box className='cart-item-image'>
                    <img src={`/images/${item.sku}.png`} alt={item.name} />
                  </Box>
                  <Box className='cart-item-name'>
                    <Typography>{item.name}</Typography>
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
                  <IconButton
                    onClick={() => dispatch(removeFromCart(item.sku))}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Box className='empty-cart'>
          <ShoppingCartOutlinedIcon className='empty-cart-icon' />
          <Typography className='empty-cart-text'>
            Your cart is empty
          </Typography>
        </Box>
      )}

      {cart.length > 0 && (
        <Box className='cart-footer'>
          <Box className='cart-summary'>
            <h3>Payment Summary</h3>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='body1'>EBT SNAP Items:</Typography>
              <Typography variant='body1'>$34.36</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='body1'>NON-EBT SNAP Items:</Typography>
              <Typography variant='body1'>$23.48</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='body2'>Tax (2%):</Typography>
              <Typography variant='body2'>+ $2.13</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='body2'>Discount (10%):</Typography>
              <Typography variant='body2'>- $11.57</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h6' className='total'>
                Total:
              </Typography>
              <Typography variant='h6' className='total'>
                ${totalAmount?.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box className='payment-options'>
            <Paper className='payment-method'>
              <Button className='payment-button'>EBT</Button>
              <Button className='payment-button'>Card</Button>
              <Button className='payment-button'>Cash</Button>
            </Paper>
          </Box>
          {/* <Button variant="contained" fullWidth className="checkout-button">
            Check Out
          </Button> */}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
