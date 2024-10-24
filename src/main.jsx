import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./contexts/StoreContext.jsx";
import router from './Routers/Router.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
