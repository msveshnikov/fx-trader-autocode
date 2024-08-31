import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import apiService from "../services/apiService";

const MarketNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMarketNews = async () => {
            try {
                const newsData = await apiService.fetchMarketNews();
                setNews(newsData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch market news:", error);
                setLoading(false);
            }
        };

        getMarketNews();
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
            <Typography variant="h4" component="h1" gutterBottom>
                Market News
            </Typography>
            <Grid container spacing={3}>
                {news.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                            <CardMedia component="img" height="140" image={item.imageUrl} alt={item.title} />
                            <CardContent>
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
        </Container>
    );
};

export default MarketNews;
