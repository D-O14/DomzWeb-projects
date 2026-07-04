const buttons = document.querySelectorAll(".btn");
const closeBtn = document.querySelectorAll(".close-btn");
const notifications = document.querySelectorAll(".notifications");

const msg = document.createElement("div");
const success = document.createElement("div");
const danger = document.createElement("div");

notifs = [msg, success, danger];
notifs.forEach(notif => { notif.classList.add("notification"); });

msg.classList.add("info");
success.classList.add("success");
danger.classList.add("danger");

msg.innerHTML = `
<div>
    <span>Icon</span>
    <div>
    <h3>John Doe</h3>
    <p>Great, thanks a lot for the quick reply!</p>
    </div>
    <span>&times;</span>
</div>
`;

success.innerHTML = `
<div>
    <span>Icon</span>
    <div>
    <h3>Changes Saved</h3>
    <p>Contract Date Changed Successfully</p>
    </div>
    <span>&times;</span>
</div>
`;

msg.innerHTML = `
<div>
    <span>Icon</span>
    <div>
    <h3>Document Deleted</h3>
    <p>Document deleted successfully</p>
    </div>
    <span>&times;</span>
</div>
`;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.alert;
        const notif = notifs[id].cloneNode(true);
        notifications.appendChild(notif);
    });
});

window.addEventListener("animationend", (e) => {
    if (e.target.classList.contains("notification")) {
        e.target.remove();
    }
});

window.addEventListener("animationend", (e) => {
    if (e.target.classList.contains("close-btn")) {
        e.target.parentElement.parentElement.remove();
    }
});