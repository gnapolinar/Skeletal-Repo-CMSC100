import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Home from './pages/Home';
import Shop from './pages/Shop';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import './index.css'

const isUserSignedIn = !!localStorage.getItem('token')

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },
    { path: 'login', element: <LogIn /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'account', element: isUserSignedIn ? <Account /> : null },
    { path: 'cart', element: isUserSignedIn ? <Cart /> : null },
    { path: 'orders', element: isUserSignedIn ? <Orders /> : null },
    { path: 'shop', element: isUserSignedIn ? <Shop /> : null },
    { path: 'dashboard', element: <Dashboard /> }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
