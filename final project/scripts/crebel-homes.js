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
                location: "Downtown Accra"
            },
            {
                id: 2,
                title: "Modern Family Villa",
                description: "Spacious 4BR home with garden and pool",
                imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center",
                price: "$750,000",
                location: "East Legon"
            },
            {
                id: 3,
                title: "Cozy Apartment",
                description: "Perfect starter home in great neighborhood",
                imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&crop=center",
                price: "$320,000",
                location: "Cantonments"
            },
            {
                id: 4,
                title: "Executive Townhouse",
                description: "Contemporary design with premium finishes",
                imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
                price: "$580,000",
                location: "Airport Hills"
            },
            {
                id: 5,
                title: "Beachfront Cottage",
                description: "Serene coastal living with ocean views",
                imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center",
                price: "$680,000",
                location: "Tema Coast"
            },
            {
                id: 6,
                title: "Garden Estate Home",
                description: "Elegant home with lush landscaping",
                imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop&crop=center",
                price: "$480,000",
                location: "Adenta"
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
                        <p><strong>${property.price}</strong> • ${property.location}</p>
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
    const property = featuredGallery.galleryData.find(p => p.id === propertyId);
    if (property) {
        alert(`🏠 ${property.title}

${property.description}

💰 Price: ${property.price}
📍 Location: ${property.location}

This would normally open a detailed property page with:
• High-resolution photo gallery
• Property specifications
• Virtual tour
• Contact form
• Mortgage calculator
• Neighborhood information

Contact us for more details!`);
    }
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
    
    // Initialize featured gallery with lazy loading
    featuredGallery = new FeaturedGallery();
    
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

// Buy Section Class
class BuySection {
    constructor() {
        this.buyData = [
            {
                id: 7,
                title: "Executive Mansion",
                price: 1250000,
                location: "East Legon Hills",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center"
            },
            {
                id: 8,
                title: "Modern Villa",
                price: 980000,
                location: "Cantonments",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center"
            },
            {
                id: 9,
                title: "Luxury Condo",
                price: 750000,
                location: "Airport Residential",
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&crop=center"
            },
            {
                id: 10,
                title: "Family Estate",
                price: 650000,
                location: "Adenta",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center"
            }
        ];
        
        this.createBuySection();
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
            <div class="buy-item">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="buy-overlay">
                    <div class="buy-info">
                        <h3>${property.title}</h3>
                        <div class="price">$${property.price.toLocaleString()}</div>
                        <a href="buy.html?property=${property.id}" class="view-details-btn">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize Buy Section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize buy section
    new BuySection();
});