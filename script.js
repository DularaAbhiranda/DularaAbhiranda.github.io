// Loading animation script
// Loading animation script
document.addEventListener('DOMContentLoaded', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    
    // Simulate loading time 
    setTimeout(() => {
      // Add 'loaded' class to body to trigger fade out animation
      document.body.classList.add('loaded');
      
      // Remove loader completely after fade animation
      setTimeout(() => {
        if (loaderWrapper) {
          loaderWrapper.style.display = 'none';
        }
      }, 500);
    }, 3500); // Show loader for 3.5 seconds (matches animation time)
    
    // Fallback in case something goes wrong
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 6000); // Timeout after 6 seconds regardless
  });
  
  // Rest of your existing script.js code below


// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    enableLightTheme();
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        enableDarkTheme();
    } else {
        enableLightTheme();
    }
});

function enableLightTheme() {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
}

function enableDarkTheme() {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Interactive background effect
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Particles array
const particles = [];
const particleCount = 100; // Number of particles
let mouseX = width / 2;
let mouseY = height / 2;

// Update canvas size when window is resized
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Track mouse position
window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// For touch devices
window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = getComputedStyle(document.body).getPropertyValue('--text-color');
    }

    update() {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Max distance to be affected by mouse
        
        if (distance < maxDistance) {
            // Move particles away from mouse
            const force = (maxDistance - distance) / maxDistance;
            this.speedX -= (dx / distance) * force * 0.2;
            this.speedY -= (dy / distance) * force * 0.2;
        }
        
        // Apply some friction to prevent extreme speeds
        this.speedX *= 0.95;
        this.speedY *= 0.95;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Draw connecting lines between particles
function drawLines() {
    const lineMaxDistance = 150; // Maximum distance to draw a line
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < lineMaxDistance) {
                // Make line opacity based on distance
                const opacity = (lineMaxDistance - distance) / lineMaxDistance;
                ctx.strokeStyle = `rgba(${getColorChannels()}, ${opacity * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Helper function to get color channels based on current theme
function getColorChannels() {
    const isDark = document.body.classList.contains('dark-theme');
    return isDark ? '255, 255, 255' : '0, 0, 0';
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawLines();
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Update particle colors if theme changes
    particles.forEach(particle => {
        particle.color = getComputedStyle(document.body).getPropertyValue('--text-color');
    });
    
    requestAnimationFrame(animate);
}

// Initialize and start animation
initParticles();
animate();

// Make sure theme toggle also updates particle colors
themeToggle.addEventListener('click', () => {
    setTimeout(() => {
        particles.forEach(particle => {
            particle.color = getComputedStyle(document.body).getPropertyValue('--text-color');
        });
    }, 50);
});

// Optional modification to only show typing effect on first visit
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    const textToType = "Hi, everyone!\nI'm Dulara Abhiranda.";
    
    // Check if this is first visit
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit - show typing effect
      let i = 0;
      let speed = 100;
      
      function typeWriter() {
        if (i < textToType.length) {
          if (textToType.charAt(i) === '\n') {
            textElement.innerHTML += '<br>';
          } else {
            textElement.innerHTML += textToType.charAt(i);
          }
          i++;
          setTimeout(typeWriter, speed);
        }
      }
      
      setTimeout(() => {
        typeWriter();
      }, 500);
      
      // Set flag that user has visited
      localStorage.setItem('hasVisited', 'true');
    } else {
      // Not first visit - show text immediately
      textElement.innerHTML = textToType.replace('\n', '<br>');
    }
  });

// Function to set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the link's href and extract the page name or hash
        const linkPage = link.getAttribute('href');
        
        // Check if we're on the index.html or / and the link is to #about
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === '#about') {
            // Do nothing, don't set this as active
        }
        // For about.html page, activate the About link
        else if (currentPage === 'about.html' && linkPage === '#about') {
            link.classList.add('active');
        }
        // Add more conditions for other pages as needed
    });
}




// Add animation to education cards
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100 + index * 150);
});




// About page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page-specific elements
    initializeAboutPage();
});

function initializeAboutPage() {
    // Add animation to the about cards when they come into view
    const aboutCards = document.querySelectorAll('.about-card');
    const testimonialsCards = document.querySelectorAll('.testimonial-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Initialize Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and timeline items
    aboutCards.forEach(card => {
        observer.observe(card);
        // Add initial hidden class
        card.classList.add('hidden');
    });
    
    testimonialsCards.forEach(card => {
        observer.observe(card);
        // Add initial hidden class
        card.classList.add('hidden');
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
        // Add initial hidden class
        item.classList.add('hidden');
    });
    
    // Add hover effects to testimonial cards
    testimonialsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.testimonial-text').classList.add('expanded');
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.testimonial-text').classList.remove('expanded');
        });
    });
    
    // Make the view source links open in a new tab
    document.querySelectorAll('.view-source').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Add CSS animation classes
document.head.insertAdjacentHTML('beforeend', `
<style>
    .about-card.hidden,
    .testimonial-card.hidden,
    .timeline-item.hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .about-card.animate,
    .testimonial-card.animate,
    .timeline-item.animate {
        animation: fadeInUp 0.6s forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .testimonial-text {
        max-height: 100px;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .testimonial-text.expanded {
        max-height: 300px;
    }
</style>
`);



//Script for experience page


// Experience page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeExperiencePage();
});

function initializeExperiencePage() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const achievements = document.querySelectorAll('.achievement-item');
    
    // Add initial hidden class for fade-in effect
    experienceCards.forEach(card => card.classList.add('hidden'));
    timelineItems.forEach(item => item.classList.add('hidden'));
    achievements.forEach(achievement => achievement.classList.add('hidden'));

    // Trigger animations on page load with delay
    setTimeout(() => {
        experienceCards.forEach((card, index) => {
            setTimeout(() => card.classList.add('animate'), index * 150);
        });

        timelineItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('animate'), index * 150);
        });

        achievements.forEach((achievement, index) => {
            setTimeout(() => achievement.classList.add('animate'), index * 150);
        });
    }, 300); // Slight delay after page load

    // Intersection Observer for scroll-based animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    experienceCards.forEach(card => observer.observe(card));
    timelineItems.forEach(item => observer.observe(item));
    achievements.forEach(achievement => observer.observe(achievement));
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.innerHTML = `
    .experience-card.hidden,
    .timeline-item.hidden,
    .achievement-item.hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .experience-card.animate,
    .timeline-item.animate,
    .achievement-item.animate {
        animation: fadeInUp 0.6s forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);













document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats cards
    initStatsCards();
    
    // Handle theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Update stats cards when theme changes
            setTimeout(() => {
                updateStatsCardStyles();
            }, 100);
        });
    }
});

// Initialize stats cards with animations
function initStatsCards() {
    // Animate stat boxes
    animateStatBoxes();
    
    // Add hover effect to stat boxes
    addStatBoxHoverEffects();
    
    // Update stats from placeholder data (would connect to APIs in production)
    updateStatsPlaceholders();
}

// Animate stat boxes with a staggered fade-in
function animateStatBoxes() {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach((box, index) => {
        // Set initial state
        box.style.opacity = '0';
        box.style.transform = 'translateY(10px)';
        box.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        // Animate with staggered delay
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 50 * index);
    });
}

// Add hover effects to stat boxes
function addStatBoxHoverEffects() {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            const value = this.querySelector('.stat-value');
            if (value) {
                value.style.transform = 'scale(1.1)';
                value.style.transition = 'transform 0.2s ease';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const value = this.querySelector('.stat-value');
            if (value) {
                value.style.transform = 'scale(1)';
            }
        });
    });
}

// Update card styles based on theme
function updateStatsCardStyles() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach(box => {
        if (isDarkTheme) {
            box.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        } else {
            box.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        }
    });
}

// Update stats with placeholder data
function updateStatsPlaceholders() {
    // GitHub stats
    setValueWithCountAnimation('github-repos', 15);
    setValueWithCountAnimation('github-stars', 28);
    setValueWithCountAnimation('github-contributions', 342);
    setValueWithCountAnimation('github-followers', 24);
    
    // TryHackMe stats
    setValueWithCountAnimation('thm-rank', 12458, value => value.toLocaleString());
    setValueWithCountAnimation('thm-rooms', 37);
    setValueWithCountAnimation('thm-badges', 8);
    setValueWithCountAnimation('thm-streak', 15);
    
    // HackTheBox stats
    document.getElementById('htb-rank').textContent = 'Hacker';
    setValueWithCountAnimation('htb-systems', 18);
    setValueWithCountAnimation('htb-challenges', 12);
    setValueWithCountAnimation('htb-points', 250);
    
    // HackerRank stats
    document.getElementById('hr-rank').textContent = '5 ★';
    setValueWithCountAnimation('hr-problems', 125);
    setValueWithCountAnimation('hr-certificates', 3);
    
    // Set star ratings on badges if they exist
    const pythonBadge = document.querySelector('.badge-mini.python');
    if (pythonBadge) {
        pythonBadge.textContent = 'Python ★★★★★';
    }
    
    const javaBadge = document.querySelector('.badge-mini.java');
    if (javaBadge) {
        javaBadge.textContent = 'Java ★★★★☆';
    }
}

// Helper function to animate counting up to a value
function setValueWithCountAnimation(elementId, targetValue, formatFunction) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Default format function if none provided
    formatFunction = formatFunction || (value => value.toString());
    
    // Starting from 0
    let currentValue = 0;
    const duration = 1500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const valueIncrement = targetValue / totalFrames;
    
    // Use requestAnimationFrame for smooth animation
    function updateValue(frame) {
        currentValue += valueIncrement;
        
        if (frame === totalFrames) {
            currentValue = targetValue;
        }
        
        element.textContent = formatFunction(Math.floor(currentValue));
        
        if (frame < totalFrames) {
            requestAnimationFrame(() => updateValue(frame + 1));
        }
    }
    
    // Start the animation
    requestAnimationFrame(() => updateValue(1));
}

// Function to update stats from APIs (placeholder - would require API implementation)
function updateStatsFromAPIs() {
    // GitHub stats API call would go here
    // Example: fetch('https://api.github.com/users/DularaAbhiranda')
    //    .then(response => response.json())
    //    .then(data => {
    //        setValueWithCountAnimation('github-repos', data.public_repos);
    //        setValueWithCountAnimation('github-stars', calculateTotalStars(data));
    //    });
    
    // For now, we're using placeholder data in updateStatsPlaceholders()
    
    // You can implement actual API calls to:
    // - GitHub API: https://api.github.com/users/DularaAbhiranda
    // - TryHackMe API (if available)
    // - HackTheBox API (if available)
    // - HackerRank API (if available)
}





// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the certification slider
    initCertificationSlider();
    
    // Initialize badges with animation
    initBadgesAnimation();
});

function initCertificationSlider() {
    const slider = document.querySelector('.certification-slider');
    const slides = document.querySelectorAll('.certification-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots based on number of slides
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
        
        // Add click event to each dot
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    }
    
    // Get all dots
    const dots = document.querySelectorAll('.dot');
    
    // Set initial state
    updateSliderState();
    
    // Add click event to previous button
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderState();
        }
    });
    
    // Add click event to next button
    nextBtn.addEventListener('click', function() {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
            updateSliderState();
        }
    });
    
    // Add swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        
        if (touchEndX < touchStartX - minSwipeDistance) {
            // Swipe left
            if (currentIndex < slideCount - 1) {
                currentIndex++;
                updateSliderState();
            }
        }
        
        if (touchEndX > touchStartX + minSwipeDistance) {
            // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderState();
            }
        }
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSliderState();
    }
    
    function updateSliderState() {
        // Calculate the scroll position
        const slideWidth = slider.clientWidth;
        const scrollPosition = currentIndex * slideWidth;
        
        // Scroll to the current slide
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Show/hide prev/next buttons based on position
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex === slideCount - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex === slideCount - 1 ? 'none' : 'auto';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        setTimeout(updateSliderState, 100);
    });
    
    // Auto-advance the slider every 5 seconds
    let autoSlideInterval = setInterval(autoAdvance, 5000);
    
    function autoAdvance() {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSliderState();
    }
    
    // Stop auto-advance when user interacts with slider
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(autoAdvance, 5000);
    });
    
    // Pause auto-advance when user is scrolling the page
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearInterval(autoSlideInterval);
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            autoSlideInterval = setInterval(autoAdvance, 5000);
        }, 2000);
    });
}

function initBadgesAnimation() {
    // Get all badge items
    const badges = document.querySelectorAll('.badge-item');
    
    if (!badges.length) return;
    
    // Add intersection observer to animate badges when they come into view
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateBadgeEntry(entry.target, entries.indexOf(entry));
                badgeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe each badge
    badges.forEach((badge) => {
        badgeObserver.observe(badge);
        // Set initial state
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
    });
    
    function animateBadgeEntry(badge, index) {
        // Add delay based on index for staggered animation
        setTimeout(() => {
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 100);
    }
    
    // Add hover effect with subtle rotation animation
    badges.forEach((badge) => {
        badge.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.5s ease';
                img.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        badge.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.5s ease';
                img.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    const originalImage = document.querySelector('.original-image');
    
    function startGlitch() {
      // Randomly determine if we should do a minor or major glitch
      const glitchIntensity = Math.random() > 0.7 ? 'major' : 'minor';
      
      // Add glitching class to start the effect
      profileImage.classList.add('glitching');
      
      if (glitchIntensity === 'major') {
        // For major glitches, show the hacker image by reducing original image opacity
        originalImage.style.opacity = '0';
        
        // Create RGB split effect
        originalImage.style.transform = `translate3d(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px, 0)`;
        originalImage.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 5 + 1})`;
        
        // After a moment, start bringing back the original image
        setTimeout(() => {
          originalImage.style.opacity = '0.3';
          setTimeout(() => {
            originalImage.style.opacity = '0.6';
            setTimeout(() => {
              // Restore normal
              endGlitch();
            }, 300);
          }, 200);
        }, 500);
      } else {
        // For minor glitches, just do some visual distortion
        originalImage.style.transform = `translate3d(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px, 0)`;
        originalImage.style.filter = `brightness(1.2) contrast(1.2)`;
        
        // End the minor glitch sooner
        setTimeout(endGlitch, 300);
      }
    }
    
    function endGlitch() {
      profileImage.classList.remove('glitching');
      originalImage.style.opacity = '';
      originalImage.style.transform = '';
      originalImage.style.filter = '';
    }
    
    // Trigger glitch at random intervals
    function scheduleGlitch() {
      // Random time between 2 and 10 seconds
      const nextGlitchTime = Math.random() * 8000 + 2000;
      
      setTimeout(() => {
        startGlitch();
        scheduleGlitch(); // Schedule the next glitch
      }, nextGlitchTime);
    }
    
    // Start the random glitch cycle
    scheduleGlitch();
    
    // Also trigger on hover for interactive effect
    profileImage.addEventListener('mouseenter', startGlitch);
    profileImage.addEventListener('mouseleave', endGlitch);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const submitButton = document.getElementById('submit-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (!nameInput.value.trim()) {
                showNotification('Please enter your name', 'error');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim()) {
                showNotification('Please enter your email', 'error');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }
            
            if (!subjectInput.value.trim()) {
                showNotification('Please enter a subject', 'error');
                subjectInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                showNotification('Please enter your message', 'error');
                messageInput.focus();
                return;
            }
            
            // Simulate form submission success
            // In a real implementation, you would send this data to a server
            showNotification('Message sent successfully!', 'success');
            resetForm();
        });
    }

    // Make social cards clickable
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', function() {
            const platform = this.querySelector('h3').textContent;
            const username = this.querySelector('p').textContent;
            
            let url;
            switch(platform) {
                case 'Email':
                    url = `mailto:${username}`;
                    break;
                case 'X (Twitter)':
                    url = `https://twitter.com/${username}`;
                    break;
                case 'GitHub':
                    url = `https://github.com/${username}`;
                    break;
                case 'YouTube':
                    url = `https://www.youtube.com/@CybersonaLK`;
                    break;
                case 'LinkedIn':
                    url = `https://linkedin.com/${username}`;
                    break;
                case 'Instagram':
                    url = `https://instagram.com/${username}`;
                    break;
                default:
                    return;
            }
            
            window.open(url, '_blank');
        });
    });

    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function resetForm() {
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to the body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Add this to your existing script.js or include it here
document.addEventListener('DOMContentLoaded', function() {
    // Add notification styles if not already present in main CSS
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification.success {
            background-color: #4caf50;
        }
        
        .notification.error {
            background-color: #f44336;
        }
    `;
    document.head.appendChild(style);
});