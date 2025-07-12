document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navigation');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            // Accessibility
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
        });
    }

    // Footer year and last modified
    const footer = document.querySelector("footer");
    if (footer) {
        const year = new Date().getFullYear();
        const paragraphs = footer.querySelectorAll("p");
        if (paragraphs[0]) {
            paragraphs[0].innerHTML = `&copy; ${year} Awuah Dennis. All rights reserved.`;
        }
        if (paragraphs[1]) {
            paragraphs[1].textContent = `Last Modified: ${document.lastModified}`;
        }
    }
});