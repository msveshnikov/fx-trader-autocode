import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Box,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiService from '../services/apiService';
import Loading from '../components/Loading';

const RiskManagement = () => {
    const [riskLimits, setRiskLimits] = useState({
        maxExposure: 0,
        stopLossPercentage: 0,
        takeProfitPercentage: 0
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [calculatorInputs, setCalculatorInputs] = useState({
        accountBalance: 0,
        riskPercentage: 1,
        entryPrice: 0,
        stopLossPrice: 0
    });
    const [calculatorResult, setCalculatorResult] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const theme = useTheme();
    const queryClient = useQueryClient();

    const {
        data: riskMetrics,
        isLoading,
        isError,
        error
    } = useQuery('riskMetrics', () =>
        apiService.getRiskMetrics(localStorage.getItem('token'))
    );

    const updateRiskLimitsMutation = useMutation(
        (newLimits) =>
            apiService.updateRiskLimits(
                newLimits,
                localStorage.getItem('token')
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('riskMetrics');
                setAlertMessage('Risk limits updated successfully');
            },
            onError: (error) => {
                setAlertMessage(
                    'Failed to update risk limits: ' + error.message
                );
            }
        }
    );

    const handleLimitChange = (event) => {
        const { name, value } = event.target;
        setRiskLimits((prevLimits) => ({
            ...prevLimits,
            [name]: parseFloat(value)
        }));
    };

    const handleUpdateLimits = () => {
        updateRiskLimitsMutation.mutate(riskLimits);
    };

    const handleCalculatorInputChange = (event) => {
        const { name, value } = event.target;
        setCalculatorInputs((prevInputs) => ({
            ...prevInputs,
            [name]: parseFloat(value)
        }));
    };

    const calculateRisk = () => {
        const { accountBalance, riskPercentage, entryPrice, stopLossPrice } =
            calculatorInputs;
        const riskAmount = accountBalance * (riskPercentage / 100);
        const priceDifference = Math.abs(entryPrice - stopLossPrice);
        const positionSize = riskAmount / priceDifference;
        const lotSize = positionSize / 100000;

        setCalculatorResult({
            riskAmount,
            positionSize,
            lotSize
        });
    };

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <Container maxWidth="lg">
                <Typography color="error">{error.message}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ my: 4 }} maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Risk Management
            </Typography>
            {alertMessage && (
                <Alert
                    severity="info"
                    onClose={() => setAlertMessage('')}
                    sx={{ mb: 2 }}
                >
                    {alertMessage}
                </Alert>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Current Risk Metrics
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Metric</TableCell>
                                        <TableCell align="right">
                                            Value
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total Exposure</TableCell>
                                        <TableCell align="right">
                                            {riskMetrics.totalExposure}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Margin Used</TableCell>
                                        <TableCell align="right">
                                            {riskMetrics.marginUsed}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Margin Available</TableCell>
                                        <TableCell align="right">
                                            {riskMetrics.marginAvailable}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Risk Level</TableCell>
                                        <TableCell align="right">
                                            {riskMetrics.riskLevel}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Risk Limits
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Max Exposure"
                                    name="maxExposure"
                                    type="number"
                                    value={riskLimits.maxExposure}
                                    onChange={handleLimitChange}
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Stop Loss Percentage"
                                    name="stopLossPercentage"
                                    type="number"
                                    value={riskLimits.stopLossPercentage}
                                    onChange={handleLimitChange}
                                    InputProps={{
                                        inputProps: { min: 0, max: 100 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Take Profit Percentage"
                                    name="takeProfitPercentage"
                                    type="number"
                                    value={riskLimits.takeProfitPercentage}
                                    onChange={handleLimitChange}
                                    InputProps={{
                                        inputProps: { min: 0, max: 100 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateLimits}
                                    fullWidth
                                >
                                    Update Limits
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Risk Calculator
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Account Balance"
                                    name="accountBalance"
                                    type="number"
                                    value={calculatorInputs.accountBalance}
                                    onChange={handleCalculatorInputChange}
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        value={selectedCurrency}
                                        onChange={(e) =>
                                            setSelectedCurrency(e.target.value)
                                        }
                                    >
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="GBP">GBP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>
                                    Risk Percentage
                                </Typography>
                                <Slider
                                    value={calculatorInputs.riskPercentage}
                                    onChange={(_, value) =>
                                        setCalculatorInputs((prev) => ({
                                            ...prev,
                                            riskPercentage: value
                                        }))
                                    }
                                    valueLabelDisplay="auto"
                                    step={0.1}
                                    marks
                                    min={0}
                                    max={5}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Entry Price"
                                    name="entryPrice"
                                    type="number"
                                    value={calculatorInputs.entryPrice}
                                    onChange={handleCalculatorInputChange}
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Stop Loss Price"
                                    name="stopLossPrice"
                                    type="number"
                                    value={calculatorInputs.stopLossPrice}
                                    onChange={handleCalculatorInputChange}
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={calculateRisk}
                                    fullWidth
                                >
                                    Calculate Risk
                                </Button>
                            </Grid>
                        </Grid>
                        {calculatorResult && (
                            <Box mt={2}>
                                <Typography variant="h6">Results:</Typography>
                                <Typography>
                                    Risk Amount:{' '}
                                    {calculatorResult.riskAmount.toFixed(2)}{' '}
                                    {selectedCurrency}
                                </Typography>
                                <Typography>
                                    Position Size:{' '}
                                    {calculatorResult.positionSize.toFixed(2)}{' '}
                                    units
                                </Typography>
                                <Typography>
                                    Lot Size:{' '}
                                    {calculatorResult.lotSize.toFixed(2)} lots
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <Box mt={4}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Risk Management Tips
                    </Typography>
                    <Typography variant="body1">
                        1. Always use stop-loss orders to limit potential
                        losses.
                    </Typography>
                    <Typography variant="body1">
                        2. Diversify your portfolio to spread risk across
                        different currency pairs.
                    </Typography>
                    <Typography variant="body1">
                        3. Regularly review and adjust your risk limits based on
                        market conditions.
                    </Typography>
                    <Typography variant="body1">
                        4. Monitor your total exposure and avoid overexposure to
                        a single currency.
                    </Typography>
                    <Typography variant="body1">
                        5. Use the risk calculator to determine appropriate
                        position sizes.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default RiskManagement;
