const loginForm = document.getElementById('loginForm')
const message = document.getElementById('message')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {

        const response = await fetch (
            'http://localhost:3000/api/auth/login',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem(
            'token',
            data.token
        );

        window.location.href = 
            'dashboard.html';

    } catch (error) {

        message.textContent = 
            error.message;
    }
});