import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';
import apiService from '../services/apiService';

const Account = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        balance: 0
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchUserData = useCallback(async () => {
        try {
            const data = await apiService.getUserAccount();
            setUser(data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching user data: ' + error.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await apiService.updateUserAccount(user);
            setIsEditing(false);
            setSuccessMessage('Account updated successfully');
            await fetchUserData();
        } catch (error) {
            setError('Error updating user data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Details
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}
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
                            <Typography variant="h6">
                                Account Balance: ${user?.balance?.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {isEditing ? (
                                <>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginRight: 2 }}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setIsEditing(true)}
                                >
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
