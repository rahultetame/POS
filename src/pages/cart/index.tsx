import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItem, clearCart } from '../../redux/slices/cartSlice';
import { Box, Typography, List, Button, Paper } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../../styles/Cart.scss';
import CartItemCard from '../../components/cartItemCard';
import { useEffect, useRef } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const cart: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const totalAmount: number | undefined = useSelector(
    (state: RootState) => state?.cart?.totalAmount
  );
  const cartItemsRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (cartItemsRef.current) {
      cartItemsRef.current.scrollTop = cartItemsRef.current.scrollHeight;
    }
  }, [cart]);
  const orderId: string = 'ORD12345';

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

          <List className='cart-items' ref={cartItemsRef}>
            {cart?.map((item) => (
              <CartItemCard key={item.sku} item={item} />
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
