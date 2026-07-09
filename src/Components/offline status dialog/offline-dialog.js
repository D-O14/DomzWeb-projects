let isOnline = true
let timer = 10;
let intervalId;
const template = document.querySelector("template");

const icons = {
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi">
    <path d="M12 20h.01" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M5 12.859a10 10 0 0 1 14 0" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
</svg>`,
    noWifi: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-off-icon lucide-wifi-off">
    <path d="M12 20h.01" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
    <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
    <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
    <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
    <path d="m2 2 20 20" />
</svg>`,
};

function displayDialog() {
    const popup = template.content.cloneNode(true);
    const dialog = popup.querySelector(".popup");
    const popUpTitle = popup.querySelector(".title");
    const popUpDesc = popup.querySelector(".desc");
    const popUpIcon = popup.querySelector(".icon");
    const timer = popup.querySelector(".timer");
    return { dialog, popUpTitle, popUpDesc, popUpDesc, popUpIcon };
}

const popup = displayDialog();
document.body.append(popup.dialog);

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;

        /*popup.popUpTitle.textContent = "Connection Restored";
        popup.popUpDesc.textContent = "Your device has been re-connected to the internet successsfully";
        popup.popUpIcon.innerHTML = icons.wifi;*/
    } catch (error) {
        isOnline = false;

        popup.popUpTitle.textContent = "No Internet Connection";
        popup.popUpDesc.innerHTML = `Internet connection unavailable. Attempting reconnect in ${ popup.timer } seconds.`;
        popup.popUpIcon.innerHTML = icons.noWifi;
    }
    /*timer = 10;
    clearInterval(intervalId);*/
    handlePopUp(isOnline);
};

function handlePopUp(status) {
    popup.dialog.classList.add("show");

    if (status) {
        popup.dialog.classList.add("online");
        clearInterval(intervalId);
        timer = 10;
        setTimeout(() => { popup.classList.remove("show") }, 2000);
        return
    };

    popup.classList.remove("online");
    clearInterval(intervalId);
    timer = 10;
    popup.timer.textContent = timer;

    intervalId = setInterval(() => {
        timer--;
        popup.timer.textContent = timer;
        if (timer === 0) {
            clearInterval(intervalId);
            checkConnection()
        };
    }, 1000);
};

reconnect.addEventListener("click", () => { checkConnection() });
setInterval(() => { isOnline && checkConnection(); }, 3000);