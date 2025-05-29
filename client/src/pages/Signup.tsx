import React, { useState, useEffect } from 'react';

const quotes = [
  "Build habits, build your future.",
  "Small steps every day lead to big change.",
  "Discipline is the bridge between goals and success.",
  "Habit is persistence in practice.",
  "Success is built on the foundation of daily effort.",
];

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let errorMessage = '';
    if (!firstName.trim()) errorMessage += 'First name is required.\n';
    if (!email.trim()) errorMessage += 'Email is required.\n';
    if (!password.trim()) errorMessage += 'Password is required.\n';

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    console.log('Signup:', { firstName, email, password });
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Inline animation style block */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      <h1 style={styles.welcome}>Welcome to Habit Quest</h1>

      <div style={styles.container}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.switchText}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Log in here</a>
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

export default Signup;

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    position: 'relative',
  },
  welcome: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#0077cc',
    marginBottom: '2rem',
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
    fontSize: '1.8rem',
    marginBottom: 24,
    fontWeight: 600,
    color: '#444',
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
