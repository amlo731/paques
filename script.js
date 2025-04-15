// Fonction pour obtenir une lettre aléatoire avec système de poids
function weightedRandom(options) {
    const weights = options.map(option => option.weight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const randomValue = Math.random() * totalWeight;
    
    let weightSum = 0;
    for (let i = 0; i < options.length; i++) {
        weightSum += options[i].weight;
        if (randomValue <= weightSum) {
            return options[i].value;
        }
    }
}

// Options de lettres avec leurs poids respectifs
const letterOptions = [
    { value: "A", weight: 30 }, // 30% de chance
    { value: "B", weight: 30 }, // 30% de chance
    { value: "C", weight: 30 }, // 30% de chance
    { value: "D", weight: 10 }  // 10% de chance - plus rare
];

// Vérifier si le jeu a déjà été joué
window.onload = function() {
    if (localStorage.getItem('easterEggPlayed')) {
        // Récupérer la lettre stockée
        const savedLetter = localStorage.getItem('discoveredLetter');
        
        // Trouver l'index stocké ou utiliser le premier œuf par défaut
        const savedIndex = localStorage.getItem('brokenEggIndex') || 0;
        
        // Récupérer tous les œufs
        const eggs = document.querySelectorAll('.egg-container');
        
        // Simuler le fait que l'œuf a été cassé
        const selectedEgg = eggs[savedIndex];
        selectedEgg.classList.add("cracked");
        selectedEgg.querySelector(".letter").textContent = savedLetter;
        
        // Désactiver les autres œufs
        eggs.forEach((egg, index) => {
            if (index != savedIndex) {
                egg.style.opacity = '0.5';
                egg.style.cursor = 'not-allowed';
            }
        });
        
        // Afficher le message de résultat
        document.getElementById('discoveredLetter').textContent = savedLetter;
        document.getElementById('resultMessage').style.display = 'block';
        
        gameOver = true;
    }
};

let gameOver = false; // Variable pour empêcher plusieurs choix

function breakEgg(element) {
    if (gameOver) return; // Si un œuf a déjà été cliqué, on empêche les autres clics
    
    // Animation de l'œuf cassé
    element.classList.add("cracked");
    gameOver = true; // Bloque les autres œufs
    
    // Attribution d'une lettre avec système de poids
    let randomLetter = weightedRandom(letterOptions);
    element.querySelector(".letter").textContent = randomLetter;
    
    // Sauvegarder dans localStorage
    localStorage.setItem('easterEggPlayed', 'true');
    localStorage.setItem('discoveredLetter', randomLetter);
    
    // Sauvegarder l'index de l'œuf qui a été cassé
    const eggs = document.querySelectorAll('.egg-container');
    for (let i = 0; i < eggs.length; i++) {
        if (eggs[i] === element) {
            localStorage.setItem('brokenEggIndex', i);
            break;
        }
    }
    
    // Désactiver les autres œufs
    const allEggs = document.querySelectorAll('.egg-container');
    allEggs.forEach(egg => {
        if (egg !== element) {
            egg.style.opacity = '0.5';
            egg.style.cursor = 'not-allowed';
        }
    });
    
    // Afficher le message de résultat
    setTimeout(function() {
        document.getElementById('discoveredLetter').textContent = randomLetter;
        document.getElementById('resultMessage').style.display = 'block';
        createConfetti();
    }, 1000);
}

function createConfetti() {
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        document.body.appendChild(confetti);
        
        // Supprimer les confettis après l'animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
