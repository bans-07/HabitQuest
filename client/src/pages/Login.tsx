import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Please fill out both fields.');
      return;
    }

    console.log('Login try:');
    console.log('Email:', email);
    console.log('Password:', password);

    // TODO: Add fetch request to your login API endpoint
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" name="login-submit">
          Login
        </button>
      </form>

      <div className="signup">
        Don't have an account yet? <a href="/signup">Sign Up Here</a>
      </div>
    </div>
  );
};

export default Login;




// const loginForm = document.getElementById('login-form') as HTMLFormElement;

// const emailInput = document.getElementById('email') as HTMLInputElement;
// const passwordInput = document.getElementById('password') as HTMLInputElement;

// if (loginForm && emailInput && passwordInput) {
//     loginForm.addEventListener('submit', (event: Event) => {
//         event.preventDefault();

//         const email = emailInput.value;
//         const password = passwordInput.value;

//         console.log('Login try:');
//         console.log('Email:', email);
//         console.log('Password:', password);

//         if (email === '' || password === '') {
//             console.error('Please fill out both fields.');
//             alert('Please fill out both fields.');
//             return;
//         }

//         // Need to insert fetch and response with server
//     });
// } else {
//     console.error('Email or password not found.');
// }