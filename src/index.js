import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ProductDetails from './components/productDetails/ProductDetails';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux'; 
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: "/",

    
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "product-details/:product_id",
        element: <ProductDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
