import { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const storedEmails = JSON.parse(localStorage.getItem('emails')) || [];
    if (storedEmails.includes(email)) {
      // Perform login action here
      localStorage.setItem('loggedInUser', email); // Store logged-in user
      setIsLoggedIn(true);
    } else {
      setError('Email not found. Please sign up first.');
      console.log('Login failed. Email not found.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Remove logged-in user
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome back!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
