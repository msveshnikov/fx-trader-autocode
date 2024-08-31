import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const History = () => {
    const [trades, setTrades] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchTradeHistory();
    }, []);

    const fetchTradeHistory = async (start, end) => {
        try {
            const response = await fetch("/api/trade-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ startDate: start, endDate: end }),
            });
            const data = await response.json();
            setTrades(data);
        } catch (error) {
            console.error("Error fetching trade history:", error);
        }
    };

    const handleFilter = () => {
        fetchTradeHistory(startDate, endDate);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Trade History
            </Typography>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button variant="contained" onClick={handleFilter}>
                    Filter
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Currency Pair</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades.map((trade) => (
                            <TableRow key={trade.id}>
                                <TableCell>{new Date(trade.date).toLocaleString()}</TableCell>
                                <TableCell>{trade.currencyPair}</TableCell>
                                <TableCell>{trade.type}</TableCell>
                                <TableCell>{trade.amount}</TableCell>
                                <TableCell>{trade.price}</TableCell>
                                <TableCell>{trade.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default History;
