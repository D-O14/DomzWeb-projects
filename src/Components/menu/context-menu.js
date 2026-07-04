const copyLink = document.querySelector(".copy-link");
const url = location.href;
copyLink.addEventListener("click", () => {
    navigator.clipboard.writeText(url);
    console.log(`Url:${ url } copied to clipboard`);
});