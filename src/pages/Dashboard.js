import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useSpring, animated } from 'react-spring';
import apiService from '../services/apiService';
import Loading from '../components/Loading';
import { useLanguage } from '../contexts/LanguageContext';
import Chart from 'react-apexcharts';

const Dashboard = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [accountBalance, setAccountBalance] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const { language } = useLanguage();

    const {
        data: quotesData,
        isLoading: quotesLoading,
        error: quotesError
    } = useQuery(
        'quotes',
        () => apiService.getQuotes(['EUR/USD', 'GBP/USD', 'USD/JPY']),
        {
            refetchInterval: 10000
        }
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
                Object.entries(quotesData).map(([pair, { bid, ask }]) => ({
                    pair,
                    bid,
                    ask
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
        return [...currencyPairs].sort((a, b) => a.pair.localeCompare(b.pair));
    }, [currencyPairs]);

    const balanceAnimation = useSpring({
        number: accountBalance || 0,
        from: { number: 0 }
    });

    const chartOptions = {
        chart: {
            type: 'line',
            height: 300
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        theme: {
            mode: theme.palette.mode
        }
    };

    const chartSeries = [
        {
            name: 'EUR/USD',
            data: [1.12, 1.13, 1.15, 1.14, 1.16, 1.15]
        }
    ];

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
                <title>
                    {language === 'en'
                        ? 'Dashboard - FX Trading Platform'
                        : 'Tableau de bord - Plateforme de trading FX'}
                </title>
                <meta
                    name="description"
                    content={
                        language === 'en'
                            ? 'View your FX trading dashboard with real-time currency pair quotes and account information.'
                            : 'Consultez votre tableau de bord de trading FX avec des cotations de paires de devises en temps réel et des informations sur votre compte.'
                    }
                />
            </Helmet>
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {language === 'en' ? 'Dashboard' : 'Tableau de bord'}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {language === 'en'
                                        ? 'Account Balance'
                                        : 'Solde du compte'}
                                </Typography>
                                {accountBalance !== null ? (
                                    <animated.div>
                                        {balanceAnimation.number.to((val) => (
                                            <Typography variant="h4">
                                                ${val.toFixed(2)}
                                            </Typography>
                                        ))}
                                    </animated.div>
                                ) : (
                                    <Typography>
                                        {language === 'en'
                                            ? 'Balance unavailable'
                                            : 'Solde indisponible'}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {language === 'en'
                                        ? 'Quick Trade'
                                        : 'Trade rapide'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate('/trading')}
                                    fullWidth
                                >
                                    {language === 'en'
                                        ? 'Start Trading'
                                        : 'Commencer à trader'}
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {language === 'en'
                                        ? 'Currency Pairs'
                                        : 'Paires de devises'}
                                </Typography>
                                {sortedCurrencyPairs.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {sortedCurrencyPairs.map(
                                            ({ pair, bid, ask }) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    key={pair}
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
                                                            {pair}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {language === 'en'
                                                                ? 'Bid:'
                                                                : 'Achat:'}{' '}
                                                            {bid}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {language === 'en'
                                                                ? 'Ask:'
                                                                : 'Vente:'}{' '}
                                                            {ask}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                ) : (
                                    <Typography>
                                        {language === 'en'
                                            ? 'No currency pairs available'
                                            : 'Aucune paire de devises disponible'}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        {dashboardData &&
                            dashboardData.widgets?.includes('positions') && (
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {language === 'en'
                                                ? 'Open Positions'
                                                : 'Positions ouvertes'}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                navigate('/positions')
                                            }
                                            fullWidth
                                        >
                                            {language === 'en'
                                                ? 'View Positions'
                                                : 'Voir les positions'}
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        {dashboardData &&
                            dashboardData.widgets?.includes('orders') && (
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {language === 'en'
                                                ? 'Recent Orders'
                                                : 'Ordres récents'}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => navigate('/history')}
                                            fullWidth
                                        >
                                            {language === 'en'
                                                ? 'View Order History'
                                                : "Voir l'historique des ordres"}
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        {dashboardData &&
                            dashboardData.widgets?.includes('chart') && (
                                <Grid item xs={12}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {language === 'en'
                                                ? 'Market Chart'
                                                : 'Graphique de marché'}
                                        </Typography>
                                        <Box height={300}>
                                            <Chart
                                                options={chartOptions}
                                                series={chartSeries}
                                                type="line"
                                                height={300}
                                            />
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
