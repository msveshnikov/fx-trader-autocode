import React, { useState, useEffect, useMemo } from 'react';
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
    Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import apiService from '../services/apiService';
import Loading from '../components/Loading';

const EconomicCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchEconomicCalendar = async () => {
        try {
            setLoading(true);
            const data = await apiService.getEconomicCalendar(
                startDate,
                endDate
            );
            setEvents(data);
            setError(null);
        } catch (error) {
            setError('Error fetching economic calendar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEconomicCalendar();
    }, []);

    const handleFilter = () => {
        fetchEconomicCalendar();
    };

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [events]);

    if (loading) return <Loading />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Economic Calendar
            </Typography>
            <Box mb={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            onClick={handleFilter}
                            fullWidth
                        >
                            Filter
                        </Button>
                    </Grid>
                </Grid>
            </Box>
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
                        {sortedEvents.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {format(new Date(event.date), 'yyyy-MM-dd')}
                                </TableCell>
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
