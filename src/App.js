import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Trading = lazy(() => import("./pages/Trading"));
const Positions = lazy(() => import("./pages/Positions"));
const History = lazy(() => import("./pages/History"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/trading" component={Trading} />
                        <PrivateRoute path="/positions" component={Positions} />
                        <PrivateRoute path="/history" component={History} />
                        <PrivateRoute path="/account" component={Account} />
                    </Switch>
                </Suspense>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
