import { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const PrimaryButton = ({ children, ...rest }: PrimaryButtonProps) => (
  <Button variant='contained' className='primary-button' {...rest}>
    {children}
  </Button>
);

export default PrimaryButton;
