// Function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    let fullName = document.getElementById('full-name').value.trim();
    let email = document.getElementById('signup-email').value.trim();
    let password = document.getElementById('signup-password').value.trim();

    if (!isValidEmail(email)) {
        displayErrorMessage('signup-error', 'Invalid email format!');
        return;
    }
    if (password.length < 6) {
        displayErrorMessage('signup-error', 'Password must be at least 6 characters long.');
        return;
    }

    // Store user details in local storage (for demo purposes)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // Redirect to login page after signup
    window.location.href = "home.html";
});

// Handle Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value.trim();
    let password = document.getElementById('login-password').value.trim();
    let savePassword = document.getElementById('save-password')?.checked; // Checkbox for saving password

    let storedEmail = localStorage.getItem('userEmail');
    let storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        if (savePassword) {
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('savedPassword', password);
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
        }

        window.location.href = "home.html"; // Redirect to welcome page
    } else {
        displayErrorMessage('login-error', 'Invalid email or password. Please try again.');
    }
});

// Auto-fill saved credentials on page load
window.addEventListener('load', function() {
    let savedEmail = localStorage.getItem('savedEmail');
    let savedPassword = localStorage.getItem('savedPassword');

    if (savedEmail && savedPassword) {
        document.getElementById('login-email').value = savedEmail;
        document.getElementById('login-password').value = savedPassword;
        document.getElementById('save-password').checked = true; // Auto-check Save Password
    }
});

// Auto Logout after 5 minutes of inactivity
let logoutTimer;
function resetLogoutTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        window.location.href = "index.html"; // Redirect to login page
    }, 5 * 60 * 1000); // 5 minutes
}

// Start logout timer on user activity
document.addEventListener('mousemove', resetLogoutTimer);
document.addEventListener('keydown', resetLogoutTimer);
resetLogoutTimer(); // Initialize on page load

// Function to display error messages inline
function displayErrorMessage(elementId, message) {
    let errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = "red";
    }
}




document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("your_emailjs_user_id"); // Replace with your EmailJS User ID
});

function sendEmail() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let subjectError = document.getElementById("subjectError");
    let messageError = document.getElementById("messageError");

    // Reset errors
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    subjectError.innerHTML = "";
    messageError.innerHTML = "";

    // Validation
    if (name === "") {
        nameError.innerHTML = "Name is required";
        return;
    }

    if (email === "milan.adhi02@gmail.com" || !email.includes("@")) {
        emailError.innerHTML = "Valid email is required";
        return;
    }

    if (subject === "") {
        subjectError.innerHTML = "Subject is required";
        return;
    }

    if (message === "") {
        messageError.innerHTML = "Message is required";
        return;
    }

    let templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    emailjs.send("milankazi65@gmail.com", "milan.adhi.02@gmail.com", templateParams)
        .then(function (response) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
        }, function (error) {
            alert("Failed to send message. Please try again.");
        });
}
