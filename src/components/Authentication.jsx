import { useState, useEffect } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.includes('@') || email.length < 8) {
      setError('This is an invalid email address.');
      return;
    }
    
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];
    if (existingEmails.includes(email)) {
      setIsLoggedIn(true);
      setSuccessMessage('You have successfully logged in with your email: ' + email);
      return;
    }
    const updatedEmails = [...existingEmails, email];
    localStorage.setItem('emails', JSON.stringify(updatedEmails));
    setIsLoggedIn(true);
  };
  

  const handleLogout = () => {
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];
    localStorage.setItem('emails', JSON.stringify(existingEmails));

    setIsLoggedIn(false);
  };

  const checkLoggedInStatus = () => {
    const storedEmail = localStorage.getItem('emails');
    if (storedEmail) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>{successMessage ? successMessage : 'Welcome'}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Auth;
