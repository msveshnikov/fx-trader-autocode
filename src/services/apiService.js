// src/services/apiService.js

const API_BASE_URL = "https://api.fxtrading.com/v1";

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
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getQuotes: async (currencyPairs) => {
    const response = await fetch(`${API_BASE_URL}/quotes?pairs=${currencyPairs.join(",")}`);
    return handleResponse(response);
  },

  placeOrder: async (orderData, token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getPositions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/positions`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  closePosition: async (positionId, token) => {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getTradeHistory: async (token) => {
    const response = await fetch(`${API_BASE_URL}/trades`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getUserAccount: async (token) => {
    const response = await fetch(`${API_BASE_URL}/account`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  updateUserAccount: async (accountData, token) => {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(accountData),
    });
    return handleResponse(response);
  },

  fetchCurrencyPairs: async () => {
    const response = await fetch(`${API_BASE_URL}/currency-pairs`);
    return handleResponse(response);
  },

  fetchAccountBalance: async (token) => {
    const response = await fetch(`${API_BASE_URL}/account/balance`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getChartData: async (currencyPair, timeframe, token) => {
    const response = await fetch(`${API_BASE_URL}/chart-data?pair=${currencyPair}&timeframe=${timeframe}`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getRiskMetrics: async (token) => {
    const response = await fetch(`${API_BASE_URL}/risk-metrics`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  setRiskLimits: async (riskLimits, token) => {
    const response = await fetch(`${API_BASE_URL}/risk-limits`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(riskLimits),
    });
    return handleResponse(response);
  },

  getNotifications: async (token) => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  markNotificationAsRead: async (notificationId, token) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ read: true }),
    });
    return handleResponse(response);
  },
};

export default apiService;