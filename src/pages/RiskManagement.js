import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import apiService from "../services/apiService";

const RiskManagement = () => {
    const [riskMetrics, setRiskMetrics] = useState({
        totalExposure: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
    });
    const [riskLimits, setRiskLimits] = useState({
        maxExposure: 0,
        stopLossPercentage: 0,
    });
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const loadRiskMetrics = async () => {
            try {
                const metrics = await apiService.getRiskMetrics();
                setRiskMetrics(metrics);
            } catch (error) {
                setAlertMessage("Failed to load risk metrics");
            }
        };
        loadRiskMetrics();
    }, []);

    const handleLimitChange = (event) => {
        const { name, value } = event.target;
        setRiskLimits((prevLimits) => ({
            ...prevLimits,
            [name]: parseFloat(value),
        }));
    };

    const handleUpdateLimits = async () => {
        try {
            await apiService.updateRiskLimits(riskLimits);
            setAlertMessage("Risk limits updated successfully");
        } catch (error) {
            setAlertMessage("Failed to update risk limits");
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Risk Management
            </Typography>
            {alertMessage && (
                <Alert severity="info" onClose={() => setAlertMessage("")}>
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
                                        <TableCell align="right">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total Exposure</TableCell>
                                        <TableCell align="right">{riskMetrics.totalExposure}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Max Drawdown</TableCell>
                                        <TableCell align="right">{riskMetrics.maxDrawdown}%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sharpe Ratio</TableCell>
                                        <TableCell align="right">{riskMetrics.sharpeRatio}</TableCell>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={handleUpdateLimits}>
                                    Update Limits
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RiskManagement;
