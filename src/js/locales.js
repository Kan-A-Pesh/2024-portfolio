const availableLocales = ["en", "fr"];

const getLang = () => {
    const locale = navigator.language || navigator.userLanguage;
    const lang = locale.split("-")[0];
    return availableLocales.includes(lang) ? lang : "en";
};

let langUrl = window.location.pathname.split("/")[1];
if (langUrl === "") langUrl = "en";

if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", getLang());
    if (getLang() !== "en") window.location.href = `/${getLang()}`;
} else if (langUrl !== localStorage.getItem("lang")) {
    const storedLang = localStorage.getItem("lang");
    localStorage.setItem("lang", storedLang);
    window.location.href = `/${storedLang === "en" ? "" : storedLang}`;
}

window.addEventListener("load", () => {
    const selector = document.querySelector("#language");
    selector.value = localStorage.getItem("lang");
    selector.addEventListener("change", () => {
        localStorage.setItem("lang", selector.value);
        window.location.href = `/${selector.value === "en" ? "" : selector.value}`;
    });
});
