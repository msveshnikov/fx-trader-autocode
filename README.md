# FX Trading Platform

## Overview

This FX Trading Platform is a modern, responsive web application built with
React, designed to provide users with a seamless foreign exchange trading
experience.

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
-   Economic calendar
-   Market news integration
-   Multi-language support

## Technical Stack

-   React.js for frontend development
-   MUI5 for UI components
-   React Router v6 for navigation
-   Fetch API for backend communication
-   React Context API for state management
-   React Query for data fetching and caching

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
│   ├── contexts/
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
-   Utilize React Context API for global state management
-   Implement React Query for efficient data fetching and caching
-   Add CI/CD pipeline for automated testing and deployment
-   Implement GraphQL for more efficient API queries
-   Use React Spring for smooth animations and transitions

# TODO

-   fix news.map is not a function TypeError: news.map is not a function
-   FIX: Market news are empty
-   All data should be mocked