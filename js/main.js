document.addEventListener("DOMContentLoaded", () => {
    
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Subscribe form handling
    const subscribeForm = document.getElementById('subscribeForm');
    const successMsg = document.getElementById('successMsg');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you'd send this to an API
            const emailInput = document.getElementById('emailInput');
            if (emailInput.value) {
                subscribeForm.style.display = 'none';
                successMsg.style.display = 'block';
            }
        });
    }

    // Parallax effect on hero content
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroContent && scrollPosition < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / 500);
        }
    });
});
