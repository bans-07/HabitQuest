const loginForm = document.getElementById('login-form') as HTMLFormElement;

const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

if (loginForm && emailInput && passwordInput) {
    loginForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        console.log('Login try:');
        console.log('Email:', email);
        console.log('Password:', password);

        if (email === '' || password === '') {
            console.error('Please fill out both fields.');
            alert('Please fill out both fields.');
            return;
        }

        // Need to insert fetch and response with server
    });
} else {
    console.error('Email or password not found.');
}