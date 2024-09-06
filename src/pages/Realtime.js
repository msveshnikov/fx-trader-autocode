import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    useMediaQuery,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import apiService from '../services/apiService';
import Loading from '../components/Loading';
import Chart from 'react-apexcharts';

const Realtime = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState('EUR/USD');
    const [timeframe, setTimeframe] = useState('1m');
    const theme = useTheme();
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
    } = useQuery(['chartData', selectedPair, timeframe], () =>
        apiService.getChartData(selectedPair, timeframe)
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
            text: `${selectedPair} Candlestick Chart`,
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

    const handlePairChange = (pair) => {
        setSelectedPair(pair);
    };

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
    };

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
                <title>Realtime FX Rates - FX Trading Platform</title>
                <meta
                    name="description"
                    content="View real-time FX rates and candlestick charts for major currency pairs."
                />
            </Helmet>
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Realtime FX Rates
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Currency Pairs
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
                                                                    .default,
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() =>
                                                            handlePairChange(
                                                                pair
                                                            )
                                                        }
                                                    >
                                                        <Typography variant="subtitle1">
                                                            {pair}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Bid: {bid.toFixed(5)}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Ask: {ask.toFixed(5)}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                ) : (
                                    <Typography>
                                        No currency pairs available
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {selectedPair} Candlestick Chart
                                </Typography>
                                <Box mb={2}>
                                    <Button
                                        variant={
                                            timeframe === '1m'
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            handleTimeframeChange('1m')
                                        }
                                        sx={{ mr: 1 }}
                                    >
                                        1M
                                    </Button>
                                    <Button
                                        variant={
                                            timeframe === '5m'
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            handleTimeframeChange('5m')
                                        }
                                        sx={{ mr: 1 }}
                                    >
                                        5M
                                    </Button>
                                    <Button
                                        variant={
                                            timeframe === '1h'
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            handleTimeframeChange('1h')
                                        }
                                    >
                                        1H
                                    </Button>
                                </Box>
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