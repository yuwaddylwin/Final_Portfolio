document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!validateForm(name, email, message)) return;
            
            try {
                // Send data to server
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        name: name,
                        email: email,
                        message: message
                    })
                });
                
                if (response.ok) {

                    const successMessage = document.getElementById('success-message');
                    if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    }

                    setTimeout(() => {
                        if (successMessage) {
                            successMessage.style.display = 'none';
                        }
                    }, 5000);

                
                    // Show confirmation 
                    showConfirmation({
                        name: name,
                        email: email,
                        message: message
                    });
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
                
            } catch (error) {
                console.error('Error:', error);
                showError('form-error', 'There was an error submitting your message');
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function validateForm(name, email, message) {
        let isValid = true;
        
        if (!name) {
            showError('name-error', 'Please enter your name');
            isValid = false;
        }
        
        if (!email) {
            showError('email-error', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!message) {
            showError('message-error', 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showConfirmation(data) {
        const confirmation = document.getElementById('confirmation-message');
        if (confirmation) {
            document.getElementById('confirmation-email').textContent = data.email;
            document.getElementById('confirmation-name').textContent = data.name;
            document.getElementById('confirmation-message-text').textContent = data.message;
            confirmation.style.display = 'block';
            confirmation.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }

    // Menu bar
    const toggle = document.getElementById('menu-toggle');
        const navLinks = document.querySelector('.right');
    
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
        });
    
    
});

