document.addEventListener('DOMContentLoaded', () => {
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

    // Stats observer for triggering animation
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Update button text
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    if (btnPrimary) btnPrimary.textContent = 'Schedule a Free Consultation';
    if (btnSecondary) btnSecondary.textContent = 'Explore Our Cloud Solutions';

    // Form submission to Google Sheets
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    if (form && successMessage) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) {
                console.error('Submit button not found');
                return;
            }

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                mode: 'no-cors' // Use no-cors to avoid CORS issues
            })
                .then(response => {
                    // Since mode is 'no-cors', response.json() is not available
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    setTimeout(() => {
                        // Hide the form
                        form.classList.add('hidden');
                        // Show the success message
                        successMessage.classList.remove('hidden');
                        // Reset button for potential future use
                        submitButton.textContent = 'Send Message';
                        submitButton.style.background = '';
                        submitButton.disabled = false;
                        form.reset();
                    }, 2000);
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    alert('Error submitting form: ' + error.message);
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                });
        });
    } else {
        console.error('Form or success message element not found');
    }
});