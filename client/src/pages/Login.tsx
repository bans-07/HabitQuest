import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const quotes = [
    "Stay focused and never give up.",
    "Consistency is key to success.",
    "Every step counts on your journey.",
    "Small habits create big changes.",
    "Believe in yourself and all that you are."
  ];

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
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.switchText}>
          Don't have an account?{' '}
          <a href="/signup" style={styles.link}>
            Sign up here
          </a>
        </p>
      </div>

      <div style={styles.marqueeContainer}>
        <div style={styles.marquee}>
          {quotes.map((quote, idx) => (
            <span
              key={idx}
              style={{
                marginRight: idx === quotes.length - 1 ? '6rem' : '3rem',
                fontWeight: '700',
              }}
            >
              {quote}
            </span>
          ))}
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Habit Quest. Project 3 - Group 08. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
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
    justifyContent: 'space-between',
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
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 0',
    fontSize: 16,
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
  marqueeContainer: {
    width: '100vw',
    overflow: 'hidden',
    padding: '10px 20px',
    boxSizing: 'border-box',
    marginTop: 30,
    marginBottom: 20,
  },
  marquee: {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: 'marquee 25s linear infinite',
    fontWeight: '700',
    fontSize: '1rem',
    color: '#0077cc',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: 14,
    color: '#999',
    borderTop: '1px solid #eee',
    marginTop: 32,
    width: '100%',
    maxWidth: 400,
  },
};
