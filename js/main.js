document.addEventListener("DOMContentLoaded", () => {
    
    // --- Hamburger Nav ---
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navOverlay) {
        navToggle.addEventListener('click', () => {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        navClose.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Subscribe form handling ---
    const subscribeForm = document.getElementById('subscribeForm');
    const successMsg = document.getElementById('successMsg');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('emailInput');
            if (emailInput.value) {
                subscribeForm.style.display = 'none';
                successMsg.style.display = 'block';
            }
        });
    }

    // --- Parallax on hero ---
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroContent && scrollPosition < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / 600);
        }
    });

    // --- Nav background on scroll ---
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 12, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.webkitBackdropFilter = 'none';
        }
    });
});
