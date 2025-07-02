// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Dynamic stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const raw = stat.textContent.trim();
        const match = raw.match(/(\d+)(\+|%|\/\d+)?/);
        if (!match) return;

        let target = parseInt(match[1], 10);
        const suffix = match[2] || '';
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) statsObserver.observe(statsSection);
});

statsObserver.observe(statsSection);
    document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn-primary').textContent = 'Schedule a Free Consultation';
    document.querySelector('.btn-secondary').textContent = 'Explore Our Cloud Solutions';
});