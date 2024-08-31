import React, { useState, useEffect, useMemo } from "react";
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import Loading from "../components/Loading";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [accountBalance, setAccountBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const [pairsData, accountData, dashboardData] = await Promise.all([
                apiService.getQuotes(["EUR/USD", "GBP/USD", "USD/JPY"]),
                apiService.getUserAccount(token),
                apiService.getDashboardData(token),
            ]);
            setCurrencyPairs(Object.entries(pairsData).map(([symbol, price]) => ({ symbol, price })));
            setAccountBalance(accountData.balance);
            setDashboardData(dashboardData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const sortedCurrencyPairs = useMemo(() => {
        return [...currencyPairs].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }, [currencyPairs]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
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
                                {accountBalance !== null ? (
                                    <Typography variant="h4">${accountBalance?.toFixed(2)}</Typography>
                                ) : (
                                    <Typography>Balance unavailable</Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Quick Trade
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/trading")}
                                    fullWidth
                                >
                                    Start Trading
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Currency Pairs
                                </Typography>
                                {sortedCurrencyPairs.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {sortedCurrencyPairs.map((pair) => (
                                            <Grid item xs={12} sm={6} md={4} key={pair.symbol}>
                                                <Paper
                                                    elevation={1}
                                                    sx={{
                                                        p: 2,
                                                        backgroundColor: theme.palette.background.default,
                                                    }}
                                                >
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
                        {dashboardData && dashboardData.widgets?.includes("positions") && (
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Open Positions
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("/positions")}
                                        fullWidth
                                    >
                                        View Positions
                                    </Button>
                                </Paper>
                            </Grid>
                        )}
                        {dashboardData && dashboardData.widgets?.includes("orders") && (
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Recent Orders
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("/history")}
                                        fullWidth
                                    >
                                        View Order History
                                    </Button>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default React.memo(Dashboard);
