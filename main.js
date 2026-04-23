document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '12px 0';
                header.style.background = 'rgba(3, 3, 3, 0.8)';
            } else {
                header.style.padding = '20px 0';
                header.style.background = 'rgba(3, 3, 3, 0.4)';
            }
        });
    }

    // 2. Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Disable on smaller screens
            if (window.innerWidth <= 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 12 degrees)
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 768) return;
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'; // Smooth snap back
        });
        
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 768) return;
            card.style.transition = 'transform 0.1s ease-out';
        });
    });


});
