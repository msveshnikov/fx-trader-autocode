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
│   └── landing.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── contexts/
│   ├── App.js
│   └── index.js
├── docs/
│   ├── landing_page_copy.html
│   └── social_media_content.json
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
-   Optimize for SEO with React Helmet
-   Use React.memo and useMemo for performance optimization
-   Implement progressive web app (PWA) features
-   Utilize React Context API for global state management
-   Implement React Query for efficient data fetching and caching
-   Add CI/CD pipeline for automated testing and deployment
-   Use React Spring for smooth animations and transitions
-   Implement a shared state management solution (e.g., Redux or Recoil) for
    complex state management
-   Utilize CSS-in-JS solutions like styled-components or Emotion for better
    component styling
-   Implement real-time updates using WebSockets or Server-Sent Events
-   Implement a design system for consistent UI/UX across the application
-   Add keyboard shortcuts for power users
-   Implement data visualization libraries (e.g., D3.js or Chart.js) for
    advanced charting
-   Implement a feature flag system for gradual rollout of new features

# TODO

-   fix Chart not visible
-   fix currency pair names instead of 0,1,2 Currency Pairs
0
Bid: 1.4887242912944136

Ask: 1.2628042893555937

1
Bid: 1.7945707989154935

Ask: 1.4754395566185192

2
Bid: 1.5866596896102896

Ask: 1.4941156727182907

-   fix Account Balance [object Object]