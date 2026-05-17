/* ============================================
   MAIN JAVASCRIPT
   Basic functionality for the website
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.pixel-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // NAVBAR BACKGROUND ON SCROLL
    // ============================================
    const nav = document.querySelector('.pixel-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(92, 75, 107, 0.1)';
        } else {
            nav.style.background = 'var(--bg-secondary)';
            nav.style.boxShadow = 'none';
        }
    });

    // ============================================
    // ANIMATE ELEMENTS ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards and devlog entries
    const animatedElements = document.querySelectorAll('.feature-card, .devlog-entry, .lore-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // LOAD MORE BUTTON (PLACEHOLDER)
    // ============================================
    const loadMoreBtn = document.querySelector('.load-more button');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Placeholder functionality
            this.textContent = 'No more posts yet! 🌸';
            this.disabled = true;
            this.style.opacity = '0.6';
        });
    }

    // ============================================
    // EASTER EGG: KONAMI CODE
    // ============================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Add fish rain effect
                createFishRain();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function createFishRain() {
        const fishEmojis = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦐', '🦀', '🐚', '🌊'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
                fish.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}vw;
                    font-size: ${20 + Math.random() * 30}px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fishFall ${3 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(fish);
                
                setTimeout(() => fish.remove(), 5000);
            }, i * 100);
        }
        
        // Add animation keyframes if not exists
        if (!document.querySelector('#fish-fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fish-fall-animation';
            style.textContent = `
                @keyframes fishFall {
                    to {
                        transform: translateY(110vh) rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

});
