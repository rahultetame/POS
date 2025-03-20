import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItem, clearCart } from '../../redux/slices/cartSlice';
import { Box, Typography, List, Button, Paper } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../../styles/Cart.scss';
import CartItemCard from '../../components/cards/cartItemCard';
import { useEffect, useRef, useState } from 'react';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import CancelButton from '../../components/buttons/CancelButton';

const Cart = () => {
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const totalAmount: number | undefined = useSelector(
    (state: RootState) => state?.cart?.totalAmount
  );
  const ebtSubtotal: number = useSelector(
    (state: RootState) => state.cart.ebtSubtotal
  );
  const nonEbtSubtotal: number = useSelector(
    (state: RootState) => state.cart.nonEbtSubtotal
  );
  const taxAmount: number = useSelector(
    (state: RootState) => state.cart.taxAmount
  );
  const cart: CartItem[] = useSelector((state: RootState) => state.cart.items);

  const cartItemsRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (cartItemsRef.current) {
      cartItemsRef.current.scrollTop = cartItemsRef.current.scrollHeight;
    }
  }, [cart]);
  const orderId: string = 'ORD12345';

  const handleClearCartClick = () => {
    setOpenConfirm(true);
  };

  const handleConfirmClearCart = () => {
    dispatch(clearCart());
    setOpenConfirm(false);
  };

  const handleCancelClearCart = () => {
    setOpenConfirm(false);
  };

  return (
    <Box className='cart-container'>
      {cart.length > 0 ? (
        <>
          <Box className='cart-header'>
            <Box className='cart-title'>
              <Typography>Order ID : {orderId}</Typography>
              {cart.length > 0 && (
                <CancelButton onClick={handleClearCartClick}>
                  Clear
                </CancelButton>
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
            <Box display='flex' mt={2} justifyContent='space-between'>
              <Typography variant='body1'>EBT SNAP Items:</Typography>
              <Typography variant='body1'>${ebtSubtotal.toFixed(2)}</Typography>
            </Box>
            <Box display='flex' mt={1} justifyContent='space-between'>
              <Typography variant='body1'>NON-EBT SNAP Items:</Typography>
              <Typography variant='body1'>
                ${nonEbtSubtotal.toFixed(2)}
              </Typography>
            </Box>
            <Box display='flex' mt={1} justifyContent='space-between'>
              <Typography variant='body2'>Tax (7% on Non-EBT):</Typography>
              <Typography variant='body2'>+ ${taxAmount.toFixed(2)}</Typography>
            </Box>
            <Box display='flex' mt={2} justifyContent='space-between'>
              <Typography variant='h6' className='total'>
                Total:
              </Typography>
              <Typography variant='h6' className='total'>
                ${totalAmount?.toFixed(2)}
              </Typography>
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
        </Box>
      )}
      <ConfirmDialog
        open={openConfirm}
        title='Clear Cart?'
        content='Are you sure you want to clear your cart?'
        onConfirm={handleConfirmClearCart}
        onCancel={handleCancelClearCart}
      />
    </Box>
  );
};

export default Cart;
