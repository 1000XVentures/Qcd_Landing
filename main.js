// Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    initNavigation();
    initMobileNav();
    initFAQ();
    initScrollProgress();
    initHeroAnimations();
    initImageReveals();
    initHorizontalScroll();
    initPinnedSections();
    initScrollReveals();
});

/**
 * Navigation Logic
 */
function initNavigation() {
    const nav = document.getElementById('mainNav');
    
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            if (self.direction === 1) {
                nav.classList.add('bg-white', 'text-dark', 'shadow-sm');
                nav.classList.remove('mix-blend-difference', 'text-cream');
            } else if (self.scroll() < 80) {
                nav.classList.remove('bg-white', 'text-dark', 'shadow-sm');
                nav.classList.add('mix-blend-difference', 'text-cream');
            }
        }
    });
}

function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const links = mobileNav.querySelectorAll('a');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}


/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    gsap.to("#progressBar", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8
        }
    });
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    // Title Reveal
    gsap.to("#heroTitle", {
        y: 0,
        duration: 1.8,
        ease: "power4.out",
        delay: 0.5
    });
    
    // Parallax Video Effect
    gsap.to("#heroVideo", {
        scale: 1,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
        }
    });

    // Fade-in Elements
    gsap.from(".animate-fade-in", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.8
    });
}

/**
 * Image Reveal Transitions
 */
function initImageReveals() {
    document.querySelectorAll('.reveal-img-container').forEach(container => {
        const img = container.querySelector('img');
        
        gsap.to(container, {
            clipPath: "inset(0% 0 0 0)",
            duration: 2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
            }
        });
        
        gsap.to(img, {
            scale: 1,
            duration: 2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
            }
        });
    });
}

/**
 * Horizontal Scroll for Services
 */
function initHorizontalScroll() {
    const cards = gsap.utils.toArray(".service-card");
    if (!cards.length) return;

    gsap.to(cards, {
        xPercent: -100 * (cards.length - 2),
        ease: "none",
        scrollTrigger: {
            trigger: "#services",
            pin: true,
            scrub: 1.8,
            snap: 1 / (cards.length - 1),
            // Calculations for end point
            end: () => "+=" + document.querySelector("#horizontalScroll").offsetWidth
        }
    });
}

/**
 * Pinned Content for Philosophy/Process
 */
function initPinnedSections() {
    const pinTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#pinnedContainer",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    // Initial state for the first background
    gsap.set("#bg-pin-1", { opacity: 0.25, scale: 1 });

    pinTL.to("#pin-1", { opacity: 0, y: -80, duration: 1.5, ease: "power2.inOut" })
         .to("#bg-pin-1", { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.inOut" }, "<")
         .to("#bg-pin-2", { opacity: 0.25, scale: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.8")
         .to("#pin-2", { opacity: 1, y: 0, duration: 1.5, ease: "power2.inOut" }, "-=1.5")
         
         .to("#pin-2", { opacity: 0, y: -80, duration: 1.5, ease: "power2.inOut" }, "+=0.8")
         .to("#bg-pin-2", { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.inOut" }, "<")
         .to("#bg-pin-3", { opacity: 0.25, scale: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.8")
         .to("#pin-3", { opacity: 1, y: 0, duration: 1.5, ease: "power2.inOut" }, "-=1.5");
}

/**
 * Scroll Reveals for Extra Sections
 */
function initScrollReveals() {
    gsap.utils.toArray('.animate-slide-up').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            }
        });
    });

    gsap.utils.toArray('.animate-fade-in').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        });
    });
}
