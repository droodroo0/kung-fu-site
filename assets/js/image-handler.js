// Gestionnaire d'images manquantes
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour créer un placeholder
    function createPlaceholder(type, width, height) {
        const placeholder = document.createElement('div');
        placeholder.className = `placeholder placeholder-${type}`;
        if (width) placeholder.style.width = width + 'px';
        if (height) placeholder.style.height = height + 'px';
        return placeholder;
    }

    // Gérer les images qui ne se chargent pas
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const type = this.dataset.type || 'gallery'; // Par défaut, utiliser le style gallery
            const width = this.width || this.getAttribute('width');
            const height = this.height || this.getAttribute('height');
            
            // Créer et insérer le placeholder
            const placeholder = createPlaceholder(type, width, height);
            this.parentNode.replaceChild(placeholder, this);
        });
    });

    // Fonction pour vérifier si une image existe
    function checkImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Vérifier et remplacer les images d'arrière-plan manquantes
    document.querySelectorAll('[data-background-image]').forEach(async element => {
        const imageUrl = element.dataset.backgroundImage;
        const exists = await checkImage(imageUrl);
        
        if (!exists) {
            const type = element.dataset.type || 'hero';
            element.classList.add('placeholder', `placeholder-${type}`);
        } else {
            element.style.backgroundImage = `url(${imageUrl})`;
        }
    });
}); 