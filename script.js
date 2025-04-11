document.addEventListener("DOMContentLoaded", function () {
    // jQuery-based effects
    $("#doctors-section").hide(); // Hide until content is loaded

    // Load doctor data via AJAX
    $.getJSON("doctors.json", function(doctors) {
        let html = "<ul>";
        doctors.forEach(doc => {
            html += `<li><strong>${doc.name}</strong> - ${doc.specialty}</li>`;
        });
        html += "</ul>";
        $("#doctors-section").html(html).fadeIn(1000);
    });

    // Notification popup logic
    function showNotification(message) {
        document.getElementById("notificationMessage").innerText = message;
        let modal = new bootstrap.Modal(document.getElementById("notificationModal"));
        modal.show();
    }

    // Smooth scroll
    document.querySelectorAll(".nav-link[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // Login
    document.getElementById("login-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "admin" && password === "password123") {
            showNotification("Login successful!");
            setTimeout(() => window.location.href = "index.html", 2000);
        } else {
            showNotification("Invalid username or password!");
        }
    });

    // Signup
    document.getElementById("signup-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("new-username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            showNotification("Passwords do not match!");
            return;
        }

        showNotification("Account created successfully!");
        setTimeout(() => window.location.href = "login.html", 2000);
    });

    // Appointment Simulation
    window.bookAppointment = function () {
        showNotification("Appointment booked successfully!");
        setTimeout(() => window.location.href = "login.html?redirect=appointment.html", 2000);
    };
});
