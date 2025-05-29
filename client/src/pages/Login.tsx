import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const quotes = [
  "Stay consistent. Results will follow.",
  "Every habit starts with a decision.",
  "You are what you repeatedly do.",
  "Progress, not perfection.",
  "The journey begins with one step.",
];

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    <div style={styles.pageWrapper}>
      {/* Inline animation styles */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      <div style={styles.container}>
        <h1 style={styles.title}>Habit Quest</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.switchText}>
          Don&apos;t have an account?{' '}
          <a href="/signup" style={styles.link}>Sign up here</a>
        </p>
      </div>

      <div style={styles.quoteBanner}>
        <p style={styles.quoteText}>{quotes[quoteIndex]}</p>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Habit Quest. Project 3 - Group 08. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  container: {
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: '2rem',
    marginBottom: 24,
    fontWeight: 700,
    borderBottom: '3px solid #0077cc',
    display: 'inline-block',
    paddingBottom: 6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '12px 0',
    fontSize: 16,
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  switchText: {
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: 600,
  },
  quoteBanner: {
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
    maxWidth: 600,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  quoteText: {
    display: 'inline-block',
    animation: 'scrollText 10s linear infinite',
    paddingLeft: '100%',
    whiteSpace: 'nowrap',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: 14,
    color: '#999',
    width: '100%',
    maxWidth: 400,
  },
};
