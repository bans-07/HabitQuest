const signupForm = document.getElementById('signup-form') as HTMLFormElement;

const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

if (signupForm && firstNameInput && emailInput && passwordInput) {
    signupForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const firstName = firstNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        let isValid = true;
        let errorMessage = '';

        if (firstName === '') {
            errorMessage += 'First name is required.\n';
            isValid = false;
        }
        if (email === '') {
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

        //Need to add responses to send information to backend for database log
    });
} else {
    console.error('One or more fields is not complete');
}