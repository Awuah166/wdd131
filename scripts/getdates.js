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