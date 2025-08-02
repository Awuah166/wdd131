// Product array for dynamic select options
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050", 
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits", 
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Populate product select options
    populateProductSelect();
    
    // Update footer information
    updateFooter();
    
    // Add deselect functionality to radio buttons
    addRadioDeselectFunctionality();
});

function populateProductSelect() {
    const selectElement = document.getElementById('product-name');
    
    // Create options for each product
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
}

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

function addRadioDeselectFunctionality() {
    const radioButtons = document.querySelectorAll('.rating-group input[type="radio"]');
    let lastSelected = null;
    
    radioButtons.forEach(radio => {
        radio.addEventListener('click', function() {
            // If the same radio button is clicked again, deselect it
            if (lastSelected === this) {
                this.checked = false;
                lastSelected = null;
            } else {
                lastSelected = this;
            }
        });
    });
}