import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";

const Account = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        balance: 0,
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch user data from API
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                setIsEditing(false);
            } else {
                console.error("Error updating user data");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Details
            </Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Account Balance: ${user.balance.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {isEditing ? (
                                <>
                                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                                        Save Changes
                                    </Button>
                                    <Button variant="outlined" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button variant="contained" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Account;
