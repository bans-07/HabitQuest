import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill out both fields.');
      return;
    }

    console.log('Login attempt:');
    console.log('Username:', username);
    console.log('Password:', password);

    
    navigate('/dashboard');
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Habit Quest</h1> 
      <div className="login-container" style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.signup}>
          Don't have an account yet? <a href="/signup">Sign Up Here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    maxWidth: '400px',
    margin: '40px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3rem',
    color: '#0077cc',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  container: {
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginTop: '0.25rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  signup: {
    marginTop: '1rem',
  },
};