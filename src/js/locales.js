const availableLocales = ["en", "fr"];

const getLang = () => {
    const locale = navigator.language || navigator.userLanguage;
    const lang = locale.split("-")[0];
    return availableLocales.includes(lang) ? lang : "en";
};

if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", getLang());
    if (getLang() !== "en") window.location.href = `/${getLang()}`;
}

window.addEventListener("load", () => {
    const selector = document.querySelector("#language");
    selector.value = localStorage.getItem("lang");
    selector.addEventListener("change", () => {
        localStorage.setItem("lang", selector.value);
        window.location.href = `/${selector.value === "en" ? "" : selector.value}`;
    });
});
