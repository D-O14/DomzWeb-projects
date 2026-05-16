const button = document.querySelectorAll("button");
const handle = document.querySelectorAll(".tag");
const handleName = handle.forEach(tag => {
    return tag.textContent;
})

button.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.textContent === "Follow") {
            btn.textContent += "ing";
            const notif = new Notification("Message From DomzWeb", {
                body: `You are now following ${ handleName }`,
            })
        } else {
            btn.textContent = "Follow";
            const notif = new Notification("Message From DomzWeb", {
                body: `You unfollowed ${ handleName }`,
            })
        }
    })
})
