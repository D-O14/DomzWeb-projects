const CardBtn = document.querySelectorAll(".CardBtn");
const links = document.querySelectorAll(".link");
const line = document.querySelector(".line");
const toast = document.querySelector(".toast");
const closeBtn = document.querySelector(".icon-close");
const progress = document.querySelector(".progress");
const message = document.querySelector(".toast-message");

let timeout;

CardBtn.forEach(btn => {
    let inCart = false;

    btn.addEventListener("click", () => {
        inCart = !inCart;

        const product = btn.dataset.product;

        if (inCart) {
            btn.textContent = "Added to Cart";
            showToast(`${ product } added to cart`);
        } else {
            btn.textContent = "Add to Cart";
            showToast(`${ product } removed from cart`);
        }
    })

    function showToast(text) {
        clearTimeout(timeout);

        message.textContent = text;

        toast.classList.remove("hide","show");
        progress.classList.remove("active");

        void toast.offsetWidth;

        setTimeout(() => {
            toast.classList.add("show");
            progress.classList.add("active")
        }, 10)

        timeout = setTimeout(() => {
            toast.classList.remove("show");
            progress.classList.remove("active");
        }, 5000)

        timeout = setTimeout(hideToast, 5000);
    }

    closeBtn.addEventListener("click", () => {
        clearTimeout(timeout)
        hideToast()

    });

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            links.forEach(link => { link.classList.remove("active") })
            link.classList.add("active")

            line.style.width = e.target.offsetWidth + "px";
            line.style.left = e.target.offsetLeft + "px";
        })
    })
})

function hideToast() {
    toast.classList.remove("show");
    toast.classList.add("hide");
    progress.classList.remove("active");

    setTimeout(() => {
        toast.classList.remove("hide");
    }, 400)
}