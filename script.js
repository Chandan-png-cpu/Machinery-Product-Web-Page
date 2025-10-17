document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Automatically set the current year in the footer's copyright notice
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with a smooth behavior
                // Adjust for the sticky navbar height
                const offset = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
             // Collapse the navbar on mobile after clicking a link
             const navbarCollapse = document.getElementById('navbarNav');
             // Uses Bootstrap's native JS to collapse the element
             if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                 const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                 bsCollapse.hide();
             }
        });
    });


    // 3. Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission (page reload)

            // Perform Bootstrap's built-in form validation (checks 'required' attributes)
            if (contactForm.checkValidity()) {
                // SUCCESS: Show the response message
                alert('Thank you for your inquiry, ' + contactForm.querySelector('input[type="text"]').value + '! We will review your request and get back to you shortly.');
                
                // Clean up
                contactForm.reset();
                contactForm.classList.remove('was-validated'); 
            } else {
                // FAILURE: Bootstrap's default error messages will appear.
                event.stopPropagation(); 
            }
            
            // Apply Bootstrap's validation styles to show feedback
            contactForm.classList.add('was-validated');
        });
    }

});
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Automatically set the current year in the footer's copyright notice
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth scrolling for navigation links (only on index.html)
    // Note: The contact link no longer uses smooth scroll, it loads contact.html
    if (document.body.classList.contains('index-page') || window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); 
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offset = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
                // Collapse the navbar on mobile
                 const navbarCollapse = document.getElementById('navbarNav');
                 if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                     const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                     bsCollapse.hide();
                 }
            });
        });
    }


    // 3. Handle the 'Get Notified' Form Submission (on index.html)
    const emailForm = document.getElementById('emailNotificationForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            if (emailForm.checkValidity()) {
                
                // -------------------------------------------------------------------
                // 📧 EMAIL SENDING LOGIC (PLACEHOLDER) 📧
                // 
                // IMPORTANT: You CANNOT send emails directly from a browser (front-end JS)
                // for security reasons. You must use a third-party service or a backend server.
                // 
                // Options:
                // 1. **EmailJS/Formspree/Netlify Forms:** Connect your form's action attribute to their API endpoint.
                // 2. **Custom Backend (Node/Python/PHP):** Send the data to your own server, which then uses an email library (like Nodemailer) to send the notification.
                // -------------------------------------------------------------------
                
                const formData = new FormData(emailForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simulate sending email and getting notified
                console.log("Sending Notification Email...");
                console.log(`To: Company Admin | From: ${name} (${email}) | Message: ${message}`);
                
                alert('Success! Thank you, ' + name + '. Your inquiry has been sent to our team, and we will notify you shortly!');
                
                // Reset form
                emailForm.reset();
                emailForm.classList.remove('was-validated'); 

            } else {
                event.stopPropagation(); 
            }
            
            emailForm.classList.add('was-validated');
        });
    }

});
document.addEventListener('DOMContentLoaded', function() {
    // Set year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- UX: Cookie Consent Logic ---
    const banner = document.getElementById('cookieConsentBanner');
    const acceptButton = document.getElementById('acceptCookies');
    const cookieName = 'myceries_cookies_accepted';

    // Check if the user has already accepted cookies
    if (localStorage.getItem(cookieName) !== 'true' && banner) {
        // Show the banner after a short delay for smooth page loading
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000); 
    }

    // Handle acceptance click
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            localStorage.setItem(cookieName, 'true');
            banner.style.opacity = '0';
            // Wait for fade transition before hiding completely
            setTimeout(() => {
                banner.style.display = 'none';
            }, 500);
        });
    }

    // --- Index.html Form Submission (Non-login form) ---
    const emailNotificationForm = document.getElementById('emailNotificationForm');
    if (emailNotificationForm) {
        emailNotificationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Simple validation check
            if (emailNotificationForm.checkValidity()) {
                const formData = new FormData(emailNotificationForm);
                const name = formData.get('name');
                const email = formData.get('email');
                
                // 📧 EMAIL NOTIFICATION SIMULATION 📧
                console.log("Sending General Inquiry Notification Email...");
                console.log(`To: Sales Team | Subject: New Web Inquiry from ${name}`);
                console.log(`Details: ${email}, Message: ${formData.get('message')}`);

                alert(`Inquiry sent! Thank you, ${name}. We will be in touch shortly at ${email}.`);
                emailNotificationForm.reset();
                emailNotificationForm.classList.remove('was-validated');
            } else {
                emailNotificationForm.classList.add('was-validated');
            }
        });
    }
});
// --- In your contact.html inline script ---

// ADD THIS NEW FUNCTION at the top of the script
function recordAuditLog(type, email) {
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    const newLog = {
        id: Date.now(),
        type: type, // LOGIN or REGISTRATION
        email: email,
        time: new Date().toLocaleString()
    };
    logs.unshift(newLog); // Add to the beginning
    localStorage.setItem('auditLogs', JSON.stringify(logs.slice(0, 10))); // Keep only the last 10
}


// REPLACE the loginForm handler:
loginForm.addEventListener('submit', function(event) {
    // ... existing validation code ...
    if (loginForm.checkValidity()) {
        if (loginUser(email, password)) {
            sendAdminNotification('LOGIN', email); // Admin Email Notification
            recordAuditLog('LOGIN', email); // 💻 RECORD AUDIT LOG 
            alert('Login Successful! You are now logged in and can access monitoring tools.');
            window.location.href = 'dashboard.html'; 
        } else {
            alert('Login Failed: Invalid email or password. Please try again.');
        }
    }
    // ... rest of the code ...
}, false);


// REPLACE the registrationForm handler:
registrationForm.addEventListener('submit', function(event) {
    // ... existing validation code ...
    if (registrationForm.checkValidity()) {
        
        // ... existing userData object creation ...

        if (registerUser(userData)) {
            sendAdminNotification('REGISTRATION', userData.email); // Admin Email Notification
            recordAuditLog('REGISTRATION', userData.email); // 💻 RECORD AUDIT LOG 
            
            alert('Registration Complete! Please log in now with your new credentials.');
            
            // ... existing reset and tab switch code ...
        }
    }
    // ... rest of the code ...
}, false);
