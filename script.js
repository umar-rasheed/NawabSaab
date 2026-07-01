// Luxury Islamic Wedding Invitation Script
// Customize here:
const groomName = "Ahmed Khan";
const brideName = "Fatima Ahmed";
const weddingDate = new Date("2026-12-15T16:00:00"); // Customize date

// Sample images - replace with your own
const galleryImages = [
    "https://picsum.photos/id/1015/600/800",
    "https://picsum.photos/id/102/600/400",
    "https://picsum.photos/id/106/600/900",
    "https://picsum.photos/id/201/600/700",
    // Add more
];

// Populate gallery
function populateGallery() {
    const grid = document.getElementById('masonry-grid');
    galleryImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Wedding memory";
        img.loading = "lazy";
        grid.appendChild(img);
    });
}

// Countdown
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            daysEl.textContent = "00";
            // etc.
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Music
let music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const floatingToggle = document.getElementById('floating-music-toggle');

function toggleMusic() {
    if (music.paused) {
        music.play().catch(() => {});
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        floatingToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        music.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        floatingToggle.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Open invitation
document.getElementById('open-invitation').addEventListener('click', () => {
    const opening = document.getElementById('opening-screen');
    const main = document.getElementById('main-content');
    
    opening.style.opacity = '0';
    setTimeout(() => {
        opening.style.display = 'none';
        main.classList.remove('hidden');
        
        // Start music after interaction
        music.play().catch(() => {});
    }, 1500);
    
    // Trigger confetti or lanterns if needed
});

// RSVP Form
document.getElementById('rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate submission
    alert("Thank you! Your RSVP has been received. JazakAllah Khair.");
    e.target.reset();
});

// URL personalization
function personalize() {
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('guest') || "Dear Guest";
    // Could update welcome texts
    console.log("Welcome, " + guest);
}

// Share functions
function shareWhatsApp() {
    const text = `Join us for the wedding of ${groomName} & ${brideName}!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}

function addToCalendar() {
    // ICS generation or simple alert
    alert("Calendar event added (demo). Customize in script.");
}

function getDirections() {
    window.open('https://maps.google.com', '_blank');
}

// Initialize
window.onload = () => {
    // Update names
    document.querySelectorAll('.groom').forEach(el => el.textContent = groomName);
    document.querySelectorAll('.bride').forEach(el => el.textContent = brideName);
    // Similar for titles
    
    populateGallery();
    startCountdown();
    personalize();
    
    // Event listeners
    musicToggle.addEventListener('click', toggleMusic);
    floatingToggle.addEventListener('click', toggleMusic);
    
    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Keyboard accessibility etc.
};

// Add more animations using Intersection Observer for fade-ins
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply to sections
document.querySelectorAll('section').forEach(section => {
    section.style.transition = 'all 0.8s ease';
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
});