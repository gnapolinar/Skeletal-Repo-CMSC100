import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/api/users')
    .then((res) => {
      console.log(res.data)
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password })
      const token = response.data.token
      setEmail('')
      setPassword('')
      fetchUsers()
      navigate('/shop')
      window.location.reload()
      localStorage.setItem('token', token)
    } catch (error) {
      console.log('Login error')
    }
  }

  return (
    <div>
        <div>
          <h2>Log In</h2>
          <label>Email:</label>
          <br />
          <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          <label>Password:</label>
          <br />
          <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          <button onClick={handleLogin}>Log In</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </div>
  );
};

export default LogIn
