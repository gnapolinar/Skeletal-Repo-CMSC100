import { Outlet, Link } from 'react-router-dom';
export default function Root() {

    return (
        <>
            <nav className='navigation-bar'>
                <ul className='ul-1'>
                <li className='website-name'><Link to={`/`}>Farm to Shelf</Link></li>
                </ul>
                <ul className='ul-2'>
                <li><Link to={`/shop`}>Shop</Link></li>
                <li><Link to={`/about`}>About</Link></li>
                <li><Link to={`/contact`}>Contact</Link></li>
                </ul>
                <ul className='ul-3'>
                <li><Link to={`/login`}>Log In</Link></li>
                <li><Link to={`/signup`}>Sign Up</Link></li>
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