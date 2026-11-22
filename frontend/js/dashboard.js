const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const payload = JSON.parse(
    atob(token.split('.')[1])
);

document.getElementById('userEmail')
    .textContent = payload.email;

const roleMap = {
    1: 'Admin',
    2: 'Manager',
    3: 'User'
};

document.getElementById('userRole')
    .textContent =
        roleMap[payload.roleId] || 'unknown';

document
    .getElementById('logoutBtn')
    .addEventListener('click', () => {
        
        localStorage.removeItem('token');

        window.location.href = 
            'login.html';
    });