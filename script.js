
// CURRENT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


//  DARK MODE / LIGHT MODE

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


// MOBILE NAVIGATION MENU

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


// CLOSE MENU WITH ESCAPE KEY

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

  // ACTIVE NAVIGATION LINK

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



// SMOOTH SCROLLING

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

// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".reveal, .section-heading, .about-description, " +
    ".about-card, .skill-card, .education-card, " +
    ".project-card, .activity-card, .contact-panel"
);

// Add reveal class to elements
revealElements.forEach(function (element) {
    element.classList.add("reveal");
});
// Stagger animation for cards
const revealGroups = document.querySelectorAll(
    ".skills-grid, .education-list, .projects-grid, .activities-grid"
);

revealGroups.forEach(function (group) {
    const cards = group.querySelectorAll(".reveal");

    cards.forEach(function (card, index) {
        const delay = Math.min(index * 120, 480);
        card.style.setProperty("--reveal-delay", delay + "ms");
    });
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


// ROJECT FILTER

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


// BACK TO TOP BUTTON

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



//  PROFILE IMAGE ERROR HANDLING
const profileImage = document.getElementById("profile-image");

if (profileImage) {

    profileImage.addEventListener("error", function () {

        profileImage.style.display = "none";

        console.warn(
            "Profile image could not be loaded. Check images/profile.jpg."
        );

    });

}


// PROJECT IMAGE ERROR HANDLING

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

        console.warn(
            "Project image could not be loaded. Check the image folder."
        );

    });

});

// TYPEWRITER ANIMATION - ACTIVITIES

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

//  WELCOME SCREEN INTERACTION
const welcomeScreen = document.getElementById("welcome-screen");
const welcomeStart = document.getElementById("welcome-start");
const welcomeThemeButton = document.getElementById("welcome-theme-toggle");

// Update welcome theme button icon
function updateWelcomeThemeButton() {
    const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

    if (welcomeThemeButton) {
        welcomeThemeButton.textContent = isDark ? "☀" : "☾";
    }
}

// Start button
if (welcomeStart && welcomeScreen) {
    welcomeStart.addEventListener("click", function () {

        welcomeScreen.classList.add("is-hidden");

        const lanyard = document.querySelector(".lanyard");

        if (lanyard) {
            lanyard.classList.remove("play-drop");

            // Restart the animation
            void lanyard.offsetWidth;

            lanyard.classList.add("play-drop");
        }

        window.scrollTo(0, 0);
    });
}

// Theme button on welcome screen
if (welcomeThemeButton) {
    updateWelcomeThemeButton();

    welcomeThemeButton.addEventListener("click", function () {
        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("portfolio-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("portfolio-theme", "dark");
        }

        updateThemeButton();
        updateWelcomeThemeButton();
    });
}