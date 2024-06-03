document.addEventListener('DOMContentLoaded', function () {
    

    var calculateButton = document.getElementById('calculateButton');
    var serviceSelection = document.getElementById('serviceSelection');
    var roofSlopeSection = document.getElementById('roofSlopeSection');
    var paintingSection = document.getElementById('paintingSection');
    var squareFootageSection = document.getElementById('squareFootageSection');
    var additionalCost = document.getElementById('additionalCost');
    

    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            calculatePrice();
        });
    }

    serviceSelection.addEventListener('change', function() {
        toggleSectionsBasedOnService(this.value);
        clearPrices();
        removeDefaultOption();
    });

    function calculatePrice() {
        var serviceType = serviceSelection.value;
        var squareFootage = parseFloat(document.getElementById('squareFootage').value);
        var roofSlope = roofSlopeSection.style.display !== 'none' ? parseFloat(document.getElementById('roofSlope').value) : null;
        var wallSqFt = parseFloat(document.getElementById('wallSqFt').value) || 0;
        var ceilingSqFt = parseFloat(document.getElementById('ceilingSqFt').value) || 0;
        var totalPrice = 0;
        var gutterPrice = 0;


        if (serviceType === 'gutter') {
            totalPrice = calculateGutterCleaningPrice(squareFootage);
            // Check if totalPrice is a number or a string ("Call for Pricing")
            if (typeof totalPrice === 'string') {
                document.getElementById('price').textContent = totalPrice; // Display "Call for Pricing"
            } else {
                document.getElementById('price').textContent = totalPrice.toFixed(2);
            }
        }

        if (serviceType === 'roofResidential') {
            totalPrice = calculateResidentialRoofCleaningPrice(squareFootage, roofSlope);
            gutterPrice = calculateGutterPrice(squareFootage);
        } else if (serviceType === 'roofCommercial') {
            totalPrice = calculateCommercialRoofCleaningPrice(squareFootage, roofSlope);
            gutterPrice = calculateGutterPrice(squareFootage);
        } else if (serviceType === 'painting') {
            totalPrice = (wallSqFt * 2.25) + (ceilingSqFt * 5);
        } else if (serviceType === 'gutter') {
            totalPrice = calculateGutterCleaningPrice(squareFootage);
        }


        document.getElementById('price').textContent = totalPrice.toFixed(2);
        if (serviceType === 'roofResidential' || serviceType === 'roofCommercial') {
            additionalGutterCost.style.display = 'block';
            if (typeof gutterPrice === 'number') {
                document.getElementById('gutterCost').textContent = gutterPrice.toFixed(2);
            } else {
                document.getElementById('gutterCost').textContent = gutterPrice; // Display "Call for Pricing"
            }
        } else {
            additionalGutterCost.style.display = 'none';
        }


    }
    function clearPrices() {
        document.getElementById('price').textContent = '';
        document.getElementById('gutterCost').textContent = ''; // Clear the gutter cost text
        additionalGutterCost.style.display = 'none'; // Hide the gutter cost section
    }

    function calculateResidentialRoofCleaningPrice(squareFootage, roofSlope) {
        var basePrice = 0;
        if (squareFootage <= 1500) basePrice = squareFootage * 0.20;
        else if (squareFootage <= 2500) basePrice = squareFootage * 0.30;
        else if (squareFootage <= 3500) basePrice = squareFootage * 0.35;
        else if (squareFootage <= 5000) basePrice = squareFootage * 0.40;
        else basePrice = squareFootage * 0.45;

        if (roofSlope >= 6 && roofSlope < 9) basePrice += squareFootage * 0.07;
        else if (roofSlope >= 9) basePrice += squareFootage * 0.12;

        return basePrice;
    }

    function calculateCommercialRoofCleaningPrice(squareFootage, roofSlope) {
        var basePrice = 0;
        if (squareFootage <= 3000) basePrice = squareFootage * 0.32;
        else if (squareFootage <= 6000) basePrice = squareFootage * 0.42;
        else basePrice = squareFootage * 0.52;

        if (roofSlope >= 6 && roofSlope <= 9) basePrice += squareFootage * 0.07;
        else if (roofSlope > 9) basePrice += squareFootage * 0.12;

        return basePrice;
    }

    function calculateGutterPrice(squareFootage) {
        if (squareFootage <= 2000) return 150;
        else if (squareFootage <= 3000) return 250;
        else if (squareFootage <= 4000) return 350;
        else return ' Call for Pricing'; // Handle this case in the display logic
    }

    function calculateGutterCleaningPrice(squareFootage) {
        if (squareFootage <= 2000) return 150;
        else if (squareFootage <= 3000) return 250;
        else if (squareFootage <= 4000) return 350;
        else return ' Call for Pricing'; // Handle this case in the display logic
    }

    function toggleSectionsBasedOnService(serviceType) {
        var generalSquareFootageSection = document.getElementById('generalSquareFootageSection');
        var paintingSection = document.getElementById('paintingSection');
        var roofSlopeSection = document.getElementById('roofSlopeSection');
    
        // Hide all sections initially
        generalSquareFootageSection.style.display = 'none';
        paintingSection.style.display = 'none';
        roofSlopeSection.style.display = 'none';
    
        // Based on the service, show the relevant sections
        switch (serviceType) {
            case 'roofResidential':
            case 'roofCommercial':
                roofSlopeSection.style.display = 'block';
                generalSquareFootageSection.style.display = 'block';
                break;
            case 'gutter':
                generalSquareFootageSection.style.display = 'block';
                break;
            case 'painting':
                paintingSection.style.display = 'block';
                break;
            default:
                break;
        }
    }

    function removeDefaultOption() {
        var defaultOption = serviceSelection.querySelector('option[value=""]');
        if (defaultOption) {
            serviceSelection.removeChild(defaultOption);
        }
    }


        // Scroll to section function
        function scrollToSection(event) {
            event.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
        
            // Delay the scroll adjustment slightly to wait for dynamic content
            setTimeout(function() {
                var headerOffset = 120; // Height of your fixed header/taskbar
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100); // Adjust the timeout as necessary
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', scrollToSection);
        });
    
        // ... the rest of your existing code ...
    });

    // ... any other scripts ...
