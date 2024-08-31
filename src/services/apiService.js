// src/services/apiService.js

const API_BASE_URL = "https://api.fxtrading.com/v1"; // Replace with actual API base URL

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An error occurred");
    }
    return response.json();
};

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
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });
        return handleResponse(response);
    },

    getPositions: async (token) => {
        const response = await fetch(`${API_BASE_URL}/positions`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(response);
    },

    closePosition: async (positionId, token) => {
        const response = await fetch(`${API_BASE_URL}/positions/${positionId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(response);
    },

    getTradeHistory: async (token) => {
        const response = await fetch(`${API_BASE_URL}/trades`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(response);
    },

    getUserAccount: async (token) => {
        const response = await fetch(`${API_BASE_URL}/account`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(response);
    },

    updateUserAccount: async (accountData, token) => {
        const response = await fetch(`${API_BASE_URL}/account`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(accountData),
        });
        return handleResponse(response);
    },
};

export default apiService;
