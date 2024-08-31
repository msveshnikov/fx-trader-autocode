// src/services/apiService.js

const mockData = {
    login: { token: "mock_token" },
    register: { message: "User registered successfully" },
    quotes: { "EUR/USD": 1.1234, "GBP/USD": 1.3456, "USD/JPY": 110.67 },
    orders: { id: "order123", status: "executed" },
    positions: [{ id: "pos1", pair: "EUR/USD", amount: 10000 }],
    trades: [
        {
            id: "trade1",
            pair: "EUR/USD",
            amount: 10000,
            profit: 100,
            date: "2023-07-01T12:00:00Z",
            type: "buy",
            price: 1.1234,
            status: "closed",
        },
        {
            id: "trade2",
            pair: "GBP/USD",
            amount: 5000,
            profit: -50,
            date: "2023-07-02T14:30:00Z",
            type: "sell",
            price: 1.3456,
            status: "closed",
        },
    ],
    account: { name: "John Doe", email: "john@example.com", balance: 50000 },
    currencyPairs: ["EUR/USD", "GBP/USD", "USD/JPY"],
    chartData: [
        { timestamp: 1625097600, open: 1.1234, high: 1.1256, low: 1.1212, close: 1.1245 },
        { timestamp: 1625184000, open: 1.1245, high: 1.1278, low: 1.1234, close: 1.1267 },
    ],
    riskMetrics: { maxDrawdown: 5, sharpeRatio: 1.5 },
    notifications: [{ id: "notif1", message: "New market update", read: false }],
    dashboard: { widgets: ["chart", "positions", "orders"] },
    marketNews: [{ id: "news1", title: "Market Update", content: "Lorem ipsum" }],
    economicCalendar: [{ date: "2023-07-01", event: "NFP Report" }],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockResponse = async (data) => {
    await delay(300);
    return { json: async () => data, ok: true };
};

const apiService = {
    login: async (credentials) => mockResponse(mockData.login),
    register: async (userData) => mockResponse(mockData.register),
    getQuotes: async (currencyPairs) => {
        const quotes = {};
        currencyPairs.forEach((pair) => {
            quotes[pair] = mockData.quotes[pair];
        });
        return mockResponse(quotes);
    },
    placeOrder: async (orderData) => mockResponse(mockData.orders),
    getPositions: async () => mockResponse(mockData.positions),
    closePosition: async (positionId) => mockResponse({ message: "Position closed" }),
    getTradeHistory: async (startDate, endDate) => {
        const filteredTrades = mockData.trades.filter((trade) => {
            const tradeDate = new Date(trade.date);
            return (!startDate || tradeDate >= new Date(startDate)) && (!endDate || tradeDate <= new Date(endDate));
        });
        return mockResponse(filteredTrades);
    },
    getUserAccount: async () => mockResponse(mockData.account),
    updateUserAccount: async (accountData) => mockResponse({ message: "Account updated" }),
    fetchCurrencyPairs: async () => mockResponse(mockData.currencyPairs),
    fetchAccountBalance: async () => mockResponse({ balance: mockData.account.balance }),
    getChartData: async (currencyPair, timeframe) => mockResponse(mockData.chartData),
    getRiskMetrics: async () => mockResponse(mockData.riskMetrics),
    setRiskLimits: async (riskLimits) => mockResponse({ message: "Risk limits set" }),
    getNotifications: async () => mockResponse(mockData.notifications),
    markNotificationAsRead: async (notificationId) => mockResponse({ message: "Notification marked as read" }),
    getDashboardData: async () => mockResponse(mockData.dashboard),
    updateDashboardLayout: async (layout) => mockResponse({ message: "Dashboard layout updated" }),
    getMarketNews: async () => mockResponse(mockData.marketNews),
    getEconomicCalendar: async () => mockResponse(mockData.economicCalendar),
};

export default apiService;
