// FiberLink Main JavaScript
// All interactive features and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypingEffect();
    initHeroButtons();
    initCounter();
    initParallaxEffects();
    initHeroTiltEffect();
    initSmoothScrolling();
    initRippleEffects();
    initMobileMenu();
    initScrollParallax();
    initIntersectionObserver();
    initNavbarEffects();
    initActiveNavLinks();
    initBookingModal();
    initNewsletterForm();
    initBookNowForm();
    initBookNowScrollButtons();
});

// Typing Effect for Hero Tagline
function initTypingEffect() {
    const tagline = document.getElementById('typingTagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 80; // milliseconds per character
    
    function typeCharacter() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Add cursor blink effect after typing completes
            tagline.style.borderRight = 'none';
        }
    }
    
    // Add typing cursor effect
    tagline.style.borderRight = '3px solid var(--teal)';
    tagline.style.paddingRight = '5px';
    
    // Start typing after a small delay
    setTimeout(typeCharacter, 500);
}

// Hero Button Smooth Scroll Functionality
function initHeroButtons() {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const explorePlansBtn = document.getElementById('explorePlansBtn');
    
    // Get Started button scrolls to Plans section
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToSection('plans');
        });
    }
    
    // Explore Plans button scrolls to Plans section
    if (explorePlansBtn) {
        explorePlansBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToSection('plans');
        });
    }
}

// Smooth Scroll Helper Function
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Counter Animation
function initCounter() {
    const counter = document.getElementById('counter');
    if (!counter) return;
    
    animateCounter();
    
    function animateCounter() {
        const target = 12847;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);

        // Random fluctuation every 3 seconds
        setInterval(() => {
            const variance = Math.floor(Math.random() * 10) - 5;
            const newVal = target + variance;
            counter.textContent = newVal.toLocaleString();
        }, 3000);
    }
}

// Parallax Mouse Movement Effect
function initParallaxEffects() {
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) return;
    
    document.addEventListener('mousemove', handleMouseMove);
    
    function handleMouseMove(e) {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

// Hero Card Tilt Effect
const heroCard = document.querySelector('.hero-card');
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
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
}

// Button Ripple Effect
function initRippleEffects() {
    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .ripple-element {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Add ripple effect to all buttons
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-cta').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    function createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            z-index: 1;
        `;

        // Ensure button has relative positioning
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.classList.add('mobile-active');
            mobileMenuBtn.innerHTML = '✕';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            closeMobileMenu();
        }
    }
    
    function closeMobileMenu() {
        isMenuOpen = false;
        navLinks.classList.remove('mobile-active');
        mobileMenuBtn.innerHTML = '☰';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Scroll Parallax for Background Elements
function initScrollParallax() {
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        const heroCard = document.querySelector('.hero-card');
        
        // Parallax for blobs with scroll conflict resolution
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.1;
            const currentTransform = blob.style.transform;
            
            // Preserve mouse movement transform and add scroll transform
            if (currentTransform && currentTransform.includes('translate(')) {
                // Extract existing translate values and add scroll offset
                const scrollTransform = `translateY(${scrolled * speed}px)`;
                if (!currentTransform.includes('translateY(')) {
                    blob.style.transform = currentTransform + ` ${scrollTransform}`;
                }
            } else {
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
        
        // Subtle parallax for hero card
        if (heroCard && scrolled < window.innerHeight) {
            const heroSpeed = scrolled * 0.05;
            const currentTransform = heroCard.style.transform;
            
            // Only apply scroll parallax if not being hovered
            if (!currentTransform || !currentTransform.includes('perspective')) {
                heroCard.style.transform = `translateY(${heroSpeed}px)`;
            }
        }
        
        ticking = false;
    }
}

// Intersection Observer for Animations
function initIntersectionObserver() {
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
    
    // Observe feature cards and plan cards
    document.querySelectorAll('.feature-card, .plan-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .plan-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in, .plan-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .feature-card, .plan-card {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    document.head.appendChild(animationStyle);
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation for cards
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        
        if (activeElement.classList.contains('feature-card') || 
            activeElement.classList.contains('plan-card')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// Add tabindex to interactive cards for keyboard navigation
document.querySelectorAll('.feature-card, .plan-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reinitialize mobile menu if needed
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks) {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.background = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.padding = '';
                navLinks.style.border = '';
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰';
            }
        }
    }, 250);
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Utility function for smooth animations
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Booking Modal Functions
function initBookingModal() {
    const modalBackdrop = document.getElementById('bookingModal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const bookingButtons = document.querySelectorAll('.btn[href="#book"], .plan-card .btn');
    const bookingForm = document.getElementById('bookingForm');
    
    if (!modalBackdrop) return;
    
    // Open modal
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.closest('.plan-card')?.querySelector('h3')?.textContent || '';
            if (planName) {
                const planSelect = document.getElementById('planSelect');
                if (planSelect) {
                    // Pre-select the plan if clicked from a specific card
                    for (let option of planSelect.options) {
                        if (option.text.includes(planName)) {
                            option.selected = true;
                            break;
                        }
                    }
                }
            }
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });
    
    // Close modal
    function closeModal() {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close on backdrop click
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (you can integrate with backend here)
            showToast('🎉 Booking request submitted! We\'ll contact you shortly.', 'success');
            
            // Close modal and reset form
            closeModal();
            bookingForm.reset();
            
            // Optional: Send data to backend
            console.log('Booking data:', data);
        });
    }
}

// Newsletter Form Functions
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!email || !email.includes('@')) {
            showToast('⚠️ Please enter a valid email address', 'error');
            return;
        }
        
        // Show success message
        showToast('✅ Thanks for subscribing to our newsletter!', 'success');
        
        // Reset form
        newsletterForm.reset();
        
        // Optional: Send to backend
        console.log('Newsletter subscription:', email);
    });
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    
    // Add styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'linear-gradient(135deg, #14B8A6, #10B981)' : 
                    type === 'error' ? 'linear-gradient(135deg, #EF4444, #DC2626)' :
                    'linear-gradient(135deg, #7C3AED, #6366F1)',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10001',
        fontSize: '1rem',
        fontWeight: '600',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease',
        backdropFilter: 'blur(10px)'
    });
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#toast-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Export functions for potential external use
window.FiberLinkApp = {
    initTypingEffect,
    initHeroButtons,
    initCounter,
    initParallaxEffects,
    initHeroTiltEffect,
    initSmoothScrolling,
    initRippleEffects,
    initMobileMenu,
    initScrollParallax,
    initIntersectionObserver,
    initNavbarEffects,
    initActiveNavLinks,
    initBookingModal,
    initNewsletterForm,
    initBookNowForm,
    initBookNowScrollButtons,
    smoothScrollToSection,
    showToast
};

// Navbar Scroll Effects
function initNavbarEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
}

// Active Navigation Link Highlighting
function initActiveNavLinks() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    if (!navLinks.length || !sections.length) return;
    
    // Set initial active link
    updateActiveLink();
    
    // Update on scroll
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    
    // Update on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    }
}

// Book Now Form Functionality
function initBookNowForm() {
    const form = document.getElementById('bookNowForm');
    if (!form) return;
    
    // Add real-time validation on blur
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            // Remove error state when user starts typing
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success alert
            showSuccessAlert();
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
            }, 2000);
            
            // Log data (you can replace this with actual backend call)
            console.log('Booking Data:', data);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Validate individual field
function validateField(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Check if field is empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    // Validate email format
    else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Validate phone format (basic)
    else if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        if (!phoneRegex.test(input.value.trim())) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Update UI based on validation
    if (!isValid) {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    } else {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    }
    
    return isValid;
}

// Show success alert
function showSuccessAlert() {
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = 'success-alert';
    alert.innerHTML = `
        <div class="check-icon">✓</div>
        <h3>Booking Submitted Successfully!</h3>
        <p>Thank you for choosing our service. We'll contact you shortly to confirm your connection.</p>
    `;
    
    document.body.appendChild(backdrop);
    document.body.appendChild(alert);
    
    // Close alert after 3 seconds
    setTimeout(() => {
        backdrop.style.animation = 'fadeOut 0.3s ease';
        alert.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            backdrop.remove();
            alert.remove();
        }, 300);
    }, 3000);
    
    // Click backdrop to close
    backdrop.addEventListener('click', () => {
        backdrop.style.animation = 'fadeOut 0.3s ease';
        alert.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            backdrop.remove();
            alert.remove();
        }, 300);
    });
}

// Smooth scroll to Book Now section when clicking "Book Now" buttons
function initBookNowScrollButtons() {
    // Find all buttons that should scroll to book now section
    const bookButtons = document.querySelectorAll('.btn[href="#book"], .plan-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const bookNowSection = document.getElementById('book-now');
            if (bookNowSection) {
                // Smooth scroll to section
                bookNowSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on first input after scroll
                setTimeout(() => {
                    const firstInput = document.getElementById('bookFullName');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    });
}

// ========================================
// ENHANCED FEATURES INITIALIZATION
// ========================================

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Scroll to Top Button with Progress Ring
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    const progressCircle = scrollBtn.querySelector('.progress-ring-circle');
    const radius = 20;
    const circumference = radius * 2 * Math.PI;
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Show/hide button
        if (scrollTop > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
        
        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Chat Widget
function initChatWidget() {
    const chatTrigger = document.getElementById('chatTrigger');
    if (!chatTrigger) return;
    
    chatTrigger.addEventListener('click', () => {
        showToast('Chat feature coming soon! For now, please call us at 1-800-FIBER-LINK', 'success');
        
        // Remove badge after click
        const badge = chatTrigger.querySelector('.chat-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    });
}

// Speed Test Widget
function initSpeedTest() {
    const btn = document.getElementById('testSpeedBtn');
    const speedNumber = document.getElementById('speedNumber');
    const speedStatus = document.getElementById('speedStatus');
    const gaugePath = document.getElementById('gauge-progress');
    
    if (!btn || !speedNumber || !speedStatus || !gaugePath) return;
    
    btn.addEventListener('click', function() {
        btn.disabled = true;
        speedStatus.textContent = 'Testing your connection speed...';
        speedStatus.classList.add('testing');
        
        let speed = 0;
        const targetSpeed = Math.floor(Math.random() * 50) + 15; // 15-65 Mbps
        const maxGaugeSpeed = 100; // Max speed for gauge visual
        
        const interval = setInterval(() => {
            speed += 2;
            if (speed > targetSpeed) speed = targetSpeed;
            
            speedNumber.textContent = speed;
            
            // Update gauge (377 is approximate arc length)
            const progress = (speed / maxGaugeSpeed) * 377;
            gaugePath.style.strokeDashoffset = 377 - progress;
            
            if (speed >= targetSpeed) {
                clearInterval(interval);
                speedNumber.textContent = targetSpeed;
                speedStatus.classList.remove('testing');
                
                if (targetSpeed < 30) {
                    speedStatus.innerHTML = `Your current speed: <strong style="color: var(--pink)">${targetSpeed} Mbps</strong>. Upgrade to our fiber network for speeds up to <strong style="color: var(--teal)">1000+ Mbps</strong>! 🚀`;
                } else if (targetSpeed < 50) {
                    speedStatus.innerHTML = `Your current speed: <strong style="color: var(--teal)">${targetSpeed} Mbps</strong>. Good, but our fiber can deliver <strong>${targetSpeed * 15}+ Mbps</strong> for the same price!`;
                } else {
                    speedStatus.innerHTML = `Your current speed: <strong style="color: var(--teal)">${targetSpeed} Mbps</strong>. Not bad! But fiber offers consistent speeds and lower latency.`;
                }
                
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Test Again';
                
                showToast('Speed test completed!', 'success');
            }
        }, 50);
    });
}

// Coverage Checker
function initCoverageChecker() {
    const checkBtn = document.getElementById('checkCoverageBtn');
    const zipInput = document.getElementById('zipInput');
    const resultDiv = document.getElementById('coverageResult');
    
    if (!checkBtn || !zipInput || !resultDiv) return;
    
    // Format ZIP code input
    zipInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
    });
    
    checkBtn.addEventListener('click', function() {
        const zipCode = zipInput.value.trim();
        
        // Validate ZIP code
        if (!/^\d{5}$/.test(zipCode)) {
            resultDiv.className = 'coverage-result error show';
            resultDiv.innerHTML = `
                <h3>❌ Invalid ZIP Code</h3>
                <p>Please enter a valid 5-digit ZIP code.</p>
            `;
            showToast('Please enter a valid ZIP code', 'error');
            return;
        }
        
        // Disable button and show loading
        checkBtn.disabled = true;
        checkBtn.textContent = 'Checking...';
        resultDiv.classList.remove('show');
        
        // Simulate API call
        setTimeout(() => {
            // For demo: 80% of ZIP codes are covered
            const isCovered = Math.random() > 0.2;
            
            if (isCovered) {
                resultDiv.className = 'coverage-result success show';
                resultDiv.innerHTML = `
                    <h3>🎉 Great News!</h3>
                    <p>Fiber internet is available in your area (${zipCode}). Our fastest plan offers speeds up to <strong>1000 Mbps</strong> with no data caps, no contracts, and 24/7 support!</p>
                    <p style="margin-top: 1rem;"><a href="#plans" class="inline-link" style="color: var(--teal); text-decoration: underline;">View our plans →</a></p>
                `;
                showToast('Fiber is available in your area!', 'success');
            } else {
                resultDiv.className = 'coverage-result error show';
                resultDiv.innerHTML = `
                    <h3>📍 Not Yet Available</h3>
                    <p>We're not in ${zipCode} yet, but we're expanding rapidly! Leave your email and we'll notify you when we arrive in your area.</p>
                    <p style="margin-top: 1rem;"><a href="#contact" class="inline-link" style="color: var(--teal); text-decoration: underline;">Stay updated →</a></p>
                `;
                showToast('Area not covered yet. We\'ll notify you when we expand!', 'error');
            }
            
            checkBtn.disabled = false;
            checkBtn.textContent = 'Check Availability';
        }, 1500);
    });
    
    // Allow Enter key to submit
    zipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherButton = otherItem.querySelector('.faq-question');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                    if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// 3D Tilt Effect for Feature Cards
function init3DTiltCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.setProperty('--rx', `${rotateX}deg`);
            card.style.setProperty('--ry', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });
}

// Particle Network Canvas
function initParticleNetwork() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.5';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        init();
    }
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.6)';
        ctx.fill();
    };
    
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };
    
    function init() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width / 20));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(20, 184, 166, ${0.2 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    
    window.addEventListener('resize', resize);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });
}

// Enhanced Form Validation
function enhanceFormValidation() {
    const form = document.getElementById('bookNowForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    function validateField(field) {
        const errorSpan = field.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-message')) return;
        
        if (!field.validity.valid) {
            field.classList.add('error');
            field.classList.remove('success');
            
            if (field.validity.valueMissing) {
                errorSpan.textContent = 'This field is required';
            } else if (field.validity.typeMismatch) {
                errorSpan.textContent = `Please enter a valid ${field.type}`;
            } else if (field.validity.patternMismatch) {
                errorSpan.textContent = 'Please match the requested format';
            } else {
                errorSpan.textContent = field.validationMessage;
            }
        } else {
            field.classList.remove('error');
            field.classList.add('success');
            errorSpan.textContent = '';
        }
    }
    
    // Enhanced form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            validateField(input);
            if (!input.validity.valid && input.hasAttribute('required')) {
                isValid = false;
            }
        });
        
        if (isValid) {
            showToast('Booking submitted successfully! We\'ll contact you shortly.', 'success');
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('success', 'error');
            });
        } else {
            showToast('Please fill in all required fields correctly', 'error');
        }
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollProgress();
    initScrollToTop();
    initChatWidget();
    initSpeedTest();
    initCoverageChecker();
    initFAQ();
    init3DTiltCards();
    initParticleNetwork();
    enhanceFormValidation();
});