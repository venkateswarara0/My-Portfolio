// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about-content, .project-card, .skill-item, .contact-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add slide animations
    const slideLeftElements = document.querySelectorAll('.about-text, .contact-info');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.about-image, .contact-form');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        setTimeout(() => {
            typeWriter(titleName, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Skill progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const resultDiv = document.getElementById('result');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        resultDiv.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Submit to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Success
                resultDiv.innerHTML = '<div style="color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 5px; border: 1px solid #10b981;">✅ Thank you! Your message has been sent successfully.</div>';
                resultDiv.style.display = 'block';
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();
            } else {
                // Error
                resultDiv.innerHTML = '<div style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 5px; border: 1px solid #ef4444;">❌ Something went wrong. Please try again.</div>';
                resultDiv.style.display = 'block';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            // Network error
            resultDiv.innerHTML = '<div style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 5px; border: 1px solid #ef4444;">❌ Network error. Please check your connection and try again.</div>';
            resultDiv.style.display = 'block';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        
        // Reset button after 5 seconds on success
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        transition: all 0.1s ease;
    `;
    
    document.body.appendChild(trail);
    mouseTrail.push(trail);
    
    if (mouseTrail.length > maxTrailLength) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
    
    // Fade out trail elements
    mouseTrail.forEach((trail, index) => {
        const opacity = 1 - (index / maxTrailLength);
        trail.style.opacity = opacity;
        trail.style.transform = `scale(${1 - (index / maxTrailLength) * 0.5})`;
    });
});

// Remove mouse trail when leaving window
document.addEventListener('mouseleave', () => {
    mouseTrail.forEach(trail => trail.remove());
    mouseTrail = [];
});

// Particle effect for hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat 6s linear infinite;
    `;
    
    document.querySelector('.hero-background').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 300);

// Code window typing effect
function typeCode() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;
    
    const originalCode = codeElement.textContent;
    const lines = originalCode.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    
    codeElement.innerHTML = '';
    
    function typeNextChar() {
        if (currentLine < lines.length) {
            if (currentChar < lines[currentLine].length) {
                codeElement.innerHTML += lines[currentLine][currentChar];
                currentChar++;
                setTimeout(typeNextChar, 50);
            } else {
                codeElement.innerHTML += '\n';
                currentLine++;
                currentChar = 0;
                setTimeout(typeNextChar, 100);
            }
        }
    }
    
    setTimeout(typeNextChar, 2000);
}

// Initialize code typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeCode, 1000);
});

// Glitch effect for logo
function addGlitchEffect() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            logo.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #00ff00
            `;
            
            setTimeout(() => {
                logo.style.textShadow = '';
            }, 200);
        }
    }, 100);
}

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addGlitchEffect, 3000);
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #3b82f6);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingScreen);

// Remove loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
}); 