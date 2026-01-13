

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Only attach handlers if elements exist
if (hamburger && navMenu) {
    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if it's a dropdown toggle
                if (!link.classList.contains('dropdown-toggle')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Dropdown toggle functionality
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(d => d.classList.remove('active'));
    }
});

// Close dropdown when a dropdown link is clicked
const dropdownLinks = document.querySelectorAll('.dropdown-link');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('active'));
        // Close hamburger menu on mobile
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Intersection Observer for reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden, .hidden2');
hiddenElements.forEach((el) => observer.observe(el));

// Modal Functionality
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const closeBtn = document.querySelector('.close');
const registerForm = document.getElementById('registerForm');

// Function to close modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Function to open modal
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Focus on first input for accessibility
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Open modal when "Register Now" button is clicked
if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
}

// Close modal when close button (X) is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
    });
}

// Close modal when clicking outside the modal content
if (registerModal) {
    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal(registerModal);
        closeModal(tourModal);
    }
});

// Handle form submission
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.studentName || !data.email || !data.phone || !data.grade) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Log the data (you can send to server here)
        console.log('Registration submitted:', data);
        
        // Show success message
        alert('Thank you for registering! We will contact you soon.');
        
        // Reset form
        registerForm.reset();
        
        // Close modal
        closeModal(registerModal);
    });
}

// Tour Modal Functionality
const tourBtn = document.getElementById('tourBtn');
const tourModal = document.getElementById('tourModal');
const tourCloseBtn = document.querySelector('.tour-close');
const tourForm = document.getElementById('tourForm');

// Open tour modal when "Schedule a Tour" button is clicked
if (tourBtn) {
    tourBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(tourModal);
    });
}

// Close tour modal when close button (X) is clicked
if (tourCloseBtn) {
    tourCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(tourModal);
    });
}

// Close tour modal when clicking outside the modal content
if (tourModal) {
    window.addEventListener('click', (event) => {
        if (event.target === tourModal) {
            closeModal(tourModal);
        }
    });
}

// Handle tour form submission
if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(tourForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.visitorName || !data.visitorEmail || !data.visitorPhone || !data.tourDate) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Log the data (you can send to server here)
        console.log('Tour scheduled:', data);
        
        // Show success message
        alert('Thank you! We\'ve scheduled your campus tour. We\'ll see you soon!');
        
        // Reset form
        tourForm.reset();
        
        // Close modal
        closeModal(tourModal);
    });
}
