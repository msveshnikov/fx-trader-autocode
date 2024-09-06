import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import apiService from '../services/apiService';
import Loading from '../components/Loading';
import { useLanguage } from '../contexts/LanguageContext';
import Chart from 'react-apexcharts';

const Realtime = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const theme = useTheme();
    const { language } = useLanguage();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        data: chartData,
        isLoading: chartLoading,
        error: chartError
    } = useQuery(['chartData', 'EUR/USD', '1m'], () =>
        apiService.getChartData('EUR/USD', '1m')
    );

    useEffect(() => {
        if (quotesData) {
            setCurrencyPairs(quotesData);
        }
    }, [quotesData]);

    const sortedCurrencyPairs = useMemo(() => {
        return [...currencyPairs].sort((a, b) => a.pair.localeCompare(b.pair));
    }, [currencyPairs]);

    const chartOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            toolbar: {
                show: !isMobile
            }
        },
        title: {
            text: 'EUR/USD Candlestick Chart',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        theme: {
            mode: theme.palette.mode
        }
    };

    const chartSeries = useMemo(() => {
        if (!chartData) return [];
        return [
            {
                data: chartData.map((item) => ({
                    x: new Date(item.timestamp),
                    y: [item.open, item.high, item.low, item.close]
                }))
            }
        ];
    }, [chartData]);

    if (quotesLoading || chartLoading) {
        return <Loading />;
    }

    if (quotesError || chartError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography color="error">
                    {quotesError?.message || chartError?.message}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>
                    {language === 'en'
                        ? 'Realtime FX Rates - FX Trading Platform'
                        : 'Taux FX en temps réel - Plateforme de trading FX'}
                </title>
                <meta
                    name="description"
                    content={
                        language === 'en'
                            ? 'View real-time FX rates and candlestick charts for major currency pairs.'
                            : 'Consultez les taux FX en temps réel et les graphiques en chandeliers pour les principales paires de devises.'
                    }
                />
            </Helmet>
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {language === 'en'
                            ? 'Realtime FX Rates'
                            : 'Taux FX en temps réel'}
                    </Typography>
                    <Grid container spacing={3}>
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
                                                            {bid.toFixed(5)}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {language === 'en'
                                                                ? 'Ask:'
                                                                : 'Vente:'}{' '}
                                                            {ask.toFixed(5)}
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
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {language === 'en'
                                        ? 'EUR/USD Candlestick Chart'
                                        : 'Graphique en chandeliers EUR/USD'}
                                </Typography>
                                <Box height={350}>
                                    <Chart
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="candlestick"
                                        height={350}
                                        width="100%"
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default React.memo(Realtime);