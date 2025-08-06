// Property Details Page JavaScript
class PropertyDetailsPage {
    constructor() {
        this.propertyData = this.getAllProperties();
        this.currentPropertyId = this.getPropertyIdFromUrl();
        this.currentProperty = null;
        this.currentImageIndex = 0;
        
        this.init();
    }
    
    init() {
        if (this.currentPropertyId) {
            this.currentProperty = this.findPropertyById(this.currentPropertyId);
            if (this.currentProperty) {
                this.hideWelcomeSection(); // Hide welcome section when viewing specific property
                this.renderPropertyDetails();
                this.setupImageGallery();
                this.setupVirtualTour();
                this.setupContactForm();
            } else {
                this.showPropertyNotFound();
            }
        } else {
            this.showWelcomeSection(); // Show welcome section when viewing all properties
            this.showAllProperties();
        }
    }
    
    getAllProperties() {
        // Rent properties
        const rentProperties = [
            {
                id: 1,
                title: "Luxury Penthouse",
                description: "Stunning city views with modern amenities",
                imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center",
                price: "$950,000",
                priceNumeric: 950000,
                location: "Downtown Accra",
                bedrooms: 3,
                bathrooms: 2,
                sqft: 2500,
                type: "rent",
                category: "Penthouse",
                yearBuilt: 2020,
                features: [
                    "Floor-to-ceiling windows",
                    "Private balcony with city views",
                    "High-end appliances",
                    "Hardwood flooring",
                    "Central air conditioning",
                    "In-unit laundry",
                    "Parking space included",
                    "24/7 security"
                ],
                neighborhood: {
                    description: "Downtown Accra is the heart of Ghana's capital, offering vibrant city life with easy access to business districts, shopping centers, and cultural attractions.",
                    amenities: [
                        "Shopping malls nearby",
                        "Public transportation",
                        "Restaurants and cafes",
                        "Banks and offices",
                        "Cultural centers",
                        "Hospitals and clinics"
                    ],
                    walkScore: 95
                },
                gallery: [
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop&crop=center"
                ]
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
                bathrooms: 3,
                sqft: 3200,
                type: "rent",
                category: "Villa",
                yearBuilt: 2019,
                features: [
                    "Private swimming pool",
                    "Large garden",
                    "Modern kitchen",
                    "Master suite with walk-in closet",
                    "Two-car garage",
                    "Security system",
                    "Backup generator",
                    "Landscaped grounds"
                ],
                neighborhood: {
                    description: "East Legon is one of Accra's most prestigious residential areas, known for its upscale homes and family-friendly environment.",
                    amenities: [
                        "Top-rated schools",
                        "Upscale shopping",
                        "Golf courses",
                        "Parks and recreation",
                        "Premium healthcare",
                        "Fine dining restaurants"
                    ],
                    walkScore: 75
                },
                gallery: [
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center"
                ]
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
                bathrooms: 1,
                sqft: 1200,
                type: "rent",
                category: "Apartment",
                yearBuilt: 2018,
                features: [
                    "Open floor plan",
                    "Modern appliances",
                    "Balcony",
                    "Assigned parking",
                    "Gym access",
                    "24/7 concierge",
                    "Rooftop terrace",
                    "Pet-friendly"
                ],
                neighborhood: {
                    description: "Cantonments is a diplomatic area with embassies and international organizations, offering a quiet and secure environment.",
                    amenities: [
                        "Embassy quarter",
                        "International schools",
                        "Diplomatic services",
                        "Security presence",
                        "Green spaces",
                        "International restaurants"
                    ],
                    walkScore: 85
                },
                gallery: [
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
                ]
            }
        ];
        
        // Additional rent properties to match index page
        const additionalRentProperties = [
            {
                id: 4,
                title: "Executive Townhouse",
                description: "Contemporary design with premium finishes",
                imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
                price: "$580,000",
                priceNumeric: 580000,
                location: "Airport Hills",
                bedrooms: 3,
                bathrooms: 2,
                sqft: 2200,
                type: "rent",
                category: "Townhouse",
                yearBuilt: 2021,
                features: [
                    "Modern open-plan design",
                    "Premium kitchen appliances",
                    "Private patio",
                    "Two-car garage",
                    "Smart home technology",
                    "Central air conditioning",
                    "Security system",
                    "Community amenities"
                ],
                neighborhood: {
                    description: "Airport Hills is a modern residential area near Kotoka International Airport, offering contemporary living with excellent connectivity.",
                    amenities: [
                        "Airport proximity",
                        "Shopping centers",
                        "Business hotels",
                        "Restaurants",
                        "Medical facilities",
                        "Transportation links"
                    ],
                    walkScore: 70
                },
                gallery: [
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
                ]
            },
            {
                id: 5,
                title: "Beachfront Cottage",
                description: "Serene coastal living with ocean views",
                imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop&crop=center",
                price: "$420,000",
                priceNumeric: 420000,
                location: "Labadi Beach",
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1500,
                type: "rent",
                category: "Cottage",
                yearBuilt: 2019,
                features: [
                    "Ocean views",
                    "Private beach access",
                    "Outdoor deck",
                    "Modern furnishings",
                    "Kitchen with sea view",
                    "Air conditioning",
                    "Parking space",
                    "24/7 security"
                ],
                neighborhood: {
                    description: "Labadi Beach area offers stunning coastal living with direct beach access and vibrant local culture.",
                    amenities: [
                        "Beach access",
                        "Restaurants and bars",
                        "Water sports",
                        "Cultural center",
                        "Local markets",
                        "Tourist attractions"
                    ],
                    walkScore: 80
                },
                gallery: [
                    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&crop=center"
                ]
            },
            {
                id: 6,
                title: "Garden Estate Home",
                description: "Family home with beautiful landscaped gardens",
                imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
                price: "$650,000",
                priceNumeric: 650000,
                location: "Adenta",
                bedrooms: 4,
                bathrooms: 3,
                sqft: 2800,
                type: "rent",
                category: "Estate Home",
                yearBuilt: 2020,
                features: [
                    "Landscaped gardens",
                    "Large living spaces",
                    "Modern kitchen",
                    "Master bedroom suite",
                    "Guest rooms",
                    "Two-car garage",
                    "Security features",
                    "Generator backup"
                ],
                neighborhood: {
                    description: "Adenta is a growing suburban area with family-friendly environment and excellent schools.",
                    amenities: [
                        "Shopping malls",
                        "Schools and colleges",
                        "Healthcare facilities",
                        "Parks and recreation",
                        "Public transportation",
                        "Community centers"
                    ],
                    walkScore: 65
                },
                gallery: [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&crop=center"
                ]
            }
        ];
        
        // Buy properties
        const buyProperties = [
            {
                id: 7,
                title: "Executive Mansion",
                description: "Luxurious estate with premium amenities",
                price: "$1,250,000",
                priceNumeric: 1250000,
                location: "East Legon Hills",
                bedrooms: 5,
                bathrooms: 4,
                sqft: 5000,
                type: "buy",
                category: "Mansion",
                yearBuilt: 2021,
                features: [
                    "Private pool and spa",
                    "Wine cellar",
                    "Home theater",
                    "Chef's kitchen",
                    "Master suite with sitting area",
                    "Guest house",
                    "Three-car garage",
                    "Landscaped gardens",
                    "Security gate",
                    "Backup power system"
                ],
                neighborhood: {
                    description: "East Legon Hills is an exclusive gated community offering luxury living with 24/7 security and premium amenities.",
                    amenities: [
                        "Gated community",
                        "Golf course",
                        "Country club",
                        "Tennis courts",
                        "Spa and fitness center",
                        "Private security",
                        "Concierge services"
                    ],
                    walkScore: 60
                },
                gallery: [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
                ]
            },
            {
                id: 8,
                title: "Modern Villa",
                description: "Contemporary design with smart home features",
                price: "$980,000",
                priceNumeric: 980000,
                location: "Cantonments",
                bedrooms: 4,
                bathrooms: 3,
                sqft: 3800,
                type: "buy",
                category: "Villa",
                yearBuilt: 2020,
                features: [
                    "Smart home automation",
                    "Solar panel system",
                    "Modern kitchen island",
                    "Walk-in closets",
                    "Home office",
                    "Guest suite",
                    "Two-car garage",
                    "Private garden",
                    "Security system"
                ],
                neighborhood: {
                    description: "Prime location in Cantonments with easy access to diplomatic facilities and international amenities.",
                    amenities: [
                        "Embassy district",
                        "International schools",
                        "Medical facilities",
                        "Shopping centers",
                        "Restaurants",
                        "Cultural centers"
                    ],
                    walkScore: 80
                },
                gallery: [
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
                ]
            },
            {
                id: 9,
                title: "Luxury Condo",
                description: "Premium condominium with modern amenities",
                price: "$750,000",
                priceNumeric: 750000,
                location: "Airport Residential",
                bedrooms: 3,
                bathrooms: 2,
                sqft: 2100,
                type: "buy",
                category: "Condominium",
                yearBuilt: 2022,
                features: [
                    "Luxury finishes",
                    "Concierge services",
                    "Fitness center",
                    "Swimming pool",
                    "Rooftop terrace",
                    "Underground parking",
                    "24/7 security",
                    "Smart home features",
                    "City views"
                ],
                neighborhood: {
                    description: "Airport Residential area offers luxury living with convenient access to the airport and business districts.",
                    amenities: [
                        "Airport proximity",
                        "Business centers",
                        "Luxury hotels",
                        "Fine dining",
                        "Shopping malls",
                        "Medical facilities",
                        "International schools"
                    ],
                    walkScore: 85
                },
                gallery: [
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwY29uZG98ZW58MHx8MHx8fDA%3D"
                ]
            },
            {
                id: 10,
                title: "Family Estate",
                description: "Spacious family home with extensive grounds",
                price: "$650,000",
                priceNumeric: 650000,
                location: "Adenta",
                bedrooms: 4,
                bathrooms: 3,
                sqft: 3500,
                type: "buy",
                category: "Estate",
                yearBuilt: 2020,
                features: [
                    "Large compound",
                    "Guest quarters",
                    "Modern kitchen",
                    "Family room",
                    "Study/office",
                    "Landscaped garden",
                    "Security gate",
                    "Generator backup",
                    "Water storage"
                ],
                neighborhood: {
                    description: "Adenta offers affordable family living with good schools and growing infrastructure.",
                    amenities: [
                        "Shopping centers",
                        "Schools",
                        "Healthcare",
                        "Public transport",
                        "Markets",
                        "Recreation centers",
                        "Places of worship"
                    ],
                    walkScore: 70
                },
                gallery: [
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center"
                ]
            }
        ];

        return [...rentProperties, ...additionalRentProperties, ...buyProperties];
    }
    
    getPropertyIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id'));
    }
    
    findPropertyById(id) {
        return this.propertyData.find(property => property.id === id);
    }
    
    renderPropertyDetails() {
        if (!this.currentProperty) return;
        
        document.title = `${this.currentProperty.title} - Crebel Homes`;
        
        const mainContent = document.getElementById('propertyContent');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="property-details-container">
                <!-- Property Header -->
                <div class="property-header">
                    <div class="property-title-section">
                        <h1>${this.currentProperty.title}</h1>
                        <p class="property-location">📍 ${this.currentProperty.location}</p>
                        <div class="property-price-main">${this.currentProperty.price}</div>
                        <div class="property-type-badge ${this.currentProperty.type}">
                            For ${this.currentProperty.type === 'rent' ? 'Rent' : 'Sale'}
                        </div>
                    </div>
                </div>
                
                <!-- Main Property Content -->
                <div class="property-main-content">
                    <!-- Left Column: Images and Gallery -->
                    <div class="property-left-column">
                        <div class="property-image-gallery">
                            <div class="main-image-container">
                                <img id="mainPropertyImage" src="${this.currentProperty.gallery[0]}" alt="${this.currentProperty.title}">
                                <div class="image-navigation">
                                    <button id="prevImage" class="nav-btn prev-btn">‹</button>
                                    <button id="nextImage" class="nav-btn next-btn">›</button>
                                </div>
                                <div class="image-counter">
                                    <span id="currentImageNum">1</span> / <span id="totalImages">${this.currentProperty.gallery.length}</span>
                                </div>
                            </div>
                            
                            <div class="thumbnail-gallery">
                                ${this.currentProperty.gallery.map((image, index) => `
                                    <img src="${image}" 
                                         alt="Property image ${index + 1}" 
                                         class="thumbnail ${index === 0 ? 'active' : ''}"
                                         data-index="${index}"
                                         onclick="propertyDetails.showImage(${index})">
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Virtual Tour -->
                        <div class="virtual-tour-section">
                            <h3>🏠 Virtual Tour</h3>
                            <div class="virtual-tour-container">
                                <div class="tour-placeholder">
                                    <div class="tour-icon">🎥</div>
                                    <h4>360° Virtual Tour</h4>
                                    <p>Experience this property from every angle</p>
                                    <button class="start-tour-btn" onclick="propertyDetails.startVirtualTour()">
                                        Start Virtual Tour
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Property Details -->
                    <div class="property-right-column">
                        <!-- Quick Stats -->
                        <div class="property-quick-stats">
                            <div class="stat">
                                <span class="stat-icon">🛏️</span>
                                <span class="stat-number">${this.currentProperty.bedrooms}</span>
                                <span class="stat-label">Bedrooms</span>
                            </div>
                            <div class="stat">
                                <span class="stat-icon">🚿</span>
                                <span class="stat-number">${this.currentProperty.bathrooms}</span>
                                <span class="stat-label">Bathrooms</span>
                            </div>
                            <div class="stat">
                                <span class="stat-icon">📐</span>
                                <span class="stat-number">${this.currentProperty.sqft.toLocaleString()}</span>
                                <span class="stat-label">Sq Ft</span>
                            </div>
                            <div class="stat">
                                <span class="stat-icon">📅</span>
                                <span class="stat-number">${this.currentProperty.yearBuilt}</span>
                                <span class="stat-label">Year Built</span>
                            </div>
                        </div>
                        
                        <!-- Property Description -->
                        <div class="property-description">
                            <h3>About This Property</h3>
                            <p>${this.currentProperty.description}</p>
                        </div>
                        
                        <!-- Property Features -->
                        <div class="property-features">
                            <h3>Features & Amenities</h3>
                            <div class="features-grid">
                                ${this.currentProperty.features.map(feature => `
                                    <div class="feature-item">
                                        <span class="feature-icon">✓</span>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Contact Form -->
                        <div class="contact-section">
                            <h3>Interested in this property?</h3>
                            <form class="property-contact-form" id="propertyContactForm">
                                <div class="form-row">
                                    <input type="text" placeholder="Your Name" required>
                                    <input type="email" placeholder="Your Email" required>
                                </div>
                                <div class="form-row">
                                    <input type="tel" placeholder="Phone Number" required>
                                    <select required>
                                        <option value="">I'm interested in...</option>
                                        <option value="viewing">Scheduling a viewing</option>
                                        <option value="information">More information</option>
                                        <option value="buying">Buying this property</option>
                                        <option value="renting">Renting this property</option>
                                    </select>
                                </div>
                                <textarea placeholder="Message (optional)" rows="4"></textarea>
                                <button type="submit" class="submit-btn">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <!-- Neighborhood Information -->
                <div class="neighborhood-section">
                    <h2>🏘️ Neighborhood: ${this.currentProperty.location}</h2>
                    <div class="neighborhood-content">
                        <div class="neighborhood-description">
                            <p>${this.currentProperty.neighborhood.description}</p>
                            <div class="walk-score">
                                <span class="walk-score-label">Walk Score:</span>
                                <span class="walk-score-number">${this.currentProperty.neighborhood.walkScore}/100</span>
                                <span class="walk-score-text">${this.getWalkScoreText(this.currentProperty.neighborhood.walkScore)}</span>
                            </div>
                        </div>
                        
                        <div class="neighborhood-amenities">
                            <h4>Local Amenities</h4>
                            <div class="amenities-grid">
                                ${this.currentProperty.neighborhood.amenities.map(amenity => `
                                    <div class="amenity-item">
                                        <span class="amenity-icon">📍</span>
                                        <span>${amenity}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Similar Properties -->
                <div class="similar-properties-section">
                    <h2>Similar Properties</h2>
                    <div class="similar-properties-grid">
                        ${this.getSimilarProperties().map(property => `
                            <div class="similar-property-card" onclick="window.location.href='properties.html?id=${property.id}'">
                                <img src="${property.gallery[0]}" alt="${property.title}">
                                <div class="similar-property-info">
                                    <h4>${property.title}</h4>
                                    <p class="similar-property-price">${property.price}</p>
                                    <p class="similar-property-details">${property.bedrooms} BR • ${property.location}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    setupImageGallery() {
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }
    }
    
    showImage(index) {
        this.currentImageIndex = index;
        const mainImage = document.getElementById('mainPropertyImage');
        const currentNum = document.getElementById('currentImageNum');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (mainImage && this.currentProperty) {
            mainImage.src = this.currentProperty.gallery[index];
            if (currentNum) {
                currentNum.textContent = index + 1;
            }
            
            // Update thumbnail active state
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }
    }
    
    previousImage() {
        if (this.currentProperty) {
            this.currentImageIndex = this.currentImageIndex > 0 ? 
                this.currentImageIndex - 1 : 
                this.currentProperty.gallery.length - 1;
            this.showImage(this.currentImageIndex);
        }
    }
    
    nextImage() {
        if (this.currentProperty) {
            this.currentImageIndex = this.currentImageIndex < this.currentProperty.gallery.length - 1 ? 
                this.currentImageIndex + 1 : 
                0;
            this.showImage(this.currentImageIndex);
        }
    }
    
    startVirtualTour() {
        alert(`🎥 Virtual Tour\n\nStarting 360° virtual tour for ${this.currentProperty.title}!\n\nIn a real application, this would:\n• Open an interactive 360° viewer\n• Allow users to navigate through rooms\n• Provide detailed property walkthroughs\n• Include hotspots with additional information\n\nFor now, this is a demo placeholder.`);
    }
    
    setupVirtualTour() {
        // Virtual tour setup would go here
        // In a real application, this would integrate with virtual tour platforms
    }
    
    setupContactForm() {
        const form = document.getElementById('propertyContactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(e);
            });
        }
    }
    
    handleContactSubmission(e) {
        const formData = new FormData(e.target);
        
        // Create and show styled feedback modal
        this.showFeedbackModal();
        
        // Reset form
        e.target.reset();
    }
    
    showFeedbackModal() {
        // Remove existing modal if present
        const existingModal = document.getElementById('feedbackModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modalHTML = `
            <div id="feedbackModal" class="feedback-modal-overlay">
                <div class="feedback-modal">
                    <div class="feedback-modal-header">
                        <div class="success-icon">✓</div>
                        <h3>Message Sent Successfully!</h3>
                        <button class="close-btn" onclick="propertyDetails.closeFeedbackModal()">×</button>
                    </div>
                    
                    <div class="feedback-modal-body">
                        <p class="success-message">Thank you for your interest in <strong>${this.currentProperty.title}</strong>!</p>
                        
                        <div class="property-summary">
                            <div class="property-info">
                                <h4>Property Details:</h4>
                                <p><strong>Property:</strong> ${this.currentProperty.title}</p>
                                <p><strong>Location:</strong> ${this.currentProperty.location}</p>
                                <p><strong>Price:</strong> ${this.currentProperty.price}</p>
                            </div>
                        </div>
                        
                        <div class="next-steps">
                            <h4>What happens next?</h4>
                            <ul>
                                <li>📞 Our team will contact you within 24 hours</li>
                                <li>🏠 We'll discuss property viewing arrangements</li>
                                <li>📋 Provide additional property information</li>
                                <li>💰 Discuss pricing and availability</li>
                                <li>🤝 Guide you through the next steps</li>
                            </ul>
                        </div>
                        
                        <div class="contact-info">
                            <p><strong>Need immediate assistance?</strong></p>
                            <p>📞 Call us: +233 50 782 4815</p>
                            <p>📧 Email: info@crebelhomes.com</p>
                        </div>
                    </div>
                    
                    <div class="feedback-modal-footer">
                        <button class="btn-primary" onclick="propertyDetails.closeFeedbackModal()">
                            Continue Browsing
                        </button>
                        <button class="btn-secondary" onclick="window.location.href='properties.html'">
                            View More Properties
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add CSS styles
        this.addFeedbackModalStyles();
        
        // Show modal with animation
        setTimeout(() => {
            const modal = document.getElementById('feedbackModal');
            if (modal) {
                modal.classList.add('show');
            }
        }, 10);
        
        // Close modal when clicking outside
        document.getElementById('feedbackModal').addEventListener('click', (e) => {
            if (e.target.id === 'feedbackModal') {
                this.closeFeedbackModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeFeedbackModal();
            }
        });
    }
    
    closeFeedbackModal() {
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.classList.add('hide');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    addFeedbackModalStyles() {
        // Check if styles already exist
        if (document.getElementById('feedbackModalStyles')) {
            return;
        }
        
        const styles = `
            <style id="feedbackModalStyles">
                .feedback-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(5px);
                    z-index: 10000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .feedback-modal-overlay.show {
                    opacity: 1;
                }
                
                .feedback-modal-overlay.hide {
                    opacity: 0;
                }
                
                .feedback-modal {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    max-width: 600px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    transform: scale(0.7) translateY(50px);
                    transition: all 0.3s ease;
                    animation: modalSlideIn 0.4s ease-out forwards;
                }
                
                .feedback-modal-overlay.show .feedback-modal {
                    transform: scale(1) translateY(0);
                }
                
                .feedback-modal-overlay.hide .feedback-modal {
                    transform: scale(0.8) translateY(30px);
                }
                
                @keyframes modalSlideIn {
                    from {
                        transform: scale(0.7) translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1) translateY(0);
                        opacity: 1;
                    }
                }
                
                .feedback-modal-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 2rem;
                    border-radius: 20px 20px 0 0;
                    text-align: center;
                    position: relative;
                }
                
                .success-icon {
                    background: rgba(255, 255, 255, 0.2);
                    border: 3px solid white;
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    margin: 0 auto 1rem;
                    animation: successPulse 0.6s ease-out;
                }
                
                @keyframes successPulse {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                
                .feedback-modal-header h3 {
                    margin: 0;
                    font-size: 1.8rem;
                    font-weight: bold;
                }
                
                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }
                
                .feedback-modal-body {
                    padding: 2rem;
                }
                
                .success-message {
                    font-size: 1.2rem;
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .property-summary {
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border-left: 4px solid #667eea;
                }
                
                .property-info h4 {
                    color: #667eea;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
                
                .property-info p {
                    margin: 0.5rem 0;
                    color: #555;
                }
                
                .next-steps {
                    margin-bottom: 2rem;
                }
                
                .next-steps h4 {
                    color: #2c3e50;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
                
                .next-steps ul {
                    list-style: none;
                    padding: 0;
                }
                
                .next-steps li {
                    background: #f8f9fa;
                    padding: 0.8rem 1rem;
                    margin: 0.5rem 0;
                    border-radius: 8px;
                    border-left: 3px solid #28a745;
                    color: #555;
                }
                
                .contact-info {
                    background: #e3f2fd;
                    border-radius: 12px;
                    padding: 1.5rem;
                    text-align: center;
                    border: 1px solid #bbdefb;
                }
                
                .contact-info p {
                    margin: 0.5rem 0;
                    color: #1565c0;
                }
                
                .contact-info p:first-child {
                    font-weight: bold;
                    color: #0d47a1;
                }
                
                .feedback-modal-footer {
                    padding: 1.5rem 2rem 2rem;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                
                .feedback-modal-footer button {
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    font-size: 1rem;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                }
                
                .btn-secondary {
                    background: #f8f9fa;
                    color: #667eea;
                    border: 2px solid #667eea;
                }
                
                .btn-secondary:hover {
                    background: #667eea;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
                }
                
                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .feedback-modal {
                        width: 95%;
                        margin: 1rem;
                    }
                    
                    .feedback-modal-header {
                        padding: 1.5rem;
                    }
                    
                    .success-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 2rem;
                    }
                    
                    .feedback-modal-header h3 {
                        font-size: 1.5rem;
                    }
                    
                    .feedback-modal-body {
                        padding: 1.5rem;
                    }
                    
                    .feedback-modal-footer {
                        flex-direction: column;
                        padding: 1rem 1.5rem 1.5rem;
                    }
                    
                    .feedback-modal-footer button {
                        width: 100%;
                    }
                }
                
                @media (max-width: 480px) {
                    .feedback-modal {
                        width: 98%;
                        margin: 0.5rem;
                    }
                    
                    .feedback-modal-header {
                        padding: 1rem;
                    }
                    
                    .feedback-modal-body {
                        padding: 1rem;
                    }
                    
                    .property-summary {
                        padding: 1rem;
                    }
                    
                    .contact-info {
                        padding: 1rem;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    getWalkScoreText(score) {
        if (score >= 90) return "Walker's Paradise";
        if (score >= 70) return "Very Walkable";
        if (score >= 50) return "Somewhat Walkable";
        if (score >= 25) return "Car-Dependent";
        return "Car-Required";
    }
    
    getSimilarProperties() {
        if (!this.currentProperty) return [];
        
        return this.propertyData
            .filter(property => 
                property.id !== this.currentProperty.id && 
                property.type === this.currentProperty.type
            )
            .slice(0, 3);
    }
    
    showPropertyNotFound() {
        const mainContent = document.getElementById('propertyContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="property-not-found">
                    <div class="not-found-content">
                        <h1>🏠 Property Not Found</h1>
                        <p>Sorry, the property you're looking for doesn't exist or has been removed.</p>
                        <div class="not-found-actions">
                            <a href="index.html" class="btn-primary">Back to Home</a>
                            <button onclick="window.history.back()" class="btn-secondary">Go Back</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    showAllProperties() {
        const mainContent = document.getElementById('propertyContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="all-properties-container">
                    <div class="properties-filter">
                        <button class="filter-btn active" onclick="propertyDetails.filterProperties('all')">All</button>
                        <button class="filter-btn" onclick="propertyDetails.filterProperties('rent')">For Rent</button>
                        <button class="filter-btn" onclick="propertyDetails.filterProperties('buy')">For Sale</button>
                    </div>
                    
                    <div class="all-properties-grid" id="allPropertiesGrid">
                        ${this.propertyData.map(property => `
                            <div class="property-card ${property.type}" data-type="${property.type}">
                                <div class="property-card-image">
                                    <img src="${property.gallery[0]}" alt="${property.title}">
                                    <div class="property-type-badge">${property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                                </div>
                                <div class="property-card-content">
                                    <h3>${property.title}</h3>
                                    <p class="property-card-location">📍 ${property.location}</p>
                                    <p class="property-card-price">${property.price}</p>
                                    <p class="property-card-details">${property.bedrooms} BR • ${property.bathrooms} BA • ${property.sqft.toLocaleString()} sqft</p>
                                    <button class="view-details-btn" onclick="window.location.href='properties.html?id=${property.id}'">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    filterProperties(type) {
        const cards = document.querySelectorAll('.property-card');
        const buttons = document.querySelectorAll('.filter-btn');
        
        // Update button states
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter cards
        cards.forEach(card => {
            if (type === 'all' || card.dataset.type === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Helper methods to show/hide welcome section
    showWelcomeSection() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.display = 'block';
        }
    }
    
    hideWelcomeSection() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }
    }
}

// Initialize when DOM is loaded
let propertyDetails;
document.addEventListener('DOMContentLoaded', function() {
    propertyDetails = new PropertyDetailsPage();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add event listener for hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
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
});

// Mobile menu toggle (if needed on properties page)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}
