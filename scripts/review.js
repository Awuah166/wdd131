document.addEventListener('DOMContentLoaded', function() {
    // Update footer information
    updateFooter();
    
    // Update review counter and display review summary
    updateReviewCounter();
    displayReviewSummary();
});

function updateFooter() {
    // Update current year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Update last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function updateReviewCounter() {
    // Get current count from localStorage, default to 0 if not exists
    let reviewCount = localStorage.getItem('reviewCount');
    
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }
    
    // Increment the counter
    reviewCount++;
    
    // Store the updated count back to localStorage
    localStorage.setItem('reviewCount', reviewCount);
    
    // Display the counter on the page
    const countElement = document.getElementById('review-count');
    if (countElement) {
        countElement.textContent = reviewCount;
    }
    
    console.log(`Review counter updated: ${reviewCount}`);
}

function displayReviewSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryContainer = document.getElementById('review-summary');
    
    if (urlParams.has('product-name') && urlParams.get('product-name')) {
        let summaryHTML = '<div class="review-details"><h3>Review Details:</h3>';
        
        // Product name
        if (urlParams.get('product-name')) {
            summaryHTML += `<p><strong>Product:</strong> ${urlParams.get('product-name')}</p>`;
        }
        
        // Rating
        if (urlParams.get('rating')) {
            const rating = urlParams.get('rating');
            const stars = '☆'.repeat(parseInt(rating));
            summaryHTML += `<p><strong>Rating:</strong> ${rating}/5 ${stars}</p>`;
        }
        
        // Installation date
        if (urlParams.get('install-date')) {
            const date = new Date(urlParams.get('install-date'));
            const formattedDate = date.toLocaleDateString();
            summaryHTML += `<p><strong>Installation Date:</strong> ${formattedDate}</p>`;
        }
        
        // Features
        const features = urlParams.getAll('features');
        if (features.length > 0) {
            summaryHTML += `<p><strong>Useful Features:</strong> ${features.join(', ')}</p>`;
        }
        
        // Written review
        if (urlParams.get('written-review')) {
            summaryHTML += `<p><strong>Review:</strong> "${urlParams.get('written-review')}"</p>`;
        }
        
        // User name
        if (urlParams.get('user-name')) {
            summaryHTML += `<p><strong>Reviewer:</strong> ${urlParams.get('user-name')}</p>`;
        }
        
        summaryHTML += '</div>';
        summaryContainer.innerHTML = summaryHTML;
    }
}
