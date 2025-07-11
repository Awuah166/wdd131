document.addEventListener("DOMContentLoaded", function() {
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

// Hamburger menu functionality
    const menubutton = document.querySelector('.menubutton');
    const menuitems = document.querySelector('.menuitems');

    if (menubutton && menuitems) {
        menubutton.addEventListener('click', () => {
            menuitems.classList.toggle('open');
            // Toggle hamburger/close icon
            if (menuitems.classList.contains('open')) {
                menubutton.textContent = '✖'; // Close icon
                menubutton.setAttribute('aria-label', 'Close Menu');
            } else {
                menubutton.textContent = '☰'; // Hamburger icon
                menubutton.setAttribute('aria-label', 'Open Menu');
            }
    });
}