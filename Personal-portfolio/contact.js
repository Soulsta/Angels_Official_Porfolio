// Email JS code
   // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            const icon = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            themeToggle.innerHTML = icon;
        });

        // Initialize EmailJS
        (function() {
            emailjs.init("YaJdvaih-tcBSjCyN"); // Replace with your actual public key
        })();

        // Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const statusMessage = document.getElementById('status-message');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
            
            // Hide any previous status messages
            statusMessage.classList.remove('show');
            
            // Send email using EmailJS
            emailjs.sendForm('service_nr9tr1a', 'template_dl70ofm', this)
                .then(function() {
                    // Success
                    showStatusMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    // Error
                    console.error('EmailJS Error:', error);
                    showStatusMessage('error', 'Oops! Something went wrong. Please try again or email me directly.');
                })
                .finally(function() {
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                });
        });

        function showStatusMessage(type, message) {
            const statusMessage = document.getElementById('status-message');
            statusMessage.className = `status-message ${type} show`;
            statusMessage.textContent = message;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusMessage.classList.remove('show');
            }, 5000);
        }