import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItem } from '../../redux/slices/cartSlice';
import {
  Box,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Badge,
} from '@mui/material';
import '../../styles/Payment.scss';
import CartItemCard from '../../components/cards/cartItemCard';
import PaymentSummary from './PaymentSummary';
import Keypad from '../../components/cards/Keypad';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const cart: CartItem[] = useSelector(
    (state: RootState) => state?.cart?.items
  );
  const ebtSubtotal: number = useSelector(
    (state: RootState) => state.cart.ebtSubtotal
  );
  //   const nonEbtSubtotal: number = useSelector(
  //     (state: RootState) => state.cart.nonEbtSubtotal
  //   );
  const taxableNonEbtSubTotal: number | undefined = useSelector(
    (state: RootState) => state?.cart?.taxableNonEbtSubTotal
  );
  const ebtItems = cart?.filter((item) => item.ebt);
  const nonEbtItems = cart?.filter((item) => !item.ebt);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Box className='payment-container'>
        <Box pl={1} display={'flex'} alignItems={'center'}>
          <IconButton onClick={() => navigate(-1)} aria-label='back'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6'>Pending Payments</Typography>
        </Box>

        <Box className='payment-card-container'>
          <Box className='cart-section'>
            <Box
              display={'flex'}
              flexDirection='column'
              height='100%'
              flexGrow={1}
            >
              <Tabs
                className='cart-tabs'
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
              >
                <Tab
                  label={
                    <>
                      EBT SNAP Items
                      <Badge badgeContent={ebtItems.length} color='error' />
                    </>
                  }
                />
                <Tab
                  label={
                    <>
                      NON-EBT Items
                      <Badge
                        badgeContent={nonEbtItems.length}
                        color='error'
                        // sx={{ ml: 1 }}
                      />
                    </>
                  }
                />
              </Tabs>
              <Box className='cart-items'>
                {tabIndex === 0 &&
                  ebtItems?.map((item) => (
                    <CartItemCard key={item.sku} item={item} />
                  ))}
                {tabIndex === 1 &&
                  nonEbtItems?.map((item) => (
                    <CartItemCard key={item.sku} item={item} />
                  ))}
              </Box>
            </Box>
            <PaymentSummary tabIndex={tabIndex} />
          </Box>

          {/* Right Section - Payment Keypad */}
          <Box className='payment-section'>
            <Typography variant='h5'>
              Pay $
              {tabIndex === 0
                ? ebtSubtotal.toFixed(2)
                : taxableNonEbtSubTotal.toFixed(2)}
            </Typography>
            <Keypad />
            <Button className='ebt-button'>EBT</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Payment;
