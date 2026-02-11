// Heart rain animation replaced with better features
// Create floating stars background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Love Counter Functionality
function initializeCounters() {
    // Set custom days count
    const daysCount = 793;
    
    const dayCounter = document.getElementById('dayCounter');
    if (dayCounter) {
        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount <= daysCount) {
                dayCounter.textContent = currentCount;
                currentCount += Math.ceil(daysCount / 30);
            } else {
                dayCounter.textContent = daysCount;
                clearInterval(interval);
            }
        }, 20);
    }
}

// Quote Carousel Functionality
function initializeQuoteCarousel() {
    const quoteItems = document.querySelectorAll('.quote-item');
    const prevBtn = document.querySelector('.quote-btn.prev');
    const nextBtn = document.querySelector('.quote-btn.next');
    let currentIndex = 0;

    function updateActiveQuote() {
        quoteItems.forEach((item, index) => {
            item.classList.remove('active', 'prev-item');
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index < currentIndex) {
                item.classList.add('prev-item');
            }
        });
    }

    function nextQuote() {
        currentIndex = (currentIndex + 1) % quoteItems.length;
        updateActiveQuote();
    }

    function prevQuote() {
        currentIndex = (currentIndex - 1 + quoteItems.length) % quoteItems.length;
        updateActiveQuote();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextQuote);
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);

    // Auto-advance quotes every 8 seconds
    setInterval(() => {
        nextQuote();
    }, 8000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.promise-card').forEach(card => {
    observer.observe(card);
});

// Add tilt effect to promise cards
document.querySelectorAll('.promise-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Initialize
createStars();
initializeCounters();
initializeQuoteCarousel();
