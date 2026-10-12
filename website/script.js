const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");

function updateHeader() {
    if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

function openMenu() {
    menuButton.classList.add("open");
    navigationLinks.classList.add("open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
}

function closeMenu() {
    menuButton.classList.remove("open");
    navigationLinks.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
    const menuIsOpen = navigationLinks.classList.contains("open");

    if (menuIsOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

currentYear.textContent = new Date().getFullYear();

updateHeader();
