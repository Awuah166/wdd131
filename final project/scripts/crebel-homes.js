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

// Featured Gallery with Lazy Loading
class FeaturedGallery {
    constructor() {
        this.galleryData = [
            {
                id: 1,
                title: "Luxury Penthouse",
                description: "Stunning city views with modern amenities",
                imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center",
                price: "$950,000",
                priceNumeric: 950000,
                location: "Downtown Accra",
                bedrooms: 3,
                type: "rent"
            },
            {
                id: 2,
                title: "Modern Family Villa",
                description: "Spacious 4BR home with garden and pool",
                imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center",
                price: "$750,000",
                priceNumeric: 750000,
                location: "East Legon",
                bedrooms: 4,
                type: "rent"
            },
            {
                id: 3,
                title: "Cozy Apartment",
                description: "Perfect starter home in great neighborhood",
                imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&crop=center",
                price: "$320,000",
                priceNumeric: 320000,
                location: "Cantonments",
                bedrooms: 2,
                type: "rent"
            },
            {
                id: 4,
                title: "Executive Townhouse",
                description: "Contemporary design with premium finishes",
                imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
                price: "$580,000",
                priceNumeric: 580000,
                location: "Airport Hills",
                bedrooms: 3,
                type: "rent"
            },
            {
                id: 5,
                title: "Beachfront Cottage",
                description: "Serene coastal living with ocean views",
                imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center",
                price: "$680,000",
                priceNumeric: 680000,
                location: "Tema Coast",
                bedrooms: 3,
                type: "rent"
            },
            {
                id: 6,
                title: "Garden Estate Home",
                description: "Elegant home with lush landscaping",
                imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop&crop=center",
                price: "$480,000",
                priceNumeric: 480000,
                location: "Adenta",
                bedrooms: 4,
                type: "rent"
            }
        ];
        
        this.observer = null;
        this.init();
    }

    init() {
        this.createGallery();
        this.setupLazyLoading();
    }

    createGallery() {
        const gallerySection = document.getElementById('featuredGallery');
        if (!gallerySection) return;

        // Create gallery HTML structure
        const galleryHTML = `
            <div class="gallery-header">
                <h2>Rent</h2>
            </div>
            <div class="gallery-grid" id="galleryGrid">
                ${this.generateGalleryItems()}
            </div>
        `;

        gallerySection.innerHTML = galleryHTML;
    }

    generateGalleryItems() {
        return this.galleryData.map(property => `
            <div class="gallery-item loading" data-property-id="${property.id}">
                <img 
                    data-src="${property.imageUrl}" 
                    alt="${property.title}"
                    class="lazy-image"
                    loading="lazy"
                >
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${property.title}</h3>
                        <p>${property.description}</p>
                        <p><strong>${property.price}</strong> • ${property.bedrooms} BR • ${property.location}</p>
                        <button class="view-property-btn" onclick="viewPropertyDetails(${property.id})">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="loading-text">Loading...</div>
            </div>
        `).join('');
    }

    setupLazyLoading() {
        // Create intersection observer for lazy loading
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '100px', // Start loading 100px before the image enters viewport
            threshold: 0.1
        });

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => {
            this.observer.observe(img);
        });
    }

    loadImage(img) {
        const galleryItem = img.closest('.gallery-item');
        const loadingText = galleryItem.querySelector('.loading-text');
        
        // Show loading state
        loadingText.textContent = 'Loading image...';
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = img.dataset.src;
            img.classList.add('loaded');
            galleryItem.classList.remove('loading');
            
            // Add a small delay for smooth transition
            setTimeout(() => {
                if (loadingText) {
                    loadingText.style.display = 'none';
                }
            }, 300);
        };
        
        imageLoader.onerror = () => {
            // Handle loading error
            loadingText.textContent = 'Failed to load image';
            galleryItem.classList.remove('loading');
            
            // Set a fallback image or placeholder
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23f0f0f0"/><text x="400" y="300" font-family="Arial" font-size="24" fill="%23999" text-anchor="middle">🏠 Property Image</text></svg>';
            img.classList.add('loaded');
            
            setTimeout(() => {
                if (loadingText) {
                    loadingText.style.display = 'none';
                }
            }, 300);
        };
        
        // Start loading the image
        imageLoader.src = img.dataset.src;
    }
}

// View property details function
function viewPropertyDetails(propertyId) {
    // Redirect to properties page with property ID
    window.location.href = `properties.html?id=${propertyId}`;
}

// Initialize featured gallery
let featuredGallery;

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
    console.log('toggleMenu called');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    let navOverlay = document.querySelector('.nav-overlay');
    
    // Create overlay if it doesn't exist
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
        
        // Add click event to close menu when clicking overlay
        navOverlay.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    console.log('Elements found:', { navLinks, hamburger, navOverlay });
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        console.log('Menu toggled - Active states:', {
            navLinksActive: navLinks.classList.contains('active'),
            hamburgerActive: hamburger.classList.contains('active'),
            overlayActive: navOverlay.classList.contains('active')
        });
    } else {
        console.error('Missing elements for hamburger menu');
    }
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
    // Get all properties from both rent and buy sections
    const featuredGallery = window.featuredGalleryInstance || { galleryData: [] };
    const buySection = window.buySectionInstance || { buyData: [] };
    
    // Combine all properties and normalize data structure
    const allProperties = [
        // Rent properties (from featured gallery)
        ...featuredGallery.galleryData.map(property => ({
            id: property.id,
            title: property.title,
            type: getPropertyTypeFromTitle(property.title),
            bedrooms: property.bedrooms,
            price: property.priceNumeric || parsePrice(property.price),
            location: property.location,
            image: property.imageUrl,
            features: ["Modern Amenities", "Great Location", "Quality Finishes"],
            category: "rent"
        })),
        
        // Buy properties
        ...buySection.buyData.map(property => ({
            id: property.id,
            title: property.title,
            type: getPropertyTypeFromTitle(property.title),
            bedrooms: property.bedrooms,
            price: property.price,
            location: property.location,
            image: property.image,
            features: ["Premium Features", "Investment Opportunity", "Prime Location"],
            category: "buy"
        }))
    ];
    
    // Filter properties based on search criteria
    let filteredProperties = allProperties;
    
    // Filter by location/keywords
    if (searchData.location) {
        const searchTerm = searchData.location.toLowerCase();
        filteredProperties = filteredProperties.filter(p => 
            p.location.toLowerCase().includes(searchTerm) ||
            p.title.toLowerCase().includes(searchTerm) ||
            p.type.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by property type
    if (searchData.propertyType) {
        filteredProperties = filteredProperties.filter(p => 
            p.type.toLowerCase().includes(searchData.propertyType.toLowerCase())
        );
    }
    
    // Filter by bedrooms
    if (searchData.bedrooms) {
        const bedroomNum = parseInt(searchData.bedrooms);
        filteredProperties = filteredProperties.filter(p => 
            bedroomNum === 4 ? p.bedrooms >= 4 : p.bedrooms === bedroomNum
        );
    }
    
    // Filter by price range
    if (searchData.priceRange) {
        const [min, max] = searchData.priceRange.split('-').map(p => parseInt(p.replace('+', '')));
        filteredProperties = filteredProperties.filter(p => {
            if (searchData.priceRange.includes('+')) {
                return p.price >= min;
            }
            return p.price >= min && p.price <= max;
        });
    }
    
    return filteredProperties;
}

// Helper function to extract property type from title
function getPropertyTypeFromTitle(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('apartment') || titleLower.includes('penthouse')) return 'apartment';
    if (titleLower.includes('villa')) return 'villa';
    if (titleLower.includes('condo')) return 'condo';
    if (titleLower.includes('townhouse')) return 'townhouse';
    if (titleLower.includes('cottage') || titleLower.includes('house') || titleLower.includes('home') || titleLower.includes('estate') || titleLower.includes('mansion')) return 'house';
    return 'house'; // default
}

// Helper function to parse price string to number
function parsePrice(priceString) {
    return parseInt(priceString.replace(/[$,]/g, ''));
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
    // Redirect to properties page with property ID
    window.location.href = `properties.html?id=${propertyId}`;
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
    console.log('DOM loaded - hamburger element:', hamburger);
    if (hamburger) {
        console.log('Adding click event listener to hamburger');
        hamburger.addEventListener('click', function(e) {
            console.log('Hamburger clicked!', e);
            toggleMenu();
        });
    } else {
        console.error('Hamburger element not found in DOM');
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
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
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
            document.body.classList.remove('menu-open');
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Buy Section Class
class BuySection {
    constructor() {
        this.buyData = [
            {
                id: 7,
                title: "Executive Mansion",
                price: 1250000,
                location: "East Legon Hills",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center",
                bedrooms: 5,
                type: "buy"
            },
            {
                id: 8,
                title: "Modern Villa",
                price: 980000,
                location: "Cantonments",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center",
                bedrooms: 4,
                type: "buy"
            },
            {
                id: 9,
                title: "Luxury Condo",
                price: 750000,
                location: "Airport Residential",
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&crop=center",
                bedrooms: 3,
                type: "buy"
            },
            {
                id: 10,
                title: "Family Estate",
                price: 650000,
                location: "Adenta",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center",
                bedrooms: 4,
                type: "buy"
            }
        ];
        
        this.createBuySection();
        this.setupLazyLoading();
    }
    
    createBuySection() {
        const buySection = document.getElementById('buySection');
        if (!buySection) return;
        
        // Create buy section HTML structure
        const buyHTML = `
            <div class="buy-header">
                <h2>Buy</h2>
            </div>
            <div class="buy-grid" id="buyGrid">
                ${this.generateBuyItems()}
            </div>
        `;
        
        buySection.innerHTML = buyHTML;
    }
    
    generateBuyItems() {
        return this.buyData.map(property => `
            <div class="buy-item loading" data-property-id="${property.id}">
                <img 
                    data-src="${property.image}" 
                    alt="${property.title}"
                    class="lazy-image"
                    loading="lazy"
                >
                <div class="buy-overlay">
                    <div class="buy-info">
                        <h3>${property.title}</h3>
                        <p>${property.bedrooms} BR • ${property.location}</p>
                        <div class="price">$${property.price.toLocaleString()}</div>
                        <a href="properties.html?id=${property.id}" class="view-details-btn">View Details</a>
                    </div>
                </div>
                <div class="loading-text">Loading...</div>
            </div>
        `).join('');
    }

    setupLazyLoading() {
        // Create intersection observer for lazy loading
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all buy items
        document.querySelectorAll('.buy-item.loading').forEach(item => {
            this.observer.observe(item);
        });
    }

    loadImage(buyItem) {
        const img = buyItem.querySelector('.lazy-image');
        const loadingText = buyItem.querySelector('.loading-text');
        
        if (img && img.dataset.src) {
            img.onload = () => {
                img.classList.add('loaded');
                buyItem.classList.remove('loading');
                if (loadingText) {
                    loadingText.style.display = 'none';
                }
            };
            
            img.onerror = () => {
                buyItem.classList.remove('loading');
                if (loadingText) {
                    loadingText.textContent = 'Failed to load';
                    loadingText.style.color = '#999';
                }
            };
            
            img.src = img.dataset.src;
        }
    }
}

// Initialize Buy Section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sections and store global references for search functionality
    window.featuredGalleryInstance = new FeaturedGallery();
    window.buySectionInstance = new BuySection();
    window.mapInstance = new PropertyMap();
});

// Property Map Class
class PropertyMap {
    constructor() {
        this.accraCoordinates = {
            lat: 5.6037,
            lng: -0.1870
        };
        
        this.locationCoordinates = {
            "Downtown Accra": { lat: 5.5502, lng: -0.2174 },
            "East Legon": { lat: 5.6507, lng: -0.1286 },
            "Cantonments": { lat: 5.5679, lng: -0.1986 },
            "Airport Hills": { lat: 5.6047, lng: -0.1435 },
            "Tema Coast": { lat: 5.6698, lng: 0.0173 },
            "Adenta": { lat: 5.7095, lng: -0.1578 },
            "East Legon Hills": { lat: 5.6580, lng: -0.1200 },
            "Airport Residential": { lat: 5.6100, lng: -0.1400 }
        };
        
        this.createMap();
    }
    
    createMap() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;
        
        // Create real map HTML structure with Leaflet
        const mapHTML = `
            <div class="real-map-container">
                <div class="map-header-overlay">
                    <h3>🌍 Our Properties in Accra, Ghana</h3>
                    <p>Explore our premium properties across Accra's most desirable neighborhoods</p>
                </div>
                <div id="leafletMap" class="leaflet-map"></div>
                <div class="map-legend">
                    <div class="legend-item">
                        <span class="legend-color rent"></span>
                        <span>Available for Rent</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color buy"></span>
                        <span>Available for Sale</span>
                    </div>
                </div>
            </div>
        `;
        
        mapContainer.innerHTML = mapHTML;
        this.initializeLeafletMap();
        this.addMapInteractivity();
    }
    
    initializeLeafletMap() {
        // Load Leaflet CSS and JS if not already loaded
        if (!window.L) {
            this.loadLeafletLibrary().then(() => {
                this.createLeafletMap();
            });
        } else {
            this.createLeafletMap();
        }
    }
    
    loadLeafletLibrary() {
        return new Promise((resolve) => {
            // Load CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(cssLink);
            
            // Load JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }
    
    createLeafletMap() {
        const mapElement = document.getElementById('leafletMap');
        if (!mapElement || !window.L) return;
        
        // Initialize map
        const map = L.map('leafletMap').setView([this.accraCoordinates.lat, this.accraCoordinates.lng], 11);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add property markers
        this.addPropertyMarkers(map);
        
        // Store map reference
        this.map = map;
    }
    
    addPropertyMarkers(map) {
        const allProperties = [
            ...window.featuredGalleryInstance.galleryData,
            ...window.buySectionInstance.buyData
        ];
        
        allProperties.forEach(property => {
            const coords = this.locationCoordinates[property.location];
            if (!coords) return;
            
            const price = property.priceNumeric || property.price;
            const formattedPrice = typeof price === 'number' ? 
                `$${price.toLocaleString()}` : price;
            
            // Create custom marker icon
            const markerIcon = L.divIcon({
                className: `custom-marker ${property.type}`,
                html: `<div class="marker-content">
                         <span class="marker-number">${property.bedrooms}</span>
                       </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            // Create marker
            const marker = L.marker([coords.lat, coords.lng], { icon: markerIcon }).addTo(map);
            
            // Create popup content
            const popupContent = `
                <div class="marker-popup">
                    <h4>${property.title}</h4>
                    <p><strong>💰 ${formattedPrice}</strong></p>
                    <p>🛏️ ${property.bedrooms} Bedrooms</p>
                    <p>📍 ${property.location}</p>
                    <p>🏷️ ${property.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                    <button onclick="window.mapInstance.showPropertyDetails('${property.id}')" class="popup-btn">
                        View Details
                    </button>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
    }
    
    generateLocationList() {
        const allProperties = [
            ...window.featuredGalleryInstance.galleryData,
            ...window.buySectionInstance.buyData
        ];
        
        // Group properties by location
        const locationGroups = {};
        allProperties.forEach(property => {
            if (!locationGroups[property.location]) {
                locationGroups[property.location] = [];
            }
            locationGroups[property.location].push(property);
        });
        
        return Object.entries(locationGroups).map(([location, properties]) => {
            const rentProperties = properties.filter(p => p.type === 'rent');
            const buyProperties = properties.filter(p => p.type === 'buy');
            
            return `
                <div class="location-group" data-location="${location}">
                    <h4>📍 ${location}</h4>
                    <div class="location-stats">
                        ${rentProperties.length > 0 ? `<span class="stat rent-stat">${rentProperties.length} for Rent</span>` : ''}
                        ${buyProperties.length > 0 ? `<span class="stat buy-stat">${buyProperties.length} for Sale</span>` : ''}
                    </div>
                    <div class="location-properties">
                        ${properties.map(property => {
                            const price = property.priceNumeric || property.price;
                            const formattedPrice = typeof price === 'number' ? 
                                `$${price.toLocaleString()}` : price;
                            return `
                                <div class="location-property ${property.type}" onclick="window.mapInstance.showPropertyDetails('${property.id}')">
                                    <span class="property-title">${property.title}</span>
                                    <span class="property-price">${formattedPrice}</span>
                                    <span class="property-beds">🛏️ ${property.bedrooms} BR</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    addMapInteractivity() {
        // Add hover effects to location groups
        const locationGroups = document.querySelectorAll('.location-group');
        locationGroups.forEach(group => {
            group.addEventListener('mouseenter', () => {
                group.classList.add('highlighted');
            });
            
            group.addEventListener('mouseleave', () => {
                group.classList.remove('highlighted');
            });
        });
    }
    
    generateMarkers() {
        const allProperties = [
            ...window.featuredGalleryInstance.galleryData,
            ...window.buySectionInstance.buyData
        ];
        
        return allProperties.map(property => {
            const location = this.mapLocations[property.location];
            if (!location) return '';
            
            const price = property.priceNumeric || property.price;
            const formattedPrice = typeof price === 'number' ? 
                `$${price.toLocaleString()}` : price;
            
            return `
                <div class="property-marker ${property.type}" 
                     style="left: ${location.x}%; top: ${location.y}%;"
                     data-property-id="${property.id}"
                     onclick="window.mapInstance.showPropertyDetails('${property.id}')">
                    ${property.bedrooms}
                    <div class="marker-tooltip">
                        ${property.title}<br>
                        ${formattedPrice} • ${property.bedrooms} BR<br>
                        📍 ${property.location}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    showPropertyDetails(propertyId) {
        // Redirect to properties page with property ID
        window.location.href = `properties.html?id=${propertyId}`;
    }
}

// About page animations and responsive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Animate elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            const animatedElements = document.querySelectorAll('.about-section, .service-item, .stat-item, .testimonial-card, .team-member');
            animatedElements.forEach(el => {
                el.classList.add('animate-element');
                observer.observe(el);
            });

            // Animated counters for statistics
            const statNumbers = document.querySelectorAll('.stat-item h4');
            const animateCounter = (element, target) => {
                const increment = target / 100;
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 20);
            };

            // Trigger counter animation when stats section is visible
            const statsSection = document.querySelector('.stats-grid');
            if (statsSection) {
                const statsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            statNumbers.forEach(stat => {
                                const text = stat.textContent;
                                const number = parseInt(text.replace(/\D/g, ''));
                                animateCounter(stat, number);
                            });
                            statsObserver.unobserve(entry.target);
                        }
                    });
                });
                statsObserver.observe(statsSection);
            }

            // Progressive rating bar animation
            const ratingBars = document.querySelectorAll('.rating-bar .fill');
            const ratingsSection = document.querySelector('.rating-breakdown');
            if (ratingsSection) {
                const ratingsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            ratingBars.forEach((bar, index) => {
                                setTimeout(() => {
                                    bar.style.transition = 'width 1s ease-out';
                                    bar.style.width = bar.style.width; // Trigger animation
                                }, index * 200);
                            });
                            ratingsObserver.unobserve(entry.target);
                        }
                    });
                });
                ratingsObserver.observe(ratingsSection);
            }

            // Testimonial card hover effects
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            testimonialCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Set current year in footer
            const yearElement = document.getElementById('currentYear');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        });