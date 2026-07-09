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
    // --- Trailer Modal ---
    const trailerBtn = document.getElementById('trailerBtn');
    const trailerModal = document.getElementById('trailerModal');
    const trailerModalClose = document.getElementById('trailerModalClose');
    const trailerModalOverlay = document.getElementById('trailerModalOverlay');
    const trailerModalIframe = document.getElementById('trailerModalIframe');
    const youtubeUrl = 'https://www.youtube.com/embed/63HkKOAqlyQ?autoplay=1&rel=0';

    function openTrailerModal() {
        trailerModalIframe.src = youtubeUrl;
        trailerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTrailerModal() {
        trailerModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { trailerModalIframe.src = ''; }, 400);
    }

    if (trailerBtn && trailerModal) {
        trailerBtn.addEventListener('click', openTrailerModal);
        trailerModalClose.addEventListener('click', closeTrailerModal);
        trailerModalOverlay.addEventListener('click', closeTrailerModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && trailerModal.classList.contains('active')) {
                closeTrailerModal();
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
    if (nav) {
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
    }
});

// --- YouTube Background Loop (Flawless Loop) ---
let bgPlayer;
let timeMonitorInterval;

// Load YouTube Player API dynamically to guarantee callback order
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
    bgPlayer = new YT.Player('bg-video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    
    // Check every 250ms to loop video 1s before it officially ends
    // This stops YouTube from showing the recommendations card overlay
    clearInterval(timeMonitorInterval);
    timeMonitorInterval = setInterval(() => {
        if (bgPlayer && bgPlayer.getCurrentTime && bgPlayer.getDuration) {
            const currentTime = bgPlayer.getCurrentTime();
            const duration = bgPlayer.getDuration();
            if (duration > 0 && currentTime >= duration - 1.5) {
                bgPlayer.seekTo(0);
                bgPlayer.playVideo();
            }
        }
    }, 250);
}

function onPlayerStateChange(event) {
    // Fallback loop if timeMonitor misses it
    if (event.data === YT.PlayerState.ENDED) {
        bgPlayer.seekTo(0);
        bgPlayer.playVideo();
    }
}
