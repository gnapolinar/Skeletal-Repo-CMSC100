import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },
    { path: 'shop', element: <Shop /> },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
    { path: 'login', element: <LogIn /> },
    { path: 'signup', element: <SignUp /> }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
