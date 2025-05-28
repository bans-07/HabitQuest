import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;
    let errorMessage = '';

    if (firstName.trim() === '') {
      errorMessage += 'First name is required.\n';
      isValid = false;
    }
    if (email.trim() === '') {
      errorMessage += 'A valid email address is required.\n';
      isValid = false;
    }
    if (password === '') {
      errorMessage += 'Password is required.\n';
      isValid = false;
    }

    if (!isValid) {
      alert(errorMessage);
      console.error('Signup failed\n', errorMessage);
      return;
    }

    console.log('Signup completed successfully');
    console.log('First Name:', firstName);
    console.log('Email:', email);
    console.log('Password:', password);

    // TODO: Add fetch request to your backend here
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Welcome to Habit Quest</h1> 
      <div className="signup-container" style={styles.container}>
        <h2>Sign Up</h2>
        <form id="signup-form" onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter a valid email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" className="btn" name="signup-submit" style={styles.button}>
            Complete Sign Up
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account? <a href="/login">Log into your account here</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

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
  loginLink: {
    marginTop: '1rem',
  },
};