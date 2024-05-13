import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Root() {
    const isUserSignedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        if (!token) {
            return true;
        }
        const decodedToken = jwtDecode(token);
        if (!decodedToken || !decodedToken.exp) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleTokenExpiration();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (isTokenExpired(token)) {
            handleSignout();
        }
    };

    const handleSignout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        localStorage.removeItem('email');
        localStorage.removeItem('userType');
        navigate('/login');
    };
    
    return (
        <>
            <nav className='navigation-bar'>
                <ul className='ul-1'>
                    <li className='website-name'><Link to={`/`}>Farm to Shelf</Link></li>
                </ul>
                <ul className='ul-2'>
                <>
                    {isUserSignedIn ? (
                    <>
                        {localStorage.getItem('userType') === 'customer' && (
                        <>
                            <li><Link to={`/shop`}>Shop</Link></li>
                            <li><Link to={`/cart`}>Cart</Link></li>
                        </>
                        )}
                        {localStorage.getItem('userType') === 'merchant' && (
                        <>
                            <li><Link to={`/dashboard`}>Dashboard</Link></li>
                            <li><Link to={`/merchantorders`}>Orders</Link></li>
                        </>
                        )}
                    </>
                    ) : (
                    <>
                    </>
                    )}
                </>
                </ul>
                <ul className='ul-3'>
                <>
                    {isUserSignedIn ? (
                    <>
                        {localStorage.getItem('userType') === 'customer' && (
                        <>
                            <li><Link to={`/account`}>Account</Link></li>
                            <li><Link to={`/orders`}>Orders</Link></li>
                            <li><button onClick={handleSignout}>Sign Out</button></li>
                        </>
                        )}
                        {localStorage.getItem('userType') === 'merchant' && (
                        <>
                            <li><Link to={`/account`}>Account</Link></li>
                            <li><button onClick={handleSignout}>Sign Out</button></li>
                        </>
                        )}
                    </>
                    ) : (
                    <>
                        <li><Link to={`/login`}>Log In</Link></li>
                        <li><Link to={`/signup`}>Sign Up</Link></li>
                    </>
                    )}
                </>
                </ul>
            </nav>
            <Outlet />
            <footer className="footer">
                <p className='footer-content1'>© 2024 Farm to Shelf. All rights reserved.</p>
                <p className='footer-content2'>Contact Us: contact@farmToShelf.com</p>
            </footer>
        </>
    )
}