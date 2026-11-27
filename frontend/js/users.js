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
                            email,
                            role_id
                        })
                    }
                );
                showToast('User updated successfully');

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
                            password_hash: password,
                            role_id
                        })
                    }
                );
                    showToast('User created successfully');
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