const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const form = document.getElementById("form");

form.onsubmit = async (e) => {
    e.preventDefault();

    let email = emailField.value.trim();
    let password = passwordField.value.trim();

    let response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let data = await response.json();
    if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.href = "index.html"

    }
} 