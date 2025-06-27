// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            const icon = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            themeToggle.innerHTML = icon;
        });
    }

    // Typing animation
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const words = [
            { text: 'Student', color: '#10B981' },
            { text: 'Car/Motorcycle Enthusiast', color: '#F59E0B' },
            { text: 'Tech Enthusiast', color: '#3B82F6' },
            { text: 'Web Developer', color: '#EF4444' },
            { text: 'Problem Solver', color: '#8B5CF6' }
        ];
        let wordIndex = 0;
        let letterIndex = 0;
        let typing = true;

        function type() {
            if (wordIndex >= words.length) wordIndex = 0;
            
            const currentWord = words[wordIndex];
            
            if (typing) {
                typedTextSpan.textContent = currentWord.text.slice(0, ++letterIndex);
                typedTextSpan.style.color = currentWord.color;
                if (letterIndex === currentWord.text.length) {
                    typing = false;
                    setTimeout(type, 2000);
                } else {
                    setTimeout(type, 100);
                }
            } else {
                typedTextSpan.textContent = currentWord.text.slice(0, --letterIndex);
                if (letterIndex === 0) {
                    typing = true;
                    wordIndex++;
                    setTimeout(type, 300);
                } else {
                    setTimeout(type, 50);
                }
            }
        }

        type(); // Start the typing animation
    }

    // Back to Top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Simple filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Show/hide projects
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });
});
