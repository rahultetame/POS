import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
// import ProductList from "../pages/product";
import { Outlet } from 'react-router-dom';
// import Cart from "../pages/cart";

const Layout = () => {
  return (
    <Box display='flex' height='100vh'>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content (Outlet) */}
      <>
        <Outlet />
      </>
    </Box>
  );
};

export default Layout;
