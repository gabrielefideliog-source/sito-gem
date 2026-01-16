document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTIONE MENU MOBILE ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-cta-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Gestione accessibilità
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Chiudi il menu quando si clicca un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // --- GESTIONE FAQ ACCORDION ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Chiudi tutti gli altri pannelli (opzionale, per effetto "fisarmonica")
            const currentContent = this.nextElementSibling;
            const isOpened = this.classList.contains('active');

            // Reset di tutti gli item
            accordions.forEach(item => {
                item.classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
                item.nextElementSibling.style.maxHeight = null;
            });

            // Se quello cliccato non era aperto, aprilo
            if (!isOpened) {
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                currentContent.style.maxHeight = currentContent.scrollHeight + "px";
            }
        });
    });

    // --- SMOOTH SCROLL OFFSET (Opzionale per Header Sticky) ---
    // Questo aiuta a non coprire i titoli delle sezioni con l'header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});