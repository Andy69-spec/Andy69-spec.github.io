// 1. GESTION DE L'APPARITION AU SCROLL (Intersection Observer)
// On cible les éléments Bento et les lignes de projets
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Une fois visible, on peut arrêter d'observer l'élément
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// On applique l'observation sur tous les blocs importants
document.querySelectorAll('.bento-item, .project-row, .skill-box, .section-label').forEach(el => {
    el.classList.add('reveal'); // On ajoute la classe de base pour l'animation
    observer.observe(el);
});

// 2. EFFET DE SUIVI DU CURSEUR (Optionnel - Très Premium)
const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// 3. NAVIGATION DOUCE (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 4. INJECTION DES STYLES NÉCESSAIRES POUR LES ANIMATIONS
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    /* État initial des éléments à révéler */
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), 
                    transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    /* État final quand l'élément est dans la vue */
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Style du suiveur de curseur */
    .cursor-follower {
        width: 20px;
        height: 20px;
        background: var(--primary);
        opacity: 0.3;
        border-radius: 50%;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease-out;
        filter: blur(8px);
    }

    /* Délai progressif pour les lignes de projets */
    .project-row:nth-child(2) { transition-delay: 0.1s; }
    .project-row:nth-child(3) { transition-delay: 0.2s; }
    .project-row:nth-child(4) { transition-delay: 0.3s; }
    .project-row:nth-child(5) { transition-delay: 0.4s; }
`;
document.head.appendChild(styleSheet);