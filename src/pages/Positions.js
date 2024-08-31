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
    Button,
} from "@mui/material";

const Positions = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await fetch("/api/positions");
            const data = await response.json();
            setPositions(data);
        } catch (error) {
            console.error("Error fetching positions:", error);
        }
    };

    const closePosition = async (positionId) => {
        try {
            await fetch(`/api/positions/${positionId}`, { method: "DELETE" });
            fetchPositions();
        } catch (error) {
            console.error("Error closing position:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Positions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency Pair</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Entry Price</TableCell>
                            <TableCell align="right">Current Price</TableCell>
                            <TableCell align="right">P/L</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {positions.map((position) => (
                            <TableRow key={position.id}>
                                <TableCell component="th" scope="row">
                                    {position.currencyPair}
                                </TableCell>
                                <TableCell align="right">{position.size}</TableCell>
                                <TableCell align="right">{position.entryPrice}</TableCell>
                                <TableCell align="right">{position.currentPrice}</TableCell>
                                <TableCell align="right">{position.profitLoss}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => closePosition(position.id)}
                                    >
                                        Close
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Positions;
