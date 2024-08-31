import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const Trading = () => {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState("");
    const [orderType, setOrderType] = useState("market");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchCurrencyPairs();
        fetchOrders();
    }, []);

    const fetchCurrencyPairs = async () => {
        try {
            const response = await fetch("/api/currency-pairs");
            const data = await response.json();
            setCurrencyPairs(data);
        } catch (error) {
            console.error("Error fetching currency pairs:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/orders");
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currencyPair: selectedPair,
                    orderType,
                    amount,
                    price: orderType === "limit" ? price : null,
                }),
            });
            if (response.ok) {
                fetchOrders();
                setSelectedPair("");
                setOrderType("market");
                setAmount("");
                setPrice("");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

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
                                    <MenuItem key={pair.id} value={pair.symbol}>
                                        {pair.symbol}
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
                            Open Orders
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
                                            <TableCell>{order.currencyPair}</TableCell>
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
        </Container>
    );
};

export default Trading;
