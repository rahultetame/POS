// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
  '& .MuiLinearProgress-bar.MuiLinearProgress-barColorPrimary.MuiLinearProgress-bar1Indeterminate':
    {
      backgroundColor: 'primary',
    },
  '& .MuiLinearProgress-bar.MuiLinearProgress-barColorPrimary.MuiLinearProgress-bar2Indeterminate':
    {
      backgroundColor: 'primary',
    },
}));

// ==============================|| Loader ||============================== //

export interface LoaderProps extends LinearProgressProps {}

const LazyLoader = () => (
  <LoaderWrapper>
    <LinearProgress sx={{ height: '10px' }} color='secondary' />
  </LoaderWrapper>
);

export default LazyLoader;
