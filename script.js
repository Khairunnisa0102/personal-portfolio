
/* =========================================
   KHAIRUNNISA'S CREATIVE PORTFOLIO
   JavaScript interactions
========================================= */

"use strict";

document.documentElement.classList.add("js-enabled");

/* 1. AUTOMATIC COPYRIGHT YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* 2. MOBILE NAVIGATION MENU */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 680) {
            closeMenu();
        }
    });
}

/* 3. DARK / LIGHT THEME SWITCHER */

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = (() => {
    try {
        return localStorage.getItem("portfolio-theme");
    } catch (error) {
        return null;
    }
})();

function applyTheme(theme) {
    const darkMode = theme === "dark";

    if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    if (themeToggle) {
        themeToggle.textContent = darkMode ? "☀" : "☾";
        themeToggle.setAttribute(
            "aria-label",
            darkMode ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggle.title = darkMode
            ? "Switch to light theme"
            : "Switch to dark theme";
    }
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentlyDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        const nextTheme = currentlyDark ? "light" : "dark";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
            // Theme switching still works if storage is unavailable.
        }
    });
}

/* 4. ACTIVE NAVIGATION LINK */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {
    let currentSection = "home";
    const activationPoint = window.scrollY + 150;

    sections.forEach(function (section) {
        if (section.offsetTop <= activationPoint) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

updateActiveNavigation();

/* 5. REVEAL CONTENT ON SCROLL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
}

/* 6. PROJECT CATEGORY FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (item) {
            const selected = item === button;

            item.classList.toggle("active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        projectCards.forEach(function (card) {
            const matches =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.hidden = !matches;
        });
    });
});

/* 7. BACK-TO-TOP BUTTON */

const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {
    if (backToTop) {
        backToTop.classList.toggle("visible", window.scrollY > 450);
    }
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    });
}

/* 8. COPY EMAIL ADDRESS */

const copyEmailButton = document.getElementById("copy-email");
const emailAddress = "nisasasimi@gmail.com";

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async function () {
        const originalText = "Copy email";

        try {
            if (!navigator.clipboard || !window.isSecureContext) {
                throw new Error("Clipboard unavailable");
            }

            await navigator.clipboard.writeText(emailAddress);
            copyEmailButton.textContent = "Email copied! ✓";
        } catch (error) {
            // Fallback for local files or browsers without clipboard access.
            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = emailAddress;
            temporaryInput.setAttribute("readonly", "");
            temporaryInput.style.position = "fixed";
            temporaryInput.style.opacity = "0";

            document.body.appendChild(temporaryInput);
            temporaryInput.select();

            let copied = false;

            try {
                copied = document.execCommand("copy");
            } catch (copyError) {
                copied = false;
            }

            temporaryInput.remove();

            if (copied) {
                copyEmailButton.textContent = "Email copied! ✓";
            } else {
                copyEmailButton.textContent = emailAddress;
            }
        }

        window.setTimeout(function () {
            copyEmailButton.textContent = originalText;
        }, 2500);
    });
}


/* 9. CONTACT FORM VALIDATION AND OPEN GMAIL */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            formStatus.textContent =
                "Please complete all fields correctly.";
            return;
        }

        const formData = new FormData(contactForm);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || message.length < 10) {
            formStatus.textContent =
                "Please complete all fields and enter a message of at least 10 characters.";
            return;
        }

        const subject = encodeURIComponent(
            "Portfolio enquiry from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=nisasasimi%40gmail.com" +
            "&su=" + subject +
            "&body=" + body;

        formStatus.textContent =
            "Opening Gmail to prepare your message...";

        window.open(gmailURL, "_blank", "noopener");
    });
}


/* 10. PRINT OR SAVE PORTFOLIO AS PDF */

const printButton = document.getElementById("print-resume");

if (printButton) {
    printButton.addEventListener("click", function () {
        window.print();
    });
}

/* 11. SMOOTH SCROLL FOR INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL hash in sync with the selected section.
            if (window.location.hash !== targetId) {
                history.replaceState(null, "", targetId);
            }
        }
    });
});

/* 12. PROFILE IMAGE FALLBACK */

const profileImage = document.querySelector(".photo-frame img");

if (profileImage) {
    profileImage.addEventListener("error", function () {
        profileImage.alt =
            "Profile photo unavailable. Add your photo at images/profile.jpg.";

        profileImage.style.objectFit = "contain";
        profileImage.style.padding = "20px";
        profileImage.style.color = "#28243d";
        profileImage.style.fontSize = "14px";
    });
}

/* INITIALISE */

console.info("Khairunnisa's portfolio JavaScript loaded successfully.");
