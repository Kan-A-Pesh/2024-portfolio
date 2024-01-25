window.addEventListener("scroll", (e) => {
    document.querySelectorAll(".project-card").forEach((card) => {
        const top = card.getBoundingClientRect().top;
        const progress = top / window.innerHeight;

        if (0.1 < progress && progress < 0.4) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
});
