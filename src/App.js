import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./utils/theme";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Trading = lazy(() => import("./pages/Trading"));
const Positions = lazy(() => import("./pages/Positions"));
const History = lazy(() => import("./pages/History"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
    return (
        // <ThemeProvider theme={theme}>
            
            <Router>
                <div className="App">
                    <Header />
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<PrivateRoute>{<Dashboard />}</PrivateRoute>} />
                            <Route
                                path="/trading"
                                element={
                                    <PrivateRoute>
                                        <Trading />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/positions"
                                element={
                                    <PrivateRoute>
                                        <Positions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/history"
                                element={
                                    <PrivateRoute>
                                        <History />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/account"
                                element={
                                    <PrivateRoute>
                                        <Account />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Suspense>
                    <Footer />
                </div>
            </Router>
        // </ThemeProvider>
    );
}

export default App;
