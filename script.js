/* =========================================
   KHAIRUNNISA'S CREATIVE PORTFOLIO
   Interactive JavaScript
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
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
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

            copyEmailButton.textContent = copied
                ? "Email copied! ✓"
                : emailAddress;
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

/* ========================================
   13. PROJECT DETAIL MODAL
======================================== */

const projectGrid = document.querySelector(".project-grid");

if (projectGrid) {
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.hidden = true;

    modal.innerHTML = `
        <div class="project-modal-backdrop"
             data-modal-close="true"></div>

        <section class="project-modal-dialog"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="project-modal-title"
                 tabindex="-1">

            <button class="project-modal-close"
                    type="button"
                    aria-label="Close project details">
                &times;
            </button>

            <div class="project-modal-content">
                <p class="eyebrow">PROJECT DETAILS</p>
                <h2 id="project-modal-title"></h2>
                <div id="project-modal-description"></div>
            </div>
        </section>
    `;

    document.body.appendChild(modal);

    const modalTitle = modal.querySelector("#project-modal-title");
    const modalDescription =
        modal.querySelector("#project-modal-description");
    const modalClose = modal.querySelector(".project-modal-close");

    let previousFocus = null;

    function closeProjectModal() {
        if (modal.hidden) return;

        modal.hidden = true;
        document.body.classList.remove("modal-open");

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    function openProjectModal(card, trigger) {
        const title = card.querySelector("h3");

        const description = card.querySelector(
            ".project-content > p:not(.project-type):not(.project-tags)"
        );

        const tags = card.querySelector(".project-tags");
        const achievement = card.querySelector(".achievement");

        modalTitle.textContent = title
            ? title.textContent.trim()
            : "Project details";

        modalDescription.replaceChildren();

        [description, tags, achievement].forEach(function (element) {
            if (!element) return;

            const paragraph = document.createElement("p");
            paragraph.textContent = element.textContent.trim();
            modalDescription.appendChild(paragraph);
        });

        previousFocus = trigger;
        modal.hidden = false;
        document.body.classList.add("modal-open");
        modalClose.focus();
    }

    projectGrid.querySelectorAll(".project-card").forEach(function (card) {
        const content = card.querySelector(".project-content");

        if (!content) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-outline project-details-button";
        button.textContent = "Explore project details ↗";

        button.addEventListener("click", function () {
            openProjectModal(card, button);
        });

        content.appendChild(button);
    });

    modalClose.addEventListener("click", closeProjectModal);

    modal.addEventListener("click", function (event) {
        if (
            event.target instanceof Element &&
            event.target.dataset.modalClose === "true"
        ) {
            closeProjectModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (modal.hidden) return;

        if (event.key === "Escape") {
            closeProjectModal();
            return;
        }

        if (event.key === "Tab") {
            event.preventDefault();
            modalClose.focus();
        }
    });
}

/* ========================================
   14. SKILLS ACCORDION
======================================== */

document.querySelectorAll(".skill-group").forEach(function (group, index) {
    const heading = group.querySelector("h4");
    const panel = group.querySelector(".skill-tags");

    if (!heading || !panel) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "skill-accordion-button";
    button.id = "skill-toggle-" + index;
    button.setAttribute("aria-expanded", "false");
    button.textContent = heading.textContent.trim();

    const panelId = "skill-panel-" + index;

    panel.id = panelId;
    panel.classList.add("skill-accordion-panel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.hidden = true;

    button.setAttribute("aria-controls", panelId);

    heading.replaceWith(button);
    group.classList.add("skill-accordion");

    button.addEventListener("click", function () {
        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isExpanded));
        panel.hidden = isExpanded;
    });
});

/* ========================================
   15. SCROLL PROGRESS INDICATOR
======================================== */

(function () {
    const progress = document.createElement("div");

    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");

    document.body.appendChild(progress);

    let ticking = false;

    function updateProgress() {
        const scrollable =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        progress.style.width =
            Math.min(100, Math.max(0, percentage)) + "%";

        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", updateProgress);

    updateProgress();
})();

/* ========================================
   16. SUBTLE POINTER TILT FOR PROJECT CARDS
======================================== */

(function () {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion || !finePointer) return;

    document.querySelectorAll(".project-card").forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 3.5;
            const rotateX = (0.5 - y) * 3.5;

            card.style.transform =
                "perspective(900px) rotateX(" + rotateX +
                "deg) rotateY(" + rotateY +
                "deg) translateY(-2px)";
        });

        card.addEventListener("pointerleave", function () {
            card.style.transform = "";
        });
    });
})();

/* ========================================
   17. SKILL TAG ACCESSIBILITY
======================================== */

document.querySelectorAll(".skill-tags span").forEach(function (tag) {
    tag.setAttribute("tabindex", "0");
    tag.setAttribute("role", "listitem");
});

/* ========================================
   18. PAGE LOADED
======================================== */

console.info(
    "Khairunnisa's interactive portfolio loaded successfully."
);