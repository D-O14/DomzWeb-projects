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

        /*btn.addEventListener("click", () => {
            if (btn.textContent === "Add to Cart") {
                btn.textContent = "Added to Cart";
    
                setTimeout(() => {
                    btn.textContent = "Remove from Cart";
                }, 2000);
    
            } else if (btn.textContent === "Remove from Cart") {
                btn.textContent = "Removed from Cart";
    
                setTimeout(() => {
                    btn.textContent = "Add to Cart";
                }, 2000)
            }
        })*/
    })

    function showToast(text) {
        clearTimeout(timeout);

        message.textContent = text;
        toast.classList.add("active");
        progress.classList.add("active");

        /*timeout = setTimeout(() => {
            toast.classList.remove("active");
        }, 5000)

        timeout = setTimeout(() => {
            progress.classList.remove("active");
        }, 5300)*/
    }

    closeBtn.addEventListener("click", () => {
        toast.classList.remove("active");

        setTimeout(() => {
            progress.classList.remove("active");
            clearTimeout(timeout);
        }, 300)
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