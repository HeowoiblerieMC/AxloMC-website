const intro = document.getElementById("intro");
const introSkip = document.getElementById("introSkip");
const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");
const revealElements = document.querySelectorAll(".reveal");
const navigationAnchors = document.querySelectorAll(
    ".navigation-links a"
);
const sections = document.querySelectorAll(
    "main section[id]"
);
const leaderboardTabs = document.querySelectorAll(
    ".leaderboard-tab"
);

let introTimer;

function finishIntro() {
    if (!intro || intro.classList.contains("hidden")) {
        return;
    }

    window.clearTimeout(introTimer);
    intro.classList.add("hidden");
    document.body.classList.remove("intro-active");

    window.setTimeout(() => {
        intro.setAttribute("aria-hidden", "true");
    }, 850);
}

function startIntro() {
    if (!intro) {
        document.body.classList.remove("intro-active");
        return;
    }

    introTimer = window.setTimeout(finishIntro, 4100);
}

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );
}

function openMenu() {
    if (!menuButton || !navigationLinks) {
        return;
    }

    menuButton.classList.add("open");
    navigationLinks.classList.add("open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );
}

function closeMenu() {
    if (!menuButton || !navigationLinks) {
        return;
    }

    menuButton.classList.remove("open");
    navigationLinks.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}

function toggleMenu() {
    if (!navigationLinks) {
        return;
    }

    const menuIsOpen =
        navigationLinks.classList.contains("open");

    if (menuIsOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    }
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const activeId = entry.target.id;

            navigationAnchors.forEach((anchor) => {
                const targetId = anchor
                    .getAttribute("href")
                    .replace("#", "");

                anchor.classList.toggle(
                    "active",
                    targetId === activeId
                );
            });
        });
    },
    {
        threshold: 0.42
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

if (introSkip) {
    introSkip.addEventListener("click", finishIntro);
}

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

if (navigationLinks) {
    navigationLinks
        .querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
}

leaderboardTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        leaderboardTabs.forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");
    });
});

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (
            intro &&
            !intro.classList.contains("hidden")
        ) {
            finishIntro();
        }

        closeMenu();
    }
});

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}

updateHeader();
startIntro();
