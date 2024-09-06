import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import apiService from '../services/apiService';
import Loading from '../components/Loading';

const Dashboard = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [accountBalance, setAccountBalance] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        data: quotesData,
        isLoading: quotesLoading,
        error: quotesError
    } = useQuery(
        'quotes',
        () => apiService.getQuotes(['EUR/USD', 'GBP/USD', 'USD/JPY']),
        { refetchInterval: 10000 }
    );

    const {
        data: accountData,
        isLoading: accountLoading,
        error: accountError
    } = useQuery('account', () =>
        apiService.getUserAccount(localStorage.getItem('token'))
    );

    const {
        data: dashboardConfig,
        isLoading: dashboardLoading,
        error: dashboardError
    } = useQuery('dashboard', () =>
        apiService.getDashboardData(localStorage.getItem('token'))
    );

    useEffect(() => {
        if (quotesData) {
            setCurrencyPairs(
                Object.entries(quotesData).map(([symbol, price]) => ({
                    symbol,
                    price
                }))
            );
        }
        if (accountData) {
            setAccountBalance(accountData.balance);
        }
        if (dashboardConfig) {
            setDashboardData(dashboardConfig);
        }
    }, [quotesData, accountData, dashboardConfig]);

    const sortedCurrencyPairs = useMemo(() => {
        return [...currencyPairs].sort((a, b) =>
            a.symbol.localeCompare(b.symbol)
        );
    }, [currencyPairs]);

    if (quotesLoading || accountLoading || dashboardLoading) {
        return <Loading />;
    }

    if (quotesError || accountError || dashboardError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography color="error">
                    {quotesError?.message ||
                        accountError?.message ||
                        dashboardError?.message}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>Dashboard - FX Trading Platform</title>
                <meta
                    name="description"
                    content="View your FX trading dashboard with real-time currency pair quotes and account information."
                />
            </Helmet>
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
                                    <Typography variant="h4">
                                        ${accountBalance?.toFixed(2)}
                                    </Typography>
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
                                    onClick={() => navigate('/trading')}
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
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                key={pair.symbol}
                                            >
                                                <Paper
                                                    elevation={1}
                                                    sx={{
                                                        p: 2,
                                                        backgroundColor:
                                                            theme.palette
                                                                .background
                                                                .default
                                                    }}
                                                >
                                                    <Typography variant="subtitle1">
                                                        {pair.symbol}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {pair.price}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography>
                                        No currency pairs available
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        {dashboardData &&
                            dashboardData.widgets?.includes('positions') && (
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Open Positions
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                navigate('/positions')
                                            }
                                            fullWidth
                                        >
                                            View Positions
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        {dashboardData &&
                            dashboardData.widgets?.includes('orders') && (
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Recent Orders
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => navigate('/history')}
                                            fullWidth
                                        >
                                            View Order History
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        {dashboardData &&
                            dashboardData.widgets?.includes('chart') && (
                                <Grid item xs={12}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Market Chart
                                        </Typography>
                                        <Box
                                            height={300}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Typography variant="body1">
                                                Chart placeholder
                                            </Typography>
                                        </Box>
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
