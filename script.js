
document.addEventListener('DOMContentLoaded', () => {

    
    let taches = [
        
    ];

    let prochainId = 1;
    let filtreActif = 'toutes'; // toutes | actives | completees

    
    const inputTache = document.getElementById('nouvelleTache');
    const btnAjouter = document.getElementById('ajouterBtn');
    const listeTaches = document.getElementById('listeTaches');
    const messageVide = document.getElementById('messageVide');
    const boutonsFiltres = document.querySelectorAll('.filtre-btn');
    const statsTotal = document.getElementById('totalTaches');
    const statsActives = document.getElementById('tachesActives');
    const statsCompletees = document.getElementById('tachesCompletees');

    
    function afficherTaches() {
        listeTaches.innerHTML = '';

        const tachesFiltrees = taches.filter(tache => {
            if (filtreActif === 'actives') return !tache.complete;
            if (filtreActif === 'completees') return tache.complete;
            return true; // "toutes"
        });

        if (tachesFiltrees.length === 0) {
            messageVide.style.display = 'block';
        } else {
            messageVide.style.display = 'none';
        }

        tachesFiltrees.forEach(tache => {
            const li = document.createElement('li');
            if (tache.complete) li.classList.add('completee');

            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tache.complete;
            checkbox.addEventListener('change', () => basculerCompletion(tache.id));

            
            const span = document.createElement('span');
            span.textContent = tache.texte;

            
            const btnSupprimer = document.createElement('button');
            btnSupprimer.textContent = 'Supprimer';
            btnSupprimer.addEventListener('click', () => supprimerTache(tache.id));

            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btnSupprimer);
            listeTaches.appendChild(li);
        });

        mettreAJourStats();
    }

    
    function ajouterTache() {
        const texte = inputTache.value.trim();
        if (texte === '') return;

        taches.push({
            id: prochainId++,
            texte: texte,
            complete: false
        });

        inputTache.value = '';
        inputTache.focus();
        afficherTaches();
    }

   
    function basculerCompletion(id) {
        taches = taches.map(tache =>
            tache.id === id ? { ...tache, complete: !tache.complete } : tache
        );
        afficherTaches();
    }

    
    function supprimerTache(id) {
        taches = taches.filter(tache => tache.id !== id);
        afficherTaches();
    }

    
    function changerFiltre(nouveauFiltre) {
        filtreActif = nouveauFiltre;

        
        boutonsFiltres.forEach(btn => {
            btn.classList.toggle('actif', btn.dataset.filtre === nouveauFiltre);
        });

        afficherTaches();
    }

    
    function mettreAJourStats() {
        const total = taches.length;
        const completees = taches.filter(t => t.complete).length;
        const actives = total - completees;

        statsTotal.textContent = total;
        statsActives.textContent = actives;
        statsCompletees.textContent = completees;
    }

   
    btnAjouter.addEventListener('click', ajouterTache);

    inputTache.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') ajouterTache();
    });

    
    boutonsFiltres.forEach(btn => {
        btn.addEventListener('click', () => {
            changerFiltre(btn.dataset.filtre);
        });
    });

    
    afficherTaches();
});
