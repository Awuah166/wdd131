// Slideshow functionality
let currentSlideIndex = 0;
let slideInterval;

// Get DOM elements
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Auto-advance slideshow
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

// Manual slide change (called by arrow buttons)
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
    resetSlideInterval(); // Reset auto-advance timer
}

// Go to specific slide (called by dot indicators)
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetSlideInterval(); // Reset auto-advance timer
}

// Start slideshow interval
function startSlideshow() {
    slideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds
}

// Reset slideshow interval
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Dropdown functionality for mobile
function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const dropdown = event.target.closest('.dropdown');
        dropdown.classList.toggle('active');
    }
}

// Enhanced Search functionality with modal interface
function handleSearch() {
    createSearchModal();
}

// Quick search function for simple queries
function quickSearch() {
    const searchQuery = prompt(`🏠 CREBEL HOMES - Quick Search
    
Enter your search criteria:
• Location (city, neighborhood)
• Property type (house, apartment, etc.)
• Keywords

What are you looking for?`);
    
    if (searchQuery && searchQuery.trim() !== '') {
        performSearch({
            location: searchQuery.trim(),
            propertyType: '',
            priceRange: '',
            bedrooms: ''
        });
    }
}

// Enhanced search results with dynamic content
function showSearchResults(searchData) {
    // Close the search modal first
    closeSearchModal();
    
    // Create sample properties based on search criteria
    const properties = generateSampleProperties(searchData);
    
    // Create results modal
    createSearchResultsModal(properties, searchData);
}

// Generate sample properties based on search criteria
function generateSampleProperties(searchData) {
    const allProperties = [
        {
            id: 1,
            title: "Modern Downtown Apartment",
            type: "apartment",
            bedrooms: 2,
            price: 320000,
            location: "Downtown",
            image: "apartment1.jpg",
            features: ["Gym", "Pool", "Parking", "24/7 Security"]
        },
        {
            id: 2,
            title: "Luxury Family Villa",
            type: "villa",
            bedrooms: 4,
            price: 750000,
            location: "Suburbs",
            image: "villa1.jpg",
            features: ["Garden", "Garage", "Fireplace", "Study Room"]
        },
        {
            id: 3,
            title: "Cozy Studio Condo",
            type: "condo",
            bedrooms: 1,
            price: 180000,
            location: "City Center",
            image: "condo1.jpg",
            features: ["Balcony", "Gym", "Rooftop Access"]
        },
        {
            id: 4,
            title: "Spacious 3BR House",
            type: "house",
            bedrooms: 3,
            price: 450000,
            location: "Residential Area",
            image: "house1.jpg",
            features: ["Backyard", "Garage", "Office", "Storage"]
        },
        {
            id: 5,
            title: "Executive Penthouse",
            type: "apartment",
            bedrooms: 3,
            price: 950000,
            location: "Downtown",
            image: "penthouse1.jpg",
            features: ["City View", "Terrace", "Concierge", "Wine Cellar"]
        },
        {
            id: 6,
            title: "Charming Townhouse",
            type: "townhouse",
            bedrooms: 2,
            price: 380000,
            location: "Historic District",
            image: "townhouse1.jpg",
            features: ["Patio", "Fireplace", "Updated Kitchen"]
        }
    ];
    
    // Filter properties based on search criteria
    let filteredProperties = allProperties;
    
    if (searchData.propertyType) {
        filteredProperties = filteredProperties.filter(p => 
            p.type.toLowerCase() === searchData.propertyType.toLowerCase()
        );
    }
    
    if (searchData.bedrooms) {
        const bedroomNum = parseInt(searchData.bedrooms);
        filteredProperties = filteredProperties.filter(p => 
            bedroomNum === 4 ? p.bedrooms >= 4 : p.bedrooms === bedroomNum
        );
    }
    
    if (searchData.priceRange) {
        const [min, max] = searchData.priceRange.split('-').map(p => parseInt(p.replace('+', '')));
        filteredProperties = filteredProperties.filter(p => {
            if (searchData.priceRange.includes('+')) {
                return p.price >= min;
            }
            return p.price >= min && p.price <= max;
        });
    }
    
    if (searchData.location) {
        const searchTerm = searchData.location.toLowerCase();
        filteredProperties = filteredProperties.filter(p => 
            p.location.toLowerCase().includes(searchTerm) ||
            p.title.toLowerCase().includes(searchTerm) ||
            p.type.toLowerCase().includes(searchTerm)
        );
    }
    
    return filteredProperties;
}

// Create enhanced search results modal
function createSearchResultsModal(properties, searchData) {
    // Remove any existing results modal
    const existingModal = document.querySelector('.search-results-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const resultsCount = properties.length;
    const searchSummary = generateSearchSummary(searchData);
    
    const modalHTML = `
    <div class="search-modal search-results-modal" id="searchResultsModal">
        <div class="search-modal-content" style="max-width: 900px;">
            <div class="search-modal-header">
                <h2>🏠 Search Results</h2>
                <button class="close-modal" onclick="closeSearchResultsModal()">×</button>
            </div>
            
            <div class="search-summary">
                <p><strong>Found ${resultsCount} ${resultsCount === 1 ? 'property' : 'properties'}</strong> ${searchSummary}</p>
                <button class="new-search-btn" onclick="closeSearchResultsModal(); handleSearch();">🔍 New Search</button>
            </div>
            
            <div class="properties-grid">
                ${properties.length > 0 ? generatePropertyCards(properties) : generateNoResultsMessage(searchData)}
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close modal when clicking outside
    const modal = document.getElementById('searchResultsModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSearchResultsModal();
        }
    });
}

// Generate search summary text
function generateSearchSummary(searchData) {
    const criteria = [];
    
    if (searchData.location) criteria.push(`location: "${searchData.location}"`);
    if (searchData.propertyType) criteria.push(`type: ${searchData.propertyType}`);
    if (searchData.bedrooms) criteria.push(`${searchData.bedrooms}${searchData.bedrooms === '4' ? '+' : ''} bedrooms`);
    if (searchData.priceRange) {
        const range = searchData.priceRange.replace('-', ' - $').replace('+', '+');
        criteria.push(`price: $${range}`);
    }
    
    return criteria.length > 0 ? `matching ${criteria.join(', ')}` : '';
}

// Generate property cards HTML
function generatePropertyCards(properties) {
    return properties.map(property => `
        <div class="property-card" onclick="showPropertyDetails(${property.id})">
            <div class="property-image">
                <div class="property-placeholder-img">🏠</div>
                <div class="property-price">$${property.price.toLocaleString()}</div>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <p class="property-details">${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'} • ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
                <div class="property-features">
                    ${property.features.slice(0, 3).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <button class="view-details-btn">View Details</button>
            </div>
        </div>
    `).join('');
}

// Generate no results message
function generateNoResultsMessage(searchData) {
    return `
        <div class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>No properties found</h3>
            <p>We couldn't find any properties matching your criteria.</p>
            <div class="suggestions">
                <h4>Try:</h4>
                <ul>
                    <li>Broadening your location search</li>
                    <li>Adjusting your price range</li>
                    <li>Removing some filters</li>
                    <li>Searching for different property types</li>
                </ul>
            </div>
        </div>
    `;
}

// Close search results modal
function closeSearchResultsModal() {
    const modal = document.getElementById('searchResultsModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// Show individual property details
function showPropertyDetails(propertyId) {
    alert(`🏠 Property Details\n\nProperty ID: ${propertyId}\n\nThis would normally show detailed property information, photos, virtual tour, contact form, etc.\n\nIn a real application, this would open a detailed property page or modal.`);
}

// Enhanced search form submission
function handleSearchSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchData = {
        location: formData.get('location') || '',
        propertyType: formData.get('propertyType') || '',
        priceRange: formData.get('priceRange') || '',
        bedrooms: formData.get('bedrooms') || ''
    };
    
    performSearch(searchData);
}

// Perform search with loading animation
function performSearch(searchData) {
    // Show loading state
    showSearchLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        showSearchResults(searchData);
    }, 1500);
}

// Show search loading modal
function showSearchLoading() {
    const existingModal = document.querySelector('.search-loading-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const loadingHTML = `
    <div class="search-modal search-loading-modal" id="searchLoadingModal">
        <div class="search-modal-content" style="max-width: 400px; text-align: center;">
            <div class="loading-content">
                <div class="loading-spinner">🔍</div>
                <h3>Searching Properties...</h3>
                <p>Finding the best matches for you</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

// Create search modal
function createSearchModal(){
    const existingModal = document.querySelector('.search-modal');
    if (existingModal) {
        existingModal.remove(); // Remove existing modal if it exists
    }

    // Create Modal HTML
    const modalHTML = `
    <div class="search-modal" id="searchModal">
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h2>🏠 Search Properties</h2>
                <button class="close-modal" onclick="closeSearchModal()">×</button>
            </div>
            <form class="search-modal-form" id="searchForm">
                    <div class="search-input-group">
                        <label for="location">Location or Keywords</label>
                        <input type="text" id="location" name="location" placeholder="Enter city, neighborhood, or property type">
                    </div>

                    <div class="search-filters-row">
                        <div class="filter-group">
                            <label for="propertyType">Property Type</label>
                            <select id="propertyType" name="propertyType">
                                <option value="">Any</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="condo">Condo</option>
                                <option value="villa">Villa</option>
                                <option value="townhouse">Townhouse</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="priceRange">Price Range</label>
                            <select id="priceRange" name="priceRange">
                                <option value="">Any</option>
                                <option value="0-200000">Under $200,000</option>
                                <option value="200000-500000">$200,000 - $500,000</option>
                                <option value="500000-1000000">$500,000 - $1,000,000</option>
                                <option value="1000000+">Over $1,000,000</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="bedrooms">Bedrooms</label>
                            <select id="bedrooms" name="bedrooms">
                                <option value="">Any</option>
                                <option value="1">1 Bedroom</option>
                                <option value="2">2 Bedrooms</option>
                                <option value="3">3 Bedrooms</option>
                                <option value="4">4+ Bedrooms</option>
                            </select>
                        </div>
                    </div>

                    <div class="search-buttons">
                        <button type="button" class="clear-btn" onclick="clearSearchForm()">Clear</button>
                        <button type="submit" class="search-submit-btn">🔍 Search Properties</button>
                    </div>
            </form>
        </div>
    </div>
    `;

    //Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listeners
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearchSubmit);

    // Close modal when clicking outside
    const modal = document.getElementById('searchModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSearchModal();
        }
    });

    // Focus on first input
    document.getElementById('location').focus();
    
}

// Close search modal
function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// Clear search form
function clearSearchForm() {
    document.getElementById('searchForm').reset();
    document.getElementById('location').focus();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-slideshow only if slides exist
    if (slides.length > 0) {
        startSlideshow();
    }
    
    // Add event listener for hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Add event listener for dropdown toggle on mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', toggleDropdown);
    }
    
    // Add event listener for nav search icon
    const navSearchIcon = document.querySelector('.nav-search .search-btn');
    if (navSearchIcon) {
        navSearchIcon.addEventListener('click', handleSearch);
    }
    
    // Add event listener for hero search button
    const heroSearchBtn = document.getElementById('hero-search-btn');
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', handleSearch);
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Pause slideshow when user interacts with controls
    const controls = document.querySelector('.slideshow-controls');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    
    if (controls) {
        controls.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        controls.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
    
    if (indicatorsContainer) {
        indicatorsContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        indicatorsContainer.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
    
    // Add keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});