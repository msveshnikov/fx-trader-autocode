import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import createCustomTheme from './utils/theme';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PrivateRoute from './components/PrivateRoute';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trading = lazy(() => import('./pages/Trading'));
const Positions = lazy(() => import('./pages/Positions'));
const History = lazy(() => import('./pages/History'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const RiskManagement = lazy(() => import('./pages/RiskManagement'));
const MarketNews = lazy(() => import('./pages/MarketNews'));
const EconomicCalendar = lazy(() => import('./pages/EconomicCalendar'));
const Realtime = lazy(() => import('./pages/Realtime'));

const queryClient = new QueryClient();

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(JSON.parse(savedMode));
        }
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const theme = useMemo(
        () => createCustomTheme(darkMode ? 'dark' : 'light'),
        [darkMode]
    );

    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <LanguageProvider value={{ language, changeLanguage }}>
                        <CssBaseline />
                        <Router>
                            <div className="App">
                                <Helmet>
                                    <title>FX Trading Platform</title>
                                    <meta
                                        name="description"
                                        content="Modern FX Trading Platform"
                                    />
                                </Helmet>
                                <Header
                                    toggleTheme={toggleDarkMode}
                                    changeLanguage={changeLanguage}
                                    isAuthenticated={isAuthenticated}
                                    setIsAuthenticated={setIsAuthenticated}
                                />
                                <Suspense fallback={<Loading />}>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={
                                                <Navigate
                                                    to="/dashboard"
                                                    replace
                                                />
                                            }
                                        />
                                        <Route
                                            path="/login"
                                            element={
                                                <Login
                                                    setIsAuthenticated={
                                                        setIsAuthenticated
                                                    }
                                                />
                                            }
                                        />
                                        <Route
                                            path="/register"
                                            element={<Register />}
                                        />
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <Dashboard />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/trading"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <Trading />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/positions"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <Positions />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/history"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <History />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/account"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <Account />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/risk-management"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <RiskManagement />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/market-news"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <MarketNews />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/economic-calendar"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <EconomicCalendar />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/realtime"
                                            element={
                                                <PrivateRoute
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
                                                >
                                                    <Realtime />
                                                </PrivateRoute>
                                            }
                                        />
                                    </Routes>
                                </Suspense>
                                <Footer />
                            </div>
                        </Router>
                    </LanguageProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </QueryClientProvider>
    );
}

export default App;
