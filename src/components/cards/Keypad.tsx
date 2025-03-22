import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import '../../styles/Keypad.scss';

interface KeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
}

const Keypad = ({ onInput, onClear, onDelete }: any) => {
  const buttons = [
    '1',
    '2',
    '3',
    '1/2',
    '4',
    '5',
    '6',
    '1/3',
    '7',
    '8',
    '9',
    'More',
    '0',
    '00',
    'C',
    '⌫',
  ];

  return (
    <Box
      className='keypad-container'
      display='grid'
      gridTemplateColumns='repeat(4, 1fr)'
      gap={1}
    >
      {buttons?.map((btn) => (
        <Button
          key={btn}
          variant='contained'
          onClick={() => {
            if (btn === 'C') onClear();
            else if (btn === '⌫') onDelete();
            else onInput(btn);
          }}
          sx={{ height: 60, fontSize: 18 }}
        >
          {btn}
        </Button>
      ))}
    </Box>
  );
};

export default Keypad;
