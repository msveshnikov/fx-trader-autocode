# FX Trading Platform

## Overview

This FX Trading Platform is a modern, responsive web application built with React, designed to provide users with a seamless foreign exchange trading experience.

## Features

-   Real-time currency pair quotes
-   Order placement (market and limit orders)
-   Position management
-   Trade history and reporting
-   User authentication and account management
-   Customizable dashboard
-   Dark mode / Light mode toggle
-   Advanced charting tools
-   Risk management features

## Technical Stack

-   React.js for frontend development
-   MUI5 for UI components
-   React Router v6 for navigation
-   Fetch API for backend communication

## Project Structure

```
fx-trading-platform/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Design Considerations

-   Implement a responsive design for desktop and mobile devices
-   Use a modular architecture for easy maintenance and scalability
-   Implement lazy loading for improved performance
-   Utilize custom hooks for reusable logic
-   Implement error boundaries for robust error handling
-   Use React Suspense for code-splitting and improved loading states
-   Implement accessibility features (WCAG compliance)
-   Optimize for SEO with React Helmet
-   Use React.memo and useMemo for performance optimization
-   Implement progressive web app (PWA) features

# TODO

-   mock API
-   add more complex mocked data
-   change theme to nice one

ERROR in ./src/pages/EconomicCalendar.js 16:27-48
export 'fetchEconomicCalendar' (imported as 'fetchEconomicCalendar') was not found in '../services/apiService' (possible exports: default)
ERROR in ./src/pages/MarketNews.js 17:31-46
export 'fetchMarketNews' (imported as 'fetchMarketNews') was not found in '../services/apiService' (possible exports: default)
ERROR in ./src/pages/RiskManagement.js 24:30-46
export 'fetchRiskMetrics' (imported as 'fetchRiskMetrics') was not found in '../services/apiService' (possible exports: default)
ERROR in ./src/pages/RiskManagement.js 44:12-28
export 'updateRiskLimits' (imported as 'updateRiskLimits') was not found in '../services/apiService' (possible exports: default)