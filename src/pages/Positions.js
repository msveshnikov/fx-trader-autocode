import React, { useCallback } from 'react';
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
    Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiService from '../services/apiService';
import Loading from '../components/Loading';

const Positions = () => {
    const theme = useTheme();
    const queryClient = useQueryClient();

    const {
        data: positions,
        isLoading,
        isError,
        error
    } = useQuery('positions', () =>
        apiService.getPositions(localStorage.getItem('token'))
    );

    const closePositionMutation = useMutation(
        (positionId) =>
            apiService.closePosition(positionId, localStorage.getItem('token')),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('positions');
            }
        }
    );

    const handleClosePosition = useCallback(
        (positionId) => {
            closePositionMutation.mutate(positionId);
        },
        [closePositionMutation]
    );

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography color="error">{error.message}</Typography>
            </Box>
        );
    }

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
                        {positions?.map((position) => (
                            <TableRow key={position.id}>
                                <TableCell component="th" scope="row">
                                    {position.pair}
                                </TableCell>
                                <TableCell align="right">
                                    {position.amount}
                                </TableCell>
                                <TableCell align="right">
                                    {position.openPrice}
                                </TableCell>
                                <TableCell align="right">
                                    {position.currentPrice}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{
                                        color:
                                            position.currentPrice -
                                                position.openPrice >=
                                            0
                                                ? theme.palette.success.main
                                                : theme.palette.error.main
                                    }}
                                >
                                    {(
                                        (position.currentPrice -
                                            position.openPrice) *
                                        position.amount
                                    )?.toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            handleClosePosition(position.id)
                                        }
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
