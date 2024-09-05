// src/services/apiService.js

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api.example.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

const apiService = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getQuotes: async (currencyPairs) => {
    const response = await fetch(`${BASE_URL}/quotes?pairs=${currencyPairs.join(",")}`);
    return handleResponse(response);
  },

  placeOrder: async (orderData, token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getPositions: async (token) => {
    const response = await fetch(`${BASE_URL}/positions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  closePosition: async (positionId, token) => {
    const response = await fetch(`${BASE_URL}/positions/${positionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getTradeHistory: async (token, startDate, endDate) => {
    const response = await fetch(
      `${BASE_URL}/trades?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return handleResponse(response);
  },

  getUserAccount: async (token) => {
    const response = await fetch(`${BASE_URL}/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  updateUserAccount: async (accountData, token) => {
    const response = await fetch(`${BASE_URL}/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(accountData),
    });
    return handleResponse(response);
  },

  fetchCurrencyPairs: async () => {
    const response = await fetch(`${BASE_URL}/currency-pairs`);
    return handleResponse(response);
  },

  fetchAccountBalance: async (token) => {
    const response = await fetch(`${BASE_URL}/account/balance`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getChartData: async (currencyPair, timeframe, token) => {
    const response = await fetch(
      `${BASE_URL}/chart-data?pair=${currencyPair}&timeframe=${timeframe}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return handleResponse(response);
  },

  getRiskMetrics: async (token) => {
    const response = await fetch(`${BASE_URL}/risk-metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  updateRiskLimits: async (riskLimits, token) => {
    const response = await fetch(`${BASE_URL}/risk-limits`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(riskLimits),
    });
    return handleResponse(response);
  },

  getNotifications: async (token) => {
    const response = await fetch(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  markNotificationAsRead: async (notificationId, token) => {
    const response = await fetch(`${BASE_URL}/notifications/${notificationId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getDashboardData: async (token) => {
    const response = await fetch(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  updateDashboardLayout: async (layout, token) => {
    const response = await fetch(`${BASE_URL}/dashboard/layout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(layout),
    });
    return handleResponse(response);
  },

  getMarketNews: async () => {
    const response = await fetch(`${BASE_URL}/market-news`);
    return handleResponse(response);
  },

  getEconomicCalendar: async () => {
    const response = await fetch(`${BASE_URL}/economic-calendar`);
    return handleResponse(response);
  },
};

export default apiService;