import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import apiService from "../services/apiService";
import Loading from "../components/Loading";

const Trading = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState("");
    const [orderType, setOrderType] = useState("market");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const fetchCurrencyPairs = useCallback(async () => {
        try {
            const data = await apiService.fetchCurrencyPairs();
            setCurrencyPairs(data);
        } catch (error) {
            setError("Error fetching currency pairs: " + error.message);
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await apiService.getPositions(token);
            setOrders(data);
        } catch (error) {
            setError("Error fetching orders: " + error.message);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchCurrencyPairs(), fetchOrders()]);
            setLoading(false);
        };
        fetchData();
    }, [fetchCurrencyPairs, fetchOrders]);

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            await apiService.placeOrder(
                {
                    currencyPair: selectedPair,
                    orderType,
                    amount: parseFloat(amount),
                    price: orderType === "limit" ? parseFloat(price) : null,
                },
                token
            );
            await fetchOrders();
            setSelectedPair("");
            setOrderType("market");
            setAmount("");
            setPrice("");
        } catch (error) {
            setError("Error placing order: " + error.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Trading
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Place Order
                        </Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Currency Pair</InputLabel>
                            <Select value={selectedPair} onChange={(e) => setSelectedPair(e.target.value)}>
                                {currencyPairs.map((pair) => (
                                    <MenuItem key={pair} value={pair}>
                                        {pair}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Order Type</InputLabel>
                            <Select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                                <MenuItem value="market">Market</MenuItem>
                                <MenuItem value="limit">Limit</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            margin="normal"
                        />
                        {orderType === "limit" && (
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                margin="normal"
                            />
                        )}
                        <Button variant="contained" color="primary" onClick={handlePlaceOrder} fullWidth sx={{ mt: 2 }}>
                            Place Order
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Open Positions
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Currency Pair</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.pair}</TableCell>
                                            <TableCell>{order.type}</TableCell>
                                            <TableCell>{order.amount}</TableCell>
                                            <TableCell>{order.price || "Market"}</TableCell>
                                            <TableCell>{order.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Real-time Quotes
                </Typography>
                <Grid container spacing={2}>
                    {currencyPairs.map((pair) => (
                        <Grid item xs={12} sm={6} md={4} key={pair}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                <Typography variant="subtitle1">{pair}</Typography>
                                <Typography variant="h6">{(Math.random() * (1.5 - 0.5) + 0.5).toFixed(4)}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Trading;
