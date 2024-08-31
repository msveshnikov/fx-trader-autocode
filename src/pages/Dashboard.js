import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import { fetchCurrencyPairs, fetchAccountBalance } from "../services/apiService";

const Dashboard = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [accountBalance, setAccountBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pairsData, balanceData] = await Promise.all([fetchCurrencyPairs(), fetchAccountBalance()]);
                setCurrencyPairs(pairsData);
                setAccountBalance(balanceData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Account Balance
                            </Typography>
                            {accountBalance ? (
                                <Typography variant="h4">${accountBalance.toFixed(2)}</Typography>
                            ) : (
                                <Typography>Unable to fetch account balance</Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Quick Trade
                            </Typography>
                            {/* Add quick trade functionality here */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Currency Pairs
                            </Typography>
                            {currencyPairs.length > 0 ? (
                                <Grid container spacing={2}>
                                    {currencyPairs.map((pair) => (
                                        <Grid item xs={12} sm={6} md={4} key={pair.symbol}>
                                            <Paper elevation={1} sx={{ p: 2 }}>
                                                <Typography variant="subtitle1">{pair.symbol}</Typography>
                                                <Typography variant="h6">{pair.price}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography>No currency pairs available</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
