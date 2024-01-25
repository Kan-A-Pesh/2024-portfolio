document.querySelectorAll("#about > .content > p").forEach((el) => {
    // Split each word int a span
    const words = el.innerHTML.split(" ");
    let isBold = false;
    let outerHTML = "";

    words.forEach((word) => {
        if (word.startsWith("<b>")) {
            isBold = true;
            word = word.replace("<b>", "");
        }

        outerHTML += `<p class="uppercase ${isBold ? "bold" : ""}">${word}</p> `;

        if (word.endsWith("</b>")) {
            isBold = false;
            word = word.replace("</b>", "");
        }
    });

    el.outerHTML = outerHTML;
});

const aboutEl = document.querySelector("#about");

window.addEventListener("scroll", () => {
    const progress = (1 - (aboutEl.getBoundingClientRect().top / window.innerHeight + 0.35)) * 2;
    const elements = document.querySelectorAll("#about > .content > *");

    elements.forEach((el, i) => {
        const elProgress = (i + 1) / elements.length;
        el.style.opacity = progress > elProgress ? 1 : 0.5;
        el.style.transform = `translateY(${progress > elProgress ? 0 : 5}px)`;
    });
});
