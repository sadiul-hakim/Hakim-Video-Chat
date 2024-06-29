const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const usernameField = document.getElementById("username");
const form = document.getElementById("form");

form.onsubmit = async (e) => {
    e.preventDefault();

    let email = emailField.value.trim();
    let password = passwordField.value.trim();
    let username = usernameField.value.trim();

    let response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let data = await response.json();
    if (response.status === 200) {
        window.location.href = "login.html";
    }

    console.log(data);
} 