import { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface CancelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const CancelButton = ({ children, ...rest }: CancelButtonProps) => (
  <Button variant='outlined' color='inherit' {...rest}>
    {children}
  </Button>
);

export default CancelButton;
