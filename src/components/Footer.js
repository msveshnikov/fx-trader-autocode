import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Typography variant="body2" color="text.secondary" align="center">
                {"© "}
                {new Date().getFullYear()}
                {" FX Trading Platform. All rights reserved. "}
                <Link color="inherit" href="#">
                    Terms of Service
                </Link>
                {" | "}
                <Link color="inherit" href="#">
                    Privacy Policy
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
