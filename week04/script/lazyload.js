// Footer Styling using JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    
    if (footer) {
        // Apply styles to the footer
        footer.style.backgroundColor = '#333';
        footer.style.color = 'white';
        footer.style.padding = '20px';
        footer.style.textAlign = 'center';
        footer.style.fontSize = '50px';
        footer.style.fontFamily = 'Arial, sans-serif';
        footer.style.borderTop = '3px solid #555';
        footer.style.position = 'relative';
        footer.style.bottom = '0';
        footer.style.width = '100%';
        footer.style.boxSizing = 'border-box';
    }
});