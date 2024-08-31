import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// eslint-disable-next-line react/prop-types
const Header = ({ toggleTheme }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>
                        Dashboard
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/trading" onClick={handleClose}>
                        Trading
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/positions" onClick={handleClose}>
                        Positions
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/history" onClick={handleClose}>
                        History
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/risk-management" onClick={handleClose}>
                        Risk Management
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/market-news" onClick={handleClose}>
                        Market News
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/economic-calendar" onClick={handleClose}>
                        Economic Calendar
                    </MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    FX Trading Platform
                </Typography>
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Button color="inherit" component={RouterLink} to="/account">
                    Account
                </Button>
                <Button color="inherit" component={RouterLink} to="/login">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
