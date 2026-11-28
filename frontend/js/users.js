const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const logoutLink = 
    document.getElementById('logoutLink');
if (logoutLink) {

    logoutLink.addEventListener(
        'click',
        (event) => {

            event.preventDefault();

            localStorage.removeItem('token');

            window.location.href = 'login.html';
        }
    );
}

const usersTableBody =
    document.getElementById('usersTableBody');

let allUsers = [];

function showToast(message, type = 'success') {

    const toast =
        document.getElementById('toast');
    
    toast.textContent = message;

    toast.className =
        `toast toast-${type}`;
    
    setTimeout(() => {

        toast.className =
            'toast hidden';
    
    }, 3000);
}

let filteredUsers = [];

function getRoleName(roleId) {
    switch (roleId) {
        case 1:
            return 'Admin';
        case 3:
            return 'User';
        default:
            return 'No Role';
    }
}

function renderUsers(users) {

    usersTableBody.innerHTML = '';

    users.forEach(user => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${getRoleName(user.role_id)}</td>
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
    })
}


async function loadUsers() {

    const response = await fetch(
        'http://localhost:3000/api/users'
    );

    //const users = await response.json();
    allUsers = await response.json();

    renderUsers(allUsers);

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

    document.getElementById('roleId').value =
        user.role_id;
    
    document.getElementById('password').value = '';
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

    showToast(
        'User deleted successfully'
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

            const role_id =
                parseInt(
                    document.getElementById('roleId').value
                );

            if (!username.trim()) {
                showToast(
                    'Username is required',
                    'error'
                );
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showToast(
                    'Please enter a valid email',
                    'error'
                );
                return;
            }

            if (!userId && password.length < 6) {
                showToast(
                    'Password must be at least 6 characters',
                    'error'
                );
                return;
            }

            try {

                if (userId) {

                    const response = await fetch(
                        `http://localhost:3000/api/users/${userId}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                username,
                                email,
                                role_id
                            })
                        }
                    );

                    if (!response.ok) {
                        showToast(
                            'Failed to update user',
                            'error'
                        );
                        return;
                    }

                    showToast(
                        'User updated successfully'
                    );

                } else {

                    const response = await fetch(
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
                                password_hash: password,
                                role_id
                            })
                        }
                    );

                    // if (!response.ok) {
                    //     showToast(
                    //         'Failed to create user',
                    //         'error'
                    //     );
                    //     return;
                    // }
                    if (!response.ok) {
                        const error = await response.json();
                        console.log(error);
                        console.log(error.message)
                        if (
                            error.message.includes(
                                'username'
                            )
                        ){
                            showToast(
                                'Username already exist',
                                'error'
                            );
                            return;
                        }
                        if (
                            error.message.includes(
                                'email'
                            )
                        ){
                            showToast(
                                'Email already exists',
                                'error'
                            )
                            return;
                        }
                        showToast(
                            error.message,
                            'error'
                        );
                        return;
                    }

                    showToast(
                        'User created successfully'
                    );
                }

                document
                    .getElementById('createUserForm')
                    .reset();

                document
                    .getElementById('userId')
                    .value = '';

                loadUsers();

            } catch (error) {

                console.error(error);

                showToast(
                    'Unexpected error',
                    'error'
                );
            }
        }
    );

document
    .getElementById('searchInput')
    .addEventListener(
        'input',
        (event) => {

            const searchText = 
                event.target.value.toLowerCase();
            
            const filteredUsers =
                allUsers.filter(user => 

                    user.username
                        .toLowerCase()
                        .includes(searchText)
                    
                    ||

                    user.email  
                        .toLowerCase()
                        .includes(searchText)
                );
            renderUsers(filteredUsers);
        }
    )
loadUsers();