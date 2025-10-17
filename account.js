// account.js

// Store all Audit Log events in localStorage for simulation
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


document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in the footer (assuming you have a footer function/element)
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Utility Functions ---

    /**
     * Simulates sending a user registration/login email notification to the admin.
     * @param {string} type - 'REGISTRATION' or 'LOGIN'
     * @param {string} email - The user's email address
     */
    function sendAdminNotification(type, email) {
        console.log(`Sending Admin Email Notification: New ${type} event from ${email}`);
    }
    
    /**
     * Simulates saving user data to a server/database using localStorage.
     * @param {Object} userData - User details
     * @returns {boolean} - True if registration was successful
     */
    function registerUser(userData) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (users[userData.email]) {
            alert('Registration failed: An account with this email already exists.');
            return false;
        }
        users[userData.email] = userData;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Record the Registration event
        recordAuditLog('REGISTRATION', userData.email); 
        
        return true;
    }

    /**
     * Simulates logging in by checking credentials against stored data.
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {boolean} - True if credentials match
     */
    function loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const user = users[email];
        
        if (user && user.password === password) {
            // Simulate setting a session/token
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Record the Login event
            recordAuditLog('LOGIN', email); 
            
            return true;
        }
        return false;
    }


    // --- Form Handlers (These are used by account.html) ---

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (loginForm.checkValidity()) {
                if (loginUser(email, password)) {
                    sendAdminNotification('LOGIN', email); 
                    alert('Login Successful! Redirecting to the dashboard.');
                    
                    window.location.href = 'dashboard.html'; 
                } else {
                    alert('Login Failed: Invalid email or password. Please try again.');
                }
            }
            loginForm.classList.add('was-validated');
        }, false);
    }
    
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const passwordInput = document.getElementById('passwordReg');
            const confirmInput = document.getElementById('confirmPassword');
            const emailInput = document.getElementById('emailReg');

            // Password Match Validation (Client-side)
            if (passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity("Passwords must match.");
            } else {
                confirmInput.setCustomValidity(""); 
            }

            if (registrationForm.checkValidity()) {
                
                const userData = {
                    companyName: document.getElementById('companyName').value,
                    fullName: document.getElementById('fullName').value,
                    email: emailInput.value,
                    password: passwordInput.value, 
                    registrationDate: new Date().toISOString(),
                    status: 'active'
                };

                if (registerUser(userData)) {
                    sendAdminNotification('REGISTRATION', userData.email); 
                    
                    alert('Registration Complete! Please log in now with your new credentials.');
                    
                    registrationForm.reset();
                    registrationForm.classList.remove('was-validated');

                    const loginTabButton = document.getElementById('login-tab');
                    if (loginTabButton) {
                        const bsTab = new bootstrap.Tab(loginTabButton);
                        bsTab.show();
                    }
                }
            }
            registrationForm.classList.add('was-validated');
        }, false);
    }
    
    
    // --- Dashboard Logout Handler Update (Applies to dashboard.html script) ---
    // NOTE: This assumes the logout logic is still needed for dashboard.html if you want to reuse this file.
    // If the logout button is only handled on dashboard.html's inline script, you don't need this block here.
    // However, if you want account.js to handle dashboard logout for centralization:
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            alert('You have been successfully logged out.');
            window.location.href = 'account.html'; // 🔑 UPDATED: Redirect to new account page
        });
    }
});
// account.js

// Store all Audit Log events in localStorage for simulation (functions remain the same)
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


document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in the footer (assuming you have a footer function/element)
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Utility Functions ---

    function sendAdminNotification(type, email) {
        console.log(`Sending Admin Email Notification: New ${type} event from ${email}`);
    }
    
    function registerUser(userData) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (users[userData.email]) {
            alert('Registration failed: An account with this email already exists.');
            return false;
        }
        users[userData.email] = userData;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        recordAuditLog('REGISTRATION', userData.email); 
        return true;
    }

    function loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const user = users[email];
        
        if (user && user.password === password) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            recordAuditLog('LOGIN', email); 
            return true;
        }
        return false;
    }


    // --- Form Handlers (These are used by account.html) ---

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (loginForm.checkValidity()) {
                if (loginUser(email, password)) {
                    sendAdminNotification('LOGIN', email); 
                    alert('Login Successful! Redirecting to the homepage.');
                    
                    // 🎯 CRITICAL CHANGE: Redirect to index.html
                    window.location.href = 'index.html'; 
                } else {
                    alert('Login Failed: Invalid email or password. Please try again.');
                }
            }
            loginForm.classList.add('was-validated');
        }, false);
    }
    
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const passwordInput = document.getElementById('passwordReg');
            const confirmInput = document.getElementById('confirmPassword');

            if (passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity("Passwords must match.");
            } else {
                confirmInput.setCustomValidity(""); 
            }

            if (registrationForm.checkValidity()) {
                
                const userData = {
                    companyName: document.getElementById('companyName').value,
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('emailReg').value,
                    password: passwordInput.value, 
                    registrationDate: new Date().toISOString(),
                    status: 'active'
                };

                if (registerUser(userData)) {
                    sendAdminNotification('REGISTRATION', userData.email); 
                    
                    alert('Registration Complete! Please log in now with your new credentials.');
                    
                    registrationForm.reset();
                    registrationForm.classList.remove('was-validated');

                    const loginTabButton = document.getElementById('login-tab');
                    if (loginTabButton) {
                        const bsTab = new bootstrap.Tab(loginTabButton);
                        bsTab.show();
                    }
                }
            }
            registrationForm.classList.add('was-validated');
        }, false);
    }
});

// account.js

// Utility functions (remain the same)
function recordAuditLog(type, email) {
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    const newLog = {
        id: Date.now(),
        type: type, // LOGIN or REGISTRATION
        email: email,
        time: new Date().toLocaleString()
    };
    logs.unshift(newLog); 
    localStorage.setItem('auditLogs', JSON.stringify(logs.slice(0, 10)));
}

function sendAdminNotification(type, email) {
    console.log(`Sending Admin Email Notification: New ${type} event from ${email}`);
}

function registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (users[userData.email]) {
        alert('Registration failed: An account with this email already exists.');
        return false;
    }
    users[userData.email] = userData;
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    recordAuditLog('REGISTRATION', userData.email); 
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const user = users[email];
    
    if (user && user.password === password) {
        // Ensure not to store the password in sessionStorage
        const userSessionData = {...user};
        delete userSessionData.password; 
        sessionStorage.setItem('currentUser', JSON.stringify(userSessionData));
        recordAuditLog('LOGIN', email); 
        return true;
    }
    return false;
}


// --- Form Handlers ---
document.addEventListener('DOMContentLoaded', function() {
    
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (loginForm.checkValidity()) {
                if (loginUser(email, password)) {
                    sendAdminNotification('LOGIN', email); 
                    alert('Login Successful! Redirecting to the homepage.');
                    // Redirect to index.html after login
                    window.location.href = 'index.html'; 
                } else {
                    alert('Login Failed: Invalid email or password. Please try again.');
                }
            }
            loginForm.classList.add('was-validated');
        }, false);
    }
    
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const passwordInput = document.getElementById('passwordReg');
            const confirmInput = document.getElementById('confirmPassword');

            // Custom validation for password match
            if (passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity("Passwords must match.");
            } else {
                confirmInput.setCustomValidity(""); 
            }
            
            // Re-check form validity after setting custom message
            if (registrationForm.checkValidity()) {
                
                // 🔑 CRITICAL CHANGE: Capture new fields 🔑
                const userData = {
                    companyName: document.getElementById('companyName').value,
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('emailReg').value,
                    gender: document.getElementById('gender').value, // NEW
                    contactNumber: document.getElementById('contactNumber').value, // NEW (Optional, captured as is)
                    password: passwordInput.value, 
                    registrationDate: new Date().toISOString(),
                    status: 'active'
                };

                if (registerUser(userData)) {
                    sendAdminNotification('REGISTRATION', userData.email); 
                    
                    alert('Registration Complete! Please log in now with your new credentials.');
                    
                    registrationForm.reset();
                    registrationForm.classList.remove('was-validated');

                    // Switch back to the Login tab automatically
                    const loginTabButton = document.getElementById('login-tab');
                    if (loginTabButton) {
                        const bsTab = new bootstrap.Tab(loginTabButton);
                        bsTab.show();
                    }
                }
            }
            registrationForm.classList.add('was-validated');
        }, false);
    }
});


