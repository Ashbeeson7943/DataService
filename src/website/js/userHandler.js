async function login() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    await fetch(`http://localhost:9000/api/generic/v1/user/login?uname=${username}&pwd=${password}`, {})

    window.location.reload();
}

async function logout() {
    await fetch('http://localhost:9000/api/generic/v1/user/logout', {})
    window.location.reload();
}