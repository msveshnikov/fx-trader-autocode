// src/services/apiService.js

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockResponse = (data) => ({
    ok: true,
    json: async () => data
});

const apiService = {
    login: async (credentials) => {
        await mockDelay(500);
        return mockResponse({
            token: 'mock_token',
            user: { id: 1, username: credentials.username }
        });
    },

    register: async (userData) => {
        await mockDelay(500);
        return mockResponse({ message: 'User registered successfully' });
    },

    getQuotes: async (currencyPairs) => {
        await mockDelay(300);
        return mockResponse(
            currencyPairs.map((pair) => ({
                pair,
                bid: Math.random() + 1,
                ask: Math.random() + 1.01
            }))
        );
    },

    placeOrder: async (orderData) => {
        await mockDelay(400);
        return mockResponse({ orderId: Math.floor(Math.random() * 1000000) });
    },

    getPositions: async () => {
        await mockDelay(300);
        return mockResponse([
            {
                id: 1,
                pair: 'EUR/USD',
                amount: 10000,
                openPrice: 1.1234,
                currentPrice: 1.1256
            },
            {
                id: 2,
                pair: 'GBP/JPY',
                amount: 5000,
                openPrice: 150.67,
                currentPrice: 150.89
            }
        ]);
    },

    closePosition: async (positionId) => {
        await mockDelay(400);
        return mockResponse({
            message: `Position ${positionId} closed successfully`
        });
    },

    getTradeHistory: async () => {
        await mockDelay(500);
        return mockResponse([
            {
                id: 1,
                pair: 'EUR/USD',
                amount: 10000,
                openPrice: 1.1234,
                closePrice: 1.1256,
                profit: 220
            },
            {
                id: 2,
                pair: 'GBP/JPY',
                amount: 5000,
                openPrice: 150.67,
                closePrice: 150.89,
                profit: 110
            }
        ]);
    },

    getUserAccount: async () => {
        await mockDelay(300);
        return mockResponse({
            id: 1,
            username: 'johndoe',
            email: 'john@example.com',
            balance: 50000
        });
    },

    updateUserAccount: async (accountData) => {
        await mockDelay(400);
        return mockResponse({ message: 'Account updated successfully' });
    },

    fetchCurrencyPairs: async () => {
        await mockDelay(200);
        return mockResponse([
            'EUR/USD',
            'GBP/USD',
            'USD/JPY',
            'AUD/USD',
            'USD/CAD'
        ]);
    },

    fetchAccountBalance: async () => {
        await mockDelay(300);
        return mockResponse({ balance: 50000 });
    },

    getChartData: async (currencyPair, timeframe) => {
        await mockDelay(500);
        return mockResponse(
            Array.from({ length: 100 }, (_, i) => ({
                timestamp: Date.now() - i * 60000,
                open: Math.random() + 1,
                high: Math.random() + 1.1,
                low: Math.random() + 0.9,
                close: Math.random() + 1
            }))
        );
    },

    getRiskMetrics: async () => {
        await mockDelay(400);
        return mockResponse({
            totalExposure: 100000,
            marginUsed: 5000,
            marginAvailable: 45000,
            riskLevel: 'Low'
        });
    },

    updateRiskLimits: async (riskLimits) => {
        await mockDelay(300);
        return mockResponse({ message: 'Risk limits updated successfully' });
    },

    getNotifications: async () => {
        await mockDelay(300);
        return mockResponse([
            { id: 1, message: 'New market update available', read: false },
            { id: 2, message: 'Your order has been executed', read: true }
        ]);
    },

    markNotificationAsRead: async (notificationId) => {
        await mockDelay(200);
        return mockResponse({
            message: `Notification ${notificationId} marked as read`
        });
    },

    getDashboardData: async () => {
        await mockDelay(500);
        return mockResponse({
            accountBalance: 50000,
            openPositions: 2,
            dailyPnL: 350,
            notifications: 1
        });
    },

    updateDashboardLayout: async (layout) => {
        await mockDelay(300);
        return mockResponse({
            message: 'Dashboard layout updated successfully'
        });
    },

    getMarketNews: async (page = 1) => {
        await mockDelay(400);
        const newsPerPage = 6;
        const startIndex = (page - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const allNews = [
            {
                id: 1,
                title: 'Fed announces interest rate decision',
                date: '2023-05-01',
                imageUrl: 'https://example.com/image1.jpg',
                summary:
                    'The Federal Reserve announced its latest interest rate decision...',
                publishedAt: '2023-05-01T14:30:00Z'
            },
            {
                id: 2,
                title: 'ECB to hold press conference on monetary policy',
                date: '2023-05-02',
                imageUrl: 'https://example.com/image2.jpg',
                summary:
                    'The European Central Bank is set to hold a press conference...',
                publishedAt: '2023-05-02T10:00:00Z'
            },
            {
                id: 3,
                title: 'Bank of Japan maintains ultra-low interest rates',
                date: '2023-05-03',
                imageUrl: 'https://example.com/image3.jpg',
                summary:
                    'The Bank of Japan has decided to maintain its ultra-low interest rates...',
                publishedAt: '2023-05-03T06:45:00Z'
            },
            {
                id: 4,
                title: 'US Dollar strengthens against major currencies',
                date: '2023-05-04',
                imageUrl: 'https://example.com/image4.jpg',
                summary:
                    'The US Dollar has shown significant strength against major currencies...',
                publishedAt: '2023-05-04T18:20:00Z'
            },
            {
                id: 5,
                title: 'Oil prices surge amid geopolitical tensions',
                date: '2023-05-05',
                imageUrl: 'https://example.com/image5.jpg',
                summary:
                    'Oil prices have surged in response to escalating geopolitical tensions...',
                publishedAt: '2023-05-05T09:15:00Z'
            },
            {
                id: 6,
                title: 'Global stock markets react to economic data',
                date: '2023-05-06',
                imageUrl: 'https://example.com/image6.jpg',
                summary:
                    'Global stock markets have shown mixed reactions to the latest economic data...',
                publishedAt: '2023-05-06T16:00:00Z'
            },
            {
                id: 7,
                title: 'Cryptocurrency market experiences high volatility',
                date: '2023-05-07',
                imageUrl: 'https://example.com/image7.jpg',
                summary:
                    'The cryptocurrency market has experienced significant volatility in recent trading...',
                publishedAt: '2023-05-07T11:30:00Z'
            },
            {
                id: 8,
                title: 'IMF releases global economic outlook report',
                date: '2023-05-08',
                imageUrl: 'https://example.com/image8.jpg',
                summary:
                    'The International Monetary Fund has released its latest global economic outlook report...',
                publishedAt: '2023-05-08T13:45:00Z'
            }
        ];
        return mockResponse(allNews.slice(startIndex, endIndex));
    },

    getEconomicCalendar: async () => {
        await mockDelay(400);
        return mockResponse([
            {
                id: 1,
                event: 'US Non-Farm Payrolls',
                date: '2023-05-05',
                impact: 'High'
            },
            { id: 2, event: 'UK GDP', date: '2023-05-10', impact: 'Medium' }
        ]);
    }
};

export default apiService;
