const menu = document.querySelector("#menu");

const toggleMenu = (e) => {
    e.preventDefault();
    menu.classList.toggle("hidden");
};

document.querySelector("#menu-button").addEventListener("click", toggleMenu);
document.querySelector("#close-button").addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", toggleMenu);
});
