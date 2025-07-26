document.addEventListener('DOMContentLoaded', function() {
    // Display all temples when the page loads
    displayTemples(temples);

    // Add navigation event listeners for filtering temples
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterType = this.textContent.toLowerCase();
            const title = document.querySelector('main h2');

            let filteredTemples = [];

            switch (filterType) {
                case 'home':
                    filteredTemples = temples;
                    title.textContent = 'Temple Home';
                    break;
                case 'old':
                    filteredTemples = temples.filter(temple => {
                        const year = parseInt(temple.dedicated.split(',')[0]);
                        return year < 1900;
                    });
                    title.textContent = 'Old Temples';
                    break;
                case 'new':
                    filteredTemples = temples.filter(temple => {
                        const year = parseInt(temple.dedicated.split(',')[0]);
                        return year > 2000;
                    });
                    title.textContent = 'New Temples';
                    break;
                case 'large':
                    filteredTemples = temples.filter(temple => temple.area > 90000);
                    title.textContent = 'Large Temples';
                    break;
                case 'small':
                    filteredTemples = temples.filter(temple => temple.area < 10000);
                    title.textContent = 'Small Temples';
                    break;
                default:
                    filteredTemples = temples;
                    title.textContent = 'Temple Home';
            }

            displayTemples(filteredTemples);
        });
    });
    
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
            paragraphs[0].innerHTML = `&copy; ${year} 💲 Awuah Dennis 💲. All rights reserved.`;
        }
        if (paragraphs[1]) {
            paragraphs[1].textContent = `Last Modified: ${document.lastModified}`;
        }
    }
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 10000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Manti Utah Temple",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  }
];

// Function to create a temple card
function createTempleCard(temple) {
    const card = document.createElement('div');
    card.className = 'temple-card';

    card.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    <img src="${temple.imageUrl}"
         alt="${temple.templeName}"
         loading="lazy"
         width="400"
         height="250">
    `;
    return card;
}

// Function to display temples
function displayTemples(templeList) {
    const templeContainer = document.getElementById('temple-container');
    
    if (templeContainer) {
        // Clear existing content
        templeContainer.innerHTML = '';

        // Create and append cards for each temple
        templeList.forEach(temple => {
            const card = createTempleCard(temple);
            templeContainer.appendChild(card);
        });
    }
} 