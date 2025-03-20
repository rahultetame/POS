import { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const SecondaryButton = ({ children, ...rest }: SecondaryButtonProps) => (
  <Button variant='contained' className='secondary-button' {...rest}>
    {children}
  </Button>
);

export default SecondaryButton;
