let taches = [];

const inputTache = document.getElementById('nouvelleTache');
const btnAjouter = document.getElementById('ajouterBtn');
const listeTaches = document.getElementById('listeTaches');
const messageVide = document.getElementById('messageVide');

function afficherTaches() {
    listeTaches.innerHTML = '';

    if (taches.length === 0) {
        messageVide.style.display = 'block';
    } else {
        messageVide.style.display = 'none';

        taches.forEach((tache, index) => {
            const li = document.createElement('li');

            const texte = document.createElement('span');
            texte.textContent = tache;

            const btnSupprimer = document.createElement('button');
            btnSupprimer.textContent = 'Supprimer';
            btnSupprimer.onclick = () => supprimerTache(index);

            li.appendChild(texte);
            li.appendChild(btnSupprimer);
            listeTaches.appendChild(li);
        });
    }
}

function ajouterTache() {
    const texte = inputTache.value.trim();

    if (texte !== '') {
        taches.push(texte);
        inputTache.value = '';
        inputTache.focus();
        afficherTaches();
    }
}

function supprimerTache(index) {
    taches.splice(index, 1);
    afficherTaches();
}

btnAjouter.addEventListener('click', ajouterTache);

inputTache.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        ajouterTache();
    }
});

afficherTaches();
