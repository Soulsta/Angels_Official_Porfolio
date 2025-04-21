// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Back to Top button
const backToTopButton = document.getElementById('back-to-top');
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Page-specific functionality
if (document.getElementById('home')) {
    // Typing animation (only on index.html)
    const typedTextSpan = document.querySelector('.typed-text');
    const words = ['Student', 'Car/Motorcycle Enthusiast', 'Tech Enthusiast'];
    let wordIndex = 0;
    let letterIndex = 0;
    let typing = true;

    function type() {
        if (wordIndex >= words.length) wordIndex = 0;
        
        const currentWord = words[wordIndex];
        
        if (typing) {
            typedTextSpan.textContent = currentWord.slice(0, ++letterIndex);
            if (letterIndex === currentWord.length) {
                typing = false;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        } else {
            typedTextSpan.textContent = currentWord.slice(0, --letterIndex);
            if (letterIndex === 0) {
                typing = true;
                wordIndex++;
                setTimeout(type, 300);
            } else {
                setTimeout(type, 50);
            }
        }
    }

    type();

    // Project filtering (only on index.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            
            projectCards.forEach(card => {
                card.classList.remove('visible');
                setTimeout(() => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                        setTimeout(() => card.classList.add('visible'), 100);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 300);
            });
        });
    });

    // Initial project card visibility
    projectCards.forEach(card => {
        card.classList.add('visible');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}




if (document.getElementById('contact')) {
    // Form validation (only on contact.html)
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    function validateInput(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        let errorMessage = '';

        if (input.value.trim() === '') {
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            errorMessage = 'Please enter a valid email';
        }

        input.classList.toggle('error', !!errorMessage);
        errorElement.textContent = errorMessage;
        return !errorMessage;
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) isValid = false;
        });

        if (isValid) {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            inputs.forEach(input => {
                document.getElementById(`${input.id}-error`).textContent = '';
                input.classList.remove('error');
            });
        }
    });
}