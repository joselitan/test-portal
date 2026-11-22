const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const usersTableBody =
    document.getElementById('usersTableBody');

async function loadUsers() {

    const response = await fetch(
        'http://localhost:3000/api/users'
    );

    const users = await response.json();

    usersTableBody.innerHTML = '';

    users.forEach(user => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser('${user.id}')">
                    Edit
                </button>

                <button onclick="deleteUser('${user.id}')">
                    Delete
                </button>
            </td>
        `;

        usersTableBody.appendChild(row);
    });
}

async function editUser(id) {

    const response = await fetch(
        `http://localhost:3000/api/users/${id}`
    );

    const user = await response.json();

    document.getElementById('userId').value =
        user.id;

    document.getElementById('username').value =
        user.username;

    document.getElementById('email').value =
        user.email;
}

async function deleteUser(id) {

    const confirmed = confirm(
        'Delete this user?'
    );

    if (!confirmed) {
        return;
    }

    await fetch(
        `http://localhost:3000/api/users/${id}`,
        {
            method: 'DELETE',

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    loadUsers();
}

document
    .getElementById('createUserForm')
    .addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();

            const userId =
                document.getElementById('userId').value;

            const username =
                document.getElementById('username').value;

            const email =
                document.getElementById('email').value;

            const password =
                document.getElementById('password').value;

            if (userId) {

                await fetch(
                    `http://localhost:3000/api/users/${userId}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            username,
                            email
                        })
                    }
                );

            } else {

                await fetch(
                    'http://localhost:3000/api/users',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            username,
                            email,
                            password_hash: password
                        })
                    }
                );
            }

            document
                .getElementById('createUserForm')
                .reset();

            document
                .getElementById('userId')
                .value = '';

            loadUsers();
        }
    );

loadUsers();