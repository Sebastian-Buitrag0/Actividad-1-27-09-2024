// Selección de elementos del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const userInfo = document.getElementById('user-info');
const goToRegister = document.getElementById('go-to-register');
const goToLogin = document.getElementById('go-to-login');
const displayUsername = document.getElementById('display-username');
const userUsername = document.getElementById('user-username');
const logoutBtn = document.getElementById('logout-btn');

// Funciones para alternar entre formularios
goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Manejo del registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Validación básica
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // Guardar datos en localStorage (solo para fines demostrativos)
    const user = {
        username: username,
        password: password, // Nota: No es seguro guardar contraseñas en texto plano
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    // Limpiar el formulario de registro
    registerForm.reset();

    // Cambiar al formulario de login
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Manejo del login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    // Obtener los datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Validación básica
    if (!storedUser) {
        alert('No hay usuarios registrados. Por favor, regístrate primero.');
        return;
    }

    if (username !== storedUser.username || password !== storedUser.password) {
        alert('Nombre de usuario o contraseña incorrectos.');
        return;
    }

    // Inicio de sesión exitoso
    alert('Inicio de sesión exitoso. ¡Bienvenido, ' + username + '!');

    // Mostrar los datos del usuario
    displayUserInfo(storedUser);
});

// Función para mostrar los datos del usuario
function displayUserInfo(user) {
    // Ocultar los formularios
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    // Mostrar la sección de información del usuario
    userInfo.classList.add('active');

    // Mostrar los datos del usuario
    displayUsername.textContent = user.username;
    userUsername.textContent = user.username;
}

// Manejo del cierre de sesión
logoutBtn.addEventListener('click', () => {
    // Limpiar los datos (en este caso, no es necesario)

    // Mostrar el formulario de login
    userInfo.classList.remove('active');
    loginForm.classList.add('active');
});
