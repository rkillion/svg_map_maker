import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate } from '../features/auth/userSlice';
import styled from 'styled-components';

export default function Navbar({ toggleDrawer }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state)=>state.user.current)
  const dispatch = useDispatch()

  const handleLogout = () => {
        fetch(`api/logout`, {
          method: 'DELETE'
        })
          .then(res => {
            if (res.ok) {
              dispatch(userUpdate({}));
              window.location.reload();
            }
          })
      }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Nav>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fantasy Map Maker
          </Typography>
          {user.id && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout} style={{color: "red"}}>Logout</MenuItem>
              </Menu>
            </div>
          )}
    </Nav>
  );
}

const Nav = styled.div`
    position: fixed;
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    z-index: 1
`