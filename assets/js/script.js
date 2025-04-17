// Gestion du menu burger pour mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const authButtons = document.querySelector('.auth-buttons');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    authButtons.classList.toggle('active');
    burger.classList.toggle('toggle');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation au scroll
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animation du burger
    function toggleBurger() {
        const lines = burger.querySelectorAll('div');
        lines[0].classList.toggle('line1-active');
        lines[1].classList.toggle('line2-active');
        lines[2].classList.toggle('line3-active');
    }

    burger.addEventListener('click', toggleBurger);

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-links a, .auth-buttons a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                authButtons.classList.remove('active');
                burger.classList.remove('toggle');
                toggleBurger();
            }
        });
    });

    // Fermer le menu mobile lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            authButtons.classList.remove('active');
            burger.classList.remove('toggle');
            const lines = burger.querySelectorAll('div');
            lines.forEach(line => {
                line.classList.remove('line1-active', 'line2-active', 'line3-active');
            });
        }
    });

    // Sélectionner tous les éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    // Ajouter des écouteurs d'événements pour chaque image
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Créer le contenu du modal
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${imgAlt}</p>
                </div>
            `;
            
            // Afficher le modal
            modal.style.display = 'flex';
            
            // Fermer le modal en cliquant sur le bouton de fermeture
            const closeButton = modal.querySelector('.close-button');
            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
    });

    // Fermer le modal en cliquant en dehors de l'image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}); 