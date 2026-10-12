const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}

function openMenu() {
    if (!menuButton || !navigationLinks) {
        return;
    }

    menuButton.classList.add("open");
    navigationLinks.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
}

function closeMenu() {
    if (!menuButton || !navigationLinks) {
        return;
    }

    menuButton.classList.remove("open");
    navigationLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
    if (!navigationLinks) {
        return;
    }

    if (navigationLinks.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

if (navigationLinks) {
    navigationLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

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

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

updateHeader();
