
// =========================================
// 1. CURRENT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================================
// 2. DARK MODE / LIGHT MODE
// =========================================

const themeButton = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

function updateThemeButton() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    themeButton.textContent = isDark ? "☀" : "☾";

    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

if (themeButton) {
    updateThemeButton();

    themeButton.addEventListener("click", function () {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("portfolio-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("portfolio-theme", "dark");
        }

        updateThemeButton();
    });
}


// =========================================
// 3. MOBILE NAVIGATION MENU
// =========================================

const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuButton || !navMenu) return;

    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
}

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
        if (
            !navMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });
}


// =========================================
// 4. CLOSE MENU WITH ESCAPE KEY
// =========================================

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});



/* =========================================
   5. ACTIVE NAVIGATION LINK
========================================= */

const navigationLinks = document.querySelectorAll(
    ".nav-menu .nav-link"
);

const navigationSections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {
    let currentSection = "home";

    navigationSections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach(link => {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);

navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        navigationLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});



// =========================================
// 6. SMOOTH SCROLLING
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

});


// =========================================
// 7. SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(
    ".reveal, .section-heading, .about-description, " +
    ".about-card, .skill-card, .education-card, " +
    ".project-card, .activity-card, .contact-panel"
);

// Add reveal class to elements
revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

// Check whether browser supports IntersectionObserver
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");

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

    // Show all elements if IntersectionObserver is unavailable
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });

}


// =========================================
// 8. PROJECT FILTER
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active class to selected button
        button.classList.add("active");

        const selectedFilter = button.getAttribute("data-filter");

        projectCards.forEach(function (card) {

            const projectCategory = card.getAttribute("data-category");

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// =========================================
// 9. BACK TO TOP BUTTON
// =========================================

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}



// =========================================
// 11. PROFILE IMAGE ERROR HANDLING
// =========================================

const profileImage = document.getElementById("profile-image");

if (profileImage) {

    profileImage.addEventListener("error", function () {

        profileImage.style.display = "none";

        console.warn(
            "Profile image could not be loaded. Check images/profile.jpg."
        );

    });

}


// =========================================
// 12. PROJECT IMAGE ERROR HANDLING
// =========================================

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

        console.warn(
            "Project image could not be loaded. Check the image folder."
        );

    });

});

// =========================================
// 14. TYPEWRITER ANIMATION - ACTIVITIES
// =========================================

const activityDescriptions = document.querySelectorAll(
    ".activity-card p"
);

// Check whether browser supports IntersectionObserver
if ("IntersectionObserver" in window) {

    const typingObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const paragraph = entry.target;
                    const originalText = paragraph.textContent.trim();

                    if (paragraph.dataset.typed === "true") return;

                    paragraph.dataset.typed = "true";
                    paragraph.textContent = "";
                    paragraph.classList.add("typing");

                    let index = 0;

                    function typeText() {

                        if (index < originalText.length) {

                            paragraph.textContent += originalText.charAt(index);
                            index++;

                            setTimeout(typeText, 25);

                        } else {

                            paragraph.classList.remove("typing");

                        }
                    }

                    typeText();
                    observer.unobserve(paragraph);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    activityDescriptions.forEach(function (paragraph) {
        typingObserver.observe(paragraph);
    });

} else {

    // Show the original text if IntersectionObserver is unavailable
    activityDescriptions.forEach(function (paragraph) {
        paragraph.classList.remove("typing");
    });

}