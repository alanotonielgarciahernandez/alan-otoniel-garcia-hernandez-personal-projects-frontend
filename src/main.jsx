// main.jsx
// The entry point of the app and where the router operates.

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import third-party components.
import { RouterProvider } from 'react-router-dom';

// Import custom Router.
import { router } from './router/Router';

// Import custom CSS.
import './scss/styles.scss';

// Define the element where React displays the components.
ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    { /* Router component to render the appropiate UI. */ }
    <RouterProvider router={ router } />
  </React.StrictMode>
);
