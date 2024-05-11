import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Frontend/components/Root';
import Home from './Frontend/pages/Home';
import Shop from './Frontend/pages/Shop';
import LogIn from './Frontend/pages/Login';
import SignUp from './Frontend/pages/Signup';
import Orders from './Frontend/pages/Orders';
import Account from './Frontend/pages/Account';
import Cart from './Frontend/pages/Cart';
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
    { path: 'shop', element: isUserSignedIn ? <Shop /> : null }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
