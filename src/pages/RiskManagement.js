import React, { useState, useEffect, useCallback } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchRiskData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const [metrics, limits] = await Promise.all([
        apiService.getRiskMetrics(token),
        apiService.getRiskLimits(token),
      ]);
      setRiskMetrics(metrics);
      setRiskLimits(limits);
    } catch (error) {
      setError("Failed to load risk data: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRiskData();
  }, [fetchRiskData]);

  const handleLimitChange = (event) => {
    const { name, value } = event.target;
    setRiskLimits((prevLimits) => ({
      ...prevLimits,
      [name]: parseFloat(value),
    }));
  };

  const handleUpdateLimits = async () => {
    try {
      const token = localStorage.getItem("token");
      await apiService.updateRiskLimits(riskLimits, token);
      setAlertMessage("Risk limits updated successfully");
      fetchRiskData();
    } catch (error) {
      setAlertMessage("Failed to update risk limits: " + error.message);
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

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Risk Management
      </Typography>
      {alertMessage && (
        <Alert
          severity="info"
          onClose={() => setAlertMessage("")}
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
                    <TableCell align="right">Value</TableCell>
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
                    <TableCell>Max Drawdown</TableCell>
                    <TableCell align="right">
                      {riskMetrics.maxDrawdown}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sharpe Ratio</TableCell>
                    <TableCell align="right">
                      {riskMetrics.sharpeRatio}
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
                    inputProps: { min: 0 },
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
                    inputProps: { min: 0, max: 100 },
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
      </Grid>
      <Box mt={4}>
        <Paper
          elevation={3}
          sx={{ p: 2, backgroundColor: theme.palette.background.default }}
        >
          <Typography variant="h6" gutterBottom>
            Risk Management Tips
          </Typography>
          <Typography variant="body1">
            1. Always use stop-loss orders to limit potential losses.
          </Typography>
          <Typography variant="body1">
            2. Diversify your portfolio to spread risk across different currency
            pairs.
          </Typography>
          <Typography variant="body1">
            3. Regularly review and adjust your risk limits based on market
            conditions.
          </Typography>
          <Typography variant="body1">
            4. Monitor your total exposure and avoid overexposure to a single
            currency.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RiskManagement;
