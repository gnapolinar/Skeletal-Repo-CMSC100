import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Root() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate()

    const handleSignout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <>
            <nav className='navigation-bar'>
                <ul className='ul-1'>
                    <li className='website-name'><Link to={`/`}>Farm to Shelf</Link></li>
                </ul>
                <ul className='ul-2'>
                        <>
                            { isUserSignedIn ? (
                                <>
                                    <li><Link to={`/shop`}>Shop</Link></li>
                                    <li><Link to={`/cart`}>Cart</Link></li>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </>
                </ul>
                <ul className='ul-3'>
                        <>
                            { isUserSignedIn ? (
                                <>
                                    <li><Link to={`/account`}>Account</Link></li>
                                    <li><Link to={`/orders`}>Orders</Link></li>
                                    <li><button onClick={handleSignout}>Sign Out</button></li>
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
