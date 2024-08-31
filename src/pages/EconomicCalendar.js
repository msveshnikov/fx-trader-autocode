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
    CircularProgress,
} from "@mui/material";
import apiService from "../services/apiService";

const EconomicCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEconomicCalendar = async () => {
            try {
                const data = await apiService.getEconomicCalendar();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching economic calendar:", error);
                setLoading(false);
            }
        };

        loadEconomicCalendar();
    }, []);

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Economic Calendar
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Importance</TableCell>
                            <TableCell>Actual</TableCell>
                            <TableCell>Forecast</TableCell>
                            <TableCell>Previous</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell>{event.currency}</TableCell>
                                <TableCell>{event.event}</TableCell>
                                <TableCell>{event.importance}</TableCell>
                                <TableCell>{event.actual}</TableCell>
                                <TableCell>{event.forecast}</TableCell>
                                <TableCell>{event.previous}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EconomicCalendar;
