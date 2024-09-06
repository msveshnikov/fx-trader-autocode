import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import apiService from "../services/apiService";
import Loading from "../components/Loading";

const MarketNews = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const fetchMarketNews = useCallback(async () => {
    const data = await apiService.getMarketNews(page);
    return data;
  }, [page]);

  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useQuery(["marketNews", page], fetchMarketNews, {
    keepPreviousData: true,
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) return <Loading />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market News
      </Typography>
      <Grid container spacing={3}>
        {news &&
          news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.summary}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {new Date(item.publishedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleLoadMore}
          disabled={isLoading}
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Load More"}
        </Button>
      </Box>
    </Container>
  );
};

export default MarketNews;
