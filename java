// Vérifier si une lettre a déjà été attribuée
let storedLetter = localStorage.getItem("easterEggLetter");

if (storedLetter) {
    document.getElementById("result").innerText = "Votre lettre est : " + storedLetter;
    document.getElementById("instruction").style.display = "block";
}

// Liste des lettres possibles
const letters = ["A", "B", "C", "D"];

// Fonction pour obtenir une lettre aléatoire
function getRandomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

// Sélectionner les œufs
document.querySelectorAll(".egg").forEach(egg => {
    egg.addEventListener("click", function () {
        // Vérifier si une lettre est déjà stockée
        if (!localStorage.getItem("easterEggLetter")) {
            let randomLetter = getRandomLetter();
            localStorage.setItem("easterEggLetter", randomLetter);
            document.getElementById("result").innerText = "Votre lettre est : " + randomLetter;
            document.getElementById("instruction").style.display = "block";

            // Ajouter l'animation de rebond
            this.classList.add("clicked");
        }
    });
});

// 🔄 Bouton de réinitialisation (juste pour les tests)
document.getElementById("resetButton").addEventListener("click", () => {
    localStorage.removeItem("easterEggLetter");
    location.reload(); // Recharge la page pour recommencer
});

// Rendre visible le bouton reset uniquement pour les tests
document.getElementById("resetButton").style.display = "block";
