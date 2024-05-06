import { useState, useEffect } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = () => {
    const storedEmails = JSON.parse(localStorage.getItem('emails')) || [];
    if (storedEmails.includes(email)) {
      setError('Email already exists. Please use a different one.');
    } else {
      const updatedEmails = [...storedEmails, email];
      localStorage.setItem('emails', JSON.stringify(updatedEmails));
      setIsSignedUp(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>You are already logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isSignedUp ? (
            <div>
              <h2>Sign Up Successful!</h2>
            </div>
          ) : (
            <div>
              <h2>Signup</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSignup}>Signup</button>
              {error && <p>{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
