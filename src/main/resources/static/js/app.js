function loadAndDisplayUsers() {

    // check if the user is connected
    const connectedUser = localStorage.getItem('user');
    if (!connectedUser) {
        window.location = 'login.html';
        return;
    }


    const userListElement = document.getElementById("userList");

    // Clear any existing content in the userListElement
    userListElement.innerHTML = "Loading...";

    // Retrieve the userList from Local Storage
    fetch('http://localhost:8080/api/v1/users/get-all')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    // Loop through the userList and create list items to display each user
    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div>
                    ${user.username.split(" ")[0]} <i class="user-email">(${user.email})</i>
                    <span style='color:${user.status === "online" ? "green" : "red"}'>(${user.status === "online" ? "online" : "offline"})<span>
                </div>
            `;
        userListElement.appendChild(listItem);
    });
}

// Call the loadAndDisplayUsers function when the page loads
window.addEventListener("load", loadAndDisplayUsers);

function handleLogout() {
    let user = JSON.parse(localStorage.getItem('user'));

    fetch(`http://localhost:8080/api/v1/users/logout?email=${user.email}`)
        .then((response) => {
            return response;
        })
        .then((data) => {
            localStorage.removeItem('user');
            window.location.href = "login.html";
        });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);

function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('user'));
    window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
}

// Attach the handleNewMeeting function to the "Create a New Meeting" button
const newMeetingBtn = document.getElementById("createMeetBtn");
newMeetingBtn.addEventListener("click", handleNewMeeting);


function handleJoinMeeting() {
    const roomId = document.getElementById("meetId").value;
    const connectedUser = JSON.parse(localStorage.getItem('user'));

    const url = `videocall.html?roomID=${roomId}&username=${connectedUser.username}`;

    window.open(url, "_blank");
}

const joinMeetingBtn = document.getElementById("joinBtn");
joinMeetingBtn.addEventListener("click", handleJoinMeeting);