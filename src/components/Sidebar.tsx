import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Typography,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  Insights as InsightsIcon,
  Inventory as InventoryIcon,
  LocalOffer as LocalOfferIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { path } from '../routes/Path';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Categories', path: path.HOME, icon: <CategoryIcon /> },
  {
    title: 'Reporting & Analytics',
    path: path.REPORTING,
    icon: <InsightsIcon />,
  },
  {
    title: 'Inventory Management',
    path: path.INVENTORY,
    icon: <InventoryIcon />,
  },
  {
    title: 'Pricing & Promotions',
    path: path.PRICING,
    icon: <LocalOfferIcon />,
  },
  { title: 'Settings', path: path.SETTINGS, icon: <SettingsIcon /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isProductPage = location.pathname.toLowerCase();

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: isOpen ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 60,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          background: '#E2E8D9',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box
        display='flex'
        alignItems='center'
        justifyContent={isOpen ? 'space-between' : 'center'}
        p={2}
      >
        {isOpen && <Typography variant='h6'>Store</Typography>}
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Sidebar Menu */}
      <Box
        display='flex'
        alignItems='center'
        flexDirection={'column'}
        justifyContent='space-between'
        height={'100%'}
        p={1}
      >
        <Box width={isOpen ? '100%' : '60px'} flexGrow={1}>
          <List>
            {menuItems?.map((item, index) => {
              const isActive = isProductPage?.includes(
                item.title.toLowerCase()
              );
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    sx={() => ({
                      '&.active': {
                        // color: theme.palette.secondary.main,
                        color: '#1c3b2f',
                        textDecoration: 'none',
                      },
                      minHeight: 48,
                      justifyContent: isOpen ? 'initial' : 'center',
                      px: 2.5,
                    })}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: isActive ? '#1c3b2f' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && <ListItemText primary={item.title} />}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider />

          {/* Logout */}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary='Logout' />}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize='large' />
              </ListItemIcon>
              {isOpen && <ListItemText primary='Rahul Tetame' />}
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
