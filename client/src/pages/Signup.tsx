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
    <div className="signup-container">
      <h2>Signup</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn" name="signup-submit">
          Complete Sign Up
        </button>
      </form>

      <div className="login-link">
        Already have an account? <a href="/login">Log into your account here</a>
      </div>
    </div>
  );
};

export default Signup;
