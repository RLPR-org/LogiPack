import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function TransportadorBox(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#16213E' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            LogiPack
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


        {/* -------------------------------------------- nav-links -------------------------------------------- */}

        <List style={{height: '100%'}}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/transportador/' + props.carrierId)}>
                <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                    <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                      <DashboardIcon></DashboardIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>


            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=> navigate('/transportador/' + props.carrierId + '/mercadoria')}>
                <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                    <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                        <Inventory2Icon></Inventory2Icon>
                    </ListItemIcon>
                    <ListItemText primary={'Mercadoria'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=> navigate('/transportador/' + props.carrierId + '/trajeto')}>
                <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                    <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                        <MapIcon></MapIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Trajeto'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=> navigate('/transportador/' + props.carrierId + '/conta')}>
                <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                    <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                        <PersonIcon></PersonIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Informações de conta'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=> navigate('/')} style={{position: 'absolute', bottom: 0}}>
                <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                    <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                        <LogoutIcon></LogoutIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

        </List>

        {/* ------------------------------------------- end nav-links -------------------------------------------- */}

        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/*  content  */}
        {props.children}
      </Box>
    </Box>
  );
}

export { TransportadorBox };