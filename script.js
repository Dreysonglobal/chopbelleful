// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== HERO SLIDESHOW =====
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (!slides.length) return;
    
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlide(slideIndex);
}

// Initialize slideshow
showSlide(slideIndex);

// Auto advance slides every 5 seconds (only on homepage)
if (document.querySelector('.hero')) {
    setInterval(nextSlide, 5000);
}

// Make currentSlide available globally for onclick
window.currentSlide = currentSlide;

// ===== MODAL (Registration Form) =====
const modal = document.getElementById('studentModal');
const openBtn = document.getElementById('openFormBtn');
const closeSpan = document.querySelector('.close');

if (openBtn && modal) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        modal.scrollTop = 0;
    });
}

if (closeSpan && modal) {
    closeSpan.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// ===== FORM SUBMISSION (WhatsApp) =====
const studentForm = document.getElementById('studentForm');
if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const course = document.getElementById('course')?.value || '';
        const message = document.getElementById('message')?.value.trim() || '';
        
        if (!fullname || !phone) {
            alert('Please fill in your name and phone number.');
            return;
        }
        
        let waMessage = `*New Student Registration - ChopBelleful Culinary School*%0A`;
        waMessage += `👤 *Name:* ${fullname}%0A`;
        waMessage += `📞 *Phone:* ${phone}%0A`;
        if (email) waMessage += `📧 *Email:* ${email}%0A`;
        waMessage += `📚 *Course:* ${course}%0A`;
        if (message) waMessage += `📝 *Notes:* ${message}%0A`;
        
        const waUrl = `https://wa.me/2349027525837?text=${waMessage}`;
        window.open(waUrl, '_blank');
        
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        studentForm.reset();
    });
}

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNav();

// ===== GALLERY FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== LIGHTBOX (Gallery) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const caption = document.getElementById('caption');

if (lightbox && galleryItems.length) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayText = item.querySelector('.overlay span')?.textContent || 'ChopBelleful';
            
            if (img) {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                caption.textContent = overlayText;
            }
        });
    });
    
    // Close lightbox
    document.querySelector('.close-lightbox')?.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== VIDEO PLAY/PAUSE TOGGLE =====
document.querySelectorAll('[data-video-toggle]').forEach(btn => {
    const videoId = btn.getAttribute('data-video-toggle');
    if (!videoId) return;

    const video = document.getElementById(videoId);
    if (!(video instanceof HTMLVideoElement)) return;

    const syncLabel = () => {
        const isPaused = video.paused;
        btn.setAttribute('aria-pressed', String(!isPaused));
        btn.innerHTML = isPaused
            ? '<i class="fas fa-play"></i> Play'
            : '<i class="fas fa-pause"></i> Pause';
    };

    btn.addEventListener('click', async () => {
        try {
            if (video.paused) {
                await video.play();
            } else {
                video.pause();
            }
        } finally {
            syncLabel();
        }
    });

    video.addEventListener('play', syncLabel);
    video.addEventListener('pause', syncLabel);
    syncLabel();
});
