// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger icon to 'X'
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Theme Toggler ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    themeToggle.addEventListener('click', () => {
        body.toggleAttribute('data-theme', 'light');
        const isLight = body.hasAttribute('data-theme');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // --- Dynamic Copyright Year ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // --- Password Strength Checker ---
    const passwordInput = document.getElementById('passwordInput');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthStatus = document.querySelector('.strength-status');
    const requirements = {
        length: document.getElementById('req-length'),
        upper: document.getElementById('req-upper'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };
    const visibilityToggle = document.getElementById('visibilityToggle');

    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
        });
    }
    
    if(visibilityToggle) {
        visibilityToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type');
            const icon = visibilityToggle.querySelector('i');
            if (type === 'password') {
                passwordInput.setAttribute('type', 'text');
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.setAttribute('type', 'password');
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        const statusText = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        const statusColors = {
            0: '#ff1a4d', 1: '#ff1a4d', 2: '#fb8c00', 3: '#fdd835', 4: '#00ff88'
        };

        const checks = {
            length: password.length >= 12,
            upper: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        for (let key in checks) {
            const reqElement = requirements[key];
            const icon = reqElement.querySelector('i');
            if (checks[key]) {
                strength++;
                reqElement.classList.add('valid');
                icon.classList.remove('fa-times-circle');
                icon.classList.add('fa-check-circle');
            } else {
                reqElement.classList.remove('valid');
                icon.classList.remove('fa-check-circle');
                icon.classList.add('fa-times-circle');
            }
        }
        
        strengthBar.setAttribute('data-strength', strength);
        strengthStatus.textContent = statusText[strength] || 'Too Weak';
        strengthStatus.style.color = statusColors[strength] || '#ff1a4d';
    }
});