// FiberLink Main JavaScript
// All interactive features and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
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
});

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
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.padding = '2rem';
            navLinks.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            navLinks.style.borderTop = 'none';
            mobileMenuBtn.textContent = '✕';
        } else {
            closeMobileMenu();
        }
    }
    
    function closeMobileMenu() {
        isMenuOpen = false;
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
        mobileMenuBtn.textContent = '☰';
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

// Export functions for potential external use
window.FiberLinkApp = {
    initCounter,
    initParallaxEffects,
    initHeroTiltEffect,
    initSmoothScrolling,
    initRippleEffects,
    initMobileMenu,
    initScrollParallax,
    initIntersectionObserver,
    initNavbarEffects,
    initActiveNavLinks
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