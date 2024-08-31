import React, { useState, useEffect, useMemo } from "react";
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
    Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { format } from "date-fns";
import apiService from "../services/apiService";
import Loading from "../components/Loading";

const History = () => {
    const [trades, setTrades] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTradeHistory();
    }, []);

    const fetchTradeHistory = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const data = await apiService.getTradeHistory(token, startDate, endDate);
            setTrades(data);
        } catch (error) {
            setError("Error fetching trade history: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = () => {
        fetchTradeHistory();
    };

    const sortedTrades = useMemo(() => {
        return [...trades].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [trades]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Trade History
            </Typography>
            <Box display="flex" gap={2} mb={2}>
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
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Currency Pair</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Profit/Loss</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTrades.map((trade) => (
                            <TableRow key={trade.id}>
                                <TableCell>{(new Date(trade.date), "yyyy-MM-dd HH:mm:ss")}</TableCell>
                                <TableCell>{trade.pair}</TableCell>
                                <TableCell>{trade.type}</TableCell>
                                <TableCell>{trade.amount}</TableCell>
                                <TableCell>{trade.price}</TableCell>
                                <TableCell>{trade.profit}</TableCell>
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
