// src/services/apiService.js

const API_BASE_URL = "https://api.fxtrading.com/v1";

const mockData = {
  login: { token: "mock_token" },
  register: { message: "User registered successfully" },
  quotes: { "EUR/USD": 1.1234, "GBP/USD": 1.3456, "USD/JPY": 110.67 },
  orders: { id: "order123", status: "executed" },
  positions: [{ id: "pos1", pair: "EUR/USD", amount: 10000 }],
  trades: [{ id: "trade1", pair: "EUR/USD", amount: 10000, profit: 100 }],
  account: { name: "John Doe", email: "john@example.com", balance: 50000 },
  currencyPairs: ["EUR/USD", "GBP/USD", "USD/JPY"],
  chartData: [{ timestamp: 1625097600, open: 1.1234, close: 1.1245 }],
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

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

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
  placeOrder: async (orderData, token) => mockResponse(mockData.orders),
  getPositions: async (token) => mockResponse(mockData.positions),
  closePosition: async (positionId, token) => mockResponse({ message: "Position closed" }),
  getTradeHistory: async (token) => mockResponse(mockData.trades),
  getUserAccount: async (token) => mockResponse(mockData.account),
  updateUserAccount: async (accountData, token) => mockResponse({ message: "Account updated" }),
  fetchCurrencyPairs: async () => mockResponse(mockData.currencyPairs),
  fetchAccountBalance: async (token) => mockResponse({ balance: mockData.account.balance }),
  getChartData: async (currencyPair, timeframe, token) => mockResponse(mockData.chartData),
  getRiskMetrics: async (token) => mockResponse(mockData.riskMetrics),
  setRiskLimits: async (riskLimits, token) => mockResponse({ message: "Risk limits set" }),
  getNotifications: async (token) => mockResponse(mockData.notifications),
  markNotificationAsRead: async (notificationId, token) => mockResponse({ message: "Notification marked as read" }),
  getDashboardData: async (token) => mockResponse(mockData.dashboard),
  updateDashboardLayout: async (layout, token) => mockResponse({ message: "Dashboard layout updated" }),
  getMarketNews: async (token) => mockResponse(mockData.marketNews),
  getEconomicCalendar: async (token) => mockResponse(mockData.economicCalendar),
};

export default apiService;