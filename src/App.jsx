import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

function App() {
  // header items
  const menu = [
    { id: 1, name: "Shop" },
    { id: 2, name: "About Us" },
    { id: 3, name: "Contact Us" },
  ];

  // footer items
  const footer = [
    { id: 1, name: "© 2024 Farm to Shelf. All rights reserved." },
    { id: 2, name: "Contact Us: contact@farmToShelf.com" },
  ];

  return (  
    <div>
      <Header 
        menu={menu} 
        title="Farm to Shelf" 
        icon1={<FontAwesomeIcon icon={faUser} />} 
        icon2={<FontAwesomeIcon icon={faCartShopping} className="second" />} 
      />
      <Auth />
      <Footer footer={footer} />
    </div>
  )
}

export default App;
