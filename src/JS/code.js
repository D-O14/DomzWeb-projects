const CardBtn = document.querySelectorAll(".CardBtn");
const links = document.querySelectorAll(".link");

CardBtn.forEach(btn => {
    btn.addEventListener("click", () => {
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
    })
})

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(link => { link.classList.remove("active") })
        link.classList.add("active")
    })
})