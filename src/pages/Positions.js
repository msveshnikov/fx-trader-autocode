import React, { useState, useEffect, useCallback } from "react";
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
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import apiService from "../services/apiService";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchPositions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await apiService.getPositions(token);
      setPositions(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching positions: " + error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const closePosition = async (positionId) => {
    try {
      const token = localStorage.getItem("token");
      await apiService.closePosition(positionId, token);
      fetchPositions();
    } catch (error) {
      setError("Error closing position: " + error.message);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
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
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell component="th" scope="row">
                  {position.currencyPair}
                </TableCell>
                <TableCell align="right">{position.size}</TableCell>
                <TableCell align="right">{position.entryPrice}</TableCell>
                <TableCell align="right">{position.currentPrice}</TableCell>
                <TableCell
                  align="right"
                  style={{
                    color:
                      position.profitLoss >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {position.profitLoss}
                </TableCell>
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
