import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    FX Trading Platform
                </Typography>
                <Button color="inherit" component={RouterLink} to="/dashboard">
                    Dashboard
                </Button>
                <Button color="inherit" component={RouterLink} to="/trading">
                    Trading
                </Button>
                <Button color="inherit" component={RouterLink} to="/positions">
                    Positions
                </Button>
                <Button color="inherit" component={RouterLink} to="/history">
                    History
                </Button>
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
