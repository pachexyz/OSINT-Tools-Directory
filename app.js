document.addEventListener('DOMContentLoaded', () => {
    let allTools = [];
    let filteredTools = [];
    let visibleCount = 21;
    const ITEMS_PER_PAGE = 21;

    const mainGrid = document.getElementById('mainGrid');
    const searchBar = document.getElementById('searchBar');
    const categoryFilters = document.getElementById('categoryFilters');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Elementos del Modal
    const toolModal = document.getElementById('toolModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalLink = document.getElementById('modalLink');
    const modalCopyBtn = document.getElementById('modalCopyBtn');

    // Utilidad para crear URLs amigables (slugs)
    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           
            .replace(/[^\w\-]+/g, '')       
            .replace(/\-\-+/g, '-')         
            .replace(/^-+/, '')             
            .replace(/-+$/, '');            
    }

    // Cargar datos
    fetch('data/tools.json')
        .then(response => response.json())
        .then(data => {
            allTools = data;
            init();
        })
        .catch(err => {
            console.error("Error cargando herramientas:", err);
            allTools = []; 
        });

    function init() {
        // Ordenar explícitamente por id descendente
        allTools.sort((a, b) => b.id - a.id);
        
        // Marcar las top 3 como nuevas
        for(let i = 0; i < Math.min(3, allTools.length); i++) {
            allTools[i].isNew = true;
        }

        filteredTools = [...allTools];
        renderCategories();
        renderTools();
        
        // Escuchar cambios de URL para los modales
        handleHashRoute();
        window.addEventListener('hashchange', handleHashRoute);
    }

    function renderCategories() {
        const categories = ['all', ...new Set(allTools.map(t => t.categoria))];
        categoryFilters.innerHTML = '';
        categories.forEach(cat => {
            const chip = document.createElement('span');
            chip.className = `chip ${cat === 'all' ? 'active' : ''}`;
            chip.textContent = cat === 'all' ? 'Todos' : cat;
            chip.dataset.category = cat;
            chip.addEventListener('click', () => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                filterTools();
            });
            categoryFilters.appendChild(chip);
        });
    }

    function renderTools() {
        mainGrid.innerHTML = '';
        const toolsToShow = filteredTools.slice(0, visibleCount);
        
        toolsToShow.forEach(tool => {
            mainGrid.appendChild(createCard(tool));
        });

        // Mostrar u ocultar botón de cargar más
        if (visibleCount < filteredTools.length) {
            loadMoreBtn.style.display = 'inline-flex';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn.addEventListener('click', () => {
        visibleCount += ITEMS_PER_PAGE;
        renderTools();
    });

    function createCard(tool) {
        const slug = slugify(tool.nombre);
        const linkWrapper = document.createElement('a');
        linkWrapper.href = `#${slug}`;
        linkWrapper.className = 'card-link';

        const card = document.createElement('div');
        card.className = 'card';

        const newBadge = tool.isNew ? '<span class="badge-new">NUEVA</span>' : '';

        card.innerHTML = `
            ${newBadge}
            <div class="card-title">
                ${tool.nombre}
                <span class="card-arrow">&rarr;</span>
            </div>
            <div class="card-desc">${tool.descripcion}</div>
            <div class="card-tags">
                ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        
        linkWrapper.appendChild(card);
        return linkWrapper;
    }

    // --- Lógica del Modal y Deep Linking ---
    function handleHashRoute() {
        const hash = window.location.hash.substring(1); 
        if (!hash) {
            closeModal();
            return;
        }

        const tool = allTools.find(t => slugify(t.nombre) === hash);
        if (tool) {
            openModal(tool);
        } else {
            closeModal();
        }
    }

    function openModal(tool) {
        modalTitle.textContent = tool.nombre;
        modalDesc.textContent = tool.descripcion_larga || tool.descripcion; // Preparado para futuras descripciones largas
        modalTags.innerHTML = tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        modalLink.href = tool.url;
        
        modalCopyBtn.onclick = () => {
            const link = window.location.origin + window.location.pathname + '#' + slugify(tool.nombre);
            navigator.clipboard.writeText(link).then(() => {
                const originalText = modalCopyBtn.textContent;
                modalCopyBtn.textContent = '✅';
                setTimeout(() => {
                    modalCopyBtn.textContent = originalText;
                }, 2000);
            });
        };

        toolModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        toolModal.classList.remove('active');
        document.body.style.overflow = '';
        if (window.location.hash) {
            history.replaceState(null, null, ' '); // Limpia la URL sin recargar
        }
    }

    modalClose.addEventListener('click', closeModal);
    toolModal.addEventListener('click', (e) => {
        if (e.target === toolModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toolModal.classList.contains('active')) {
            closeModal();
        }
    });
    // ----------------------------------------

    function filterTools() {
        const searchTerm = searchBar.value.toLowerCase();
        const activeCategory = document.querySelector('.chip.active').dataset.category;

        filteredTools = allTools.filter(tool => {
            const matchesSearch = tool.nombre.toLowerCase().includes(searchTerm) || 
                                tool.descripcion.toLowerCase().includes(searchTerm) ||
                                tool.tags.some(t => t.toLowerCase().includes(searchTerm));
            const matchesCategory = activeCategory === 'all' || tool.categoria === activeCategory;
            return matchesSearch && matchesCategory;
        });

        visibleCount = ITEMS_PER_PAGE; 
        renderTools();
    }

    searchBar.addEventListener('input', filterTools);

    // --- Efecto Cyberpunk Typewriter para el subtítulo ---
    const subtitle = document.getElementById('mainSubtitle');
    if (subtitle) {
        const text = subtitle.textContent.trim().replace(/\s+/g, ' '); // Clean HTML spaces
        subtitle.textContent = '';
        let charIndex = 0;
        // Creamos la barra parpadeante
        subtitle.innerHTML = '<span id="typewriter-cursor">|</span>';
        const cursor = document.getElementById('typewriter-cursor');
        
        function typeWriter() {
            if (charIndex < text.length) {
                subtitle.insertBefore(document.createTextNode(text.charAt(charIndex)), cursor);
                charIndex++;
                setTimeout(typeWriter, Math.random() * 30 + 10); // Velocidad aleatoria táctica
            } else {
                // Al terminar, parpadear unas veces y fijar
                cursor.style.animation = "blink 1s step-end infinite";
            }
        }
        setTimeout(typeWriter, 500); // Pequeño retraso al cargar
    }
});
