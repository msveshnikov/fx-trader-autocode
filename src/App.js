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

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(JSON.parse(savedMode));
        }
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
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
                                    <link
                                        rel="manifest"
                                        href="/manifest.json"
                                    />
                                </Helmet>
                                <Header
                                    toggleTheme={toggleDarkMode}
                                    changeLanguage={changeLanguage}
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
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<Register />}
                                        />
                                        <Route
                                            path="/dashboard"
                                            element={<Dashboard />}
                                        />
                                        <Route
                                            path="/trading"
                                            element={<Trading />}
                                        />
                                        <Route
                                            path="/positions"
                                            element={<Positions />}
                                        />
                                        <Route
                                            path="/history"
                                            element={<History />}
                                        />
                                        <Route
                                            path="/account"
                                            element={<Account />}
                                        />
                                        <Route
                                            path="/risk-management"
                                            element={<RiskManagement />}
                                        />
                                        <Route
                                            path="/market-news"
                                            element={<MarketNews />}
                                        />
                                        <Route
                                            path="/economic-calendar"
                                            element={<EconomicCalendar />}
                                        />
                                        <Route
                                            path="/realtime"
                                            element={<Realtime />}
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
