import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type totalPartPayProps = {
  tabIndex: number;
};

const PaymentSummary = ({ tabIndex }: totalPartPayProps) => {
  const taxableNonEbtSubTotal: number | undefined = useSelector(
    (state: RootState) => state?.cart?.taxableNonEbtSubTotal
  );
  // const totalAmount: number | undefined = useSelector(
  //   (state: RootState) => state?.cart?.totalAmount
  // );
  const tax: number = useSelector((state: RootState) => state.cart.taxAmount);

  const ebtSubtotal: number = useSelector(
    (state: RootState) => state.cart.ebtSubtotal
  );
  const nonEbtSubtotal: number = useSelector(
    (state: RootState) => state.cart.nonEbtSubtotal
  );

  console.log('tabIndex', tabIndex);
  return (
    <Box p={2} bgcolor='#f5f5dc' borderRadius={2}>
      <Typography variant='h6' fontWeight='bold'>
        Payment Summary
      </Typography>

      <Box display='flex' justifyContent='space-between' mt={2}>
        <Typography>Subtotal:</Typography>
        <Typography>
          ${tabIndex === 0 ? ebtSubtotal.toFixed(2) : nonEbtSubtotal.toFixed(2)}
        </Typography>
      </Box>

      <Box display='flex' justifyContent='space-between' mt={1}>
        <Typography>Tax:</Typography>
        <Typography>+ ${tabIndex === 0 ? '0' : tax.toFixed(2)}</Typography>
      </Box>
      <hr />
      <Box
        display='flex'
        justifyContent='space-between'
        mt={2}
        fontWeight='bold'
      >
        <Typography>Total:</Typography>
        <Typography>
          $
          {tabIndex === 0
            ? ebtSubtotal.toFixed(2)
            : taxableNonEbtSubTotal.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentSummary;
