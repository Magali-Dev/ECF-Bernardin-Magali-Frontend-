// Majuscule à la première lettre d’une chaîne
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// dynamiquement la date actuelle au format français
function updateDate() {
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Formate la date (ex. "jeudi 17 juillet 2025")
  let formattedDate = now.toLocaleDateString('fr-FR', options);

  // Majuscule à chaque mot
  formattedDate = formattedDate
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');

  // Format des heures “HHhMM”
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // Affiche dans l’élément #current-date
  document.getElementById('current-date').textContent =
    `${formattedDate}, ${hours}h${minutes}`;
}

// Initialise la date et met à jour chaque minute
updateDate();
setInterval(updateDate, 60_000);

// Définition des signes astrologiques
const signes = [
  { nom: "Bélier", dates: "Du 21 Mars au 19 Avril", image: "assets/images/signes/belier.jpg"},
  { nom: "Taureau", dates: "Du 20 Avril au 20 Mai", image: "./assets/images/signes/taureau.jpg"},
  { nom: "Gémeaux", dates: "Du 21 Mai au 20 Juin", image: "./assets/images/signes/gemeaux.jpg"},
  { nom: "Cancer", dates: "Du 21 Juin au 22 Juillet", image: "./assets/images/signes/cancer.jpg"},
  { nom: "Lion", dates: "Du 23 Juillet au 22 Août", image: "./assets/images/signes/lion.jpg"},
  { nom: "Vierge", dates: "Du 23 Août au 22 Septembre", image: "./assets/images/signes/vierge.jpg"},
  { nom: "Balance", dates: "Du 23 Septembre au 22 Octobre", image: "./assets/images/signes/balance.jpg"},
  { nom: "Scorpion", dates: "Du 23 Octobre au 21 Novembre", image: "./assets/images/signes/scorpion.jpg" },
  { nom: "Sagittaire", dates: "Du 22 Novembre au 21 Décembre", image: "./assets/images/signes/sagittaire.jpg"},
  { nom: "Capricorne", dates: "Du 22 Décembre au 19 Janvier", image: "./assets/images/signes/capricorne.jpg"},
  { nom: "Verseau", dates: "Du 20 Janvier au 18 Février", image: "./assets/images/signes/verseau.jpg"},
  { nom: "Poissons", dates: "Du 19 Février au 20 Mars", image: "./assets/images/signes/poissons.jpg"}
];

const container = document.getElementById("cards-container");
const bouton = document.getElementById("tirer-cartes");
const loading = document.getElementById("loading-message");

// Gestion du clic sur le bouton
bouton.addEventListener("click", () => {
  const intro = document.getElementById("intro-text");

  // Si les cartes sont déjà affichées, les fermer
  if (container.style.display === "grid") {
    container.style.display = "none";
    intro.style.display = "block";
    bouton.textContent = "🔮 Tirer les 12 cartes";
    return;
  }

  // Début du chargement
  bouton.disabled = true;
  loading.style.display = "block";
  intro.style.display = "none";
  container.innerHTML = "";

  fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"
    })
  })
  .then(r => {
    if (!r.ok) throw new Error(`Erreur ${r.status}`);
    return r.json();
  })
  .then(data => {
    const horoscopes = data.horoscope || {};

    // Affiche après animation de chargement
    setTimeout(() => {
      loading.style.display = "none";
      container.style.display = "grid";

      signes.forEach(signe => {
        const article = document.createElement("article");
        article.className = "zodiac-card";

        const horoscope = horoscopes[signe.nom] || "Horoscope non disponible.";
        article.innerHTML = `
          <div class="zodiac-header">
            <img src="${signe.image}" alt="${signe.nom}" class="zodiac-icon">
            <h2>${signe.nom}</h2>
          </div>
          <p class="zodiac-dates">${signe.dates}</p>
          <p class="zodiac-horoscope"><strong>Horoscope du jour :<br></strong> ${horoscope}</p>
        `;

        container.appendChild(article);
      });

      bouton.disabled = false;
      bouton.textContent = "✖ Fermer les cartes";
    }, 3500);
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error);
    loading.innerText = "❌ Impossible de charger les cartes.";
    bouton.disabled = false;
  });
});

// Modal pour les mentions
const modal = document.getElementById("modal-mentions");
const btn = document.getElementById("open-mentions");
const closeBtn = document.getElementsByClassName("close-btn")[0];

// Ouvre le modal
btn.onclick = () => {
  modal.style.display = "block";
};

// Ferme le modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Ferme le modal si l’utilisateur clique à l’extérieur
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


// bouton vers le haut 

const btnRetour = document.getElementById('back-to-top');
const showAfter = 200;

window.addEventListener('scroll', () => {
  if (window.scrollY > showAfter) btnRetour.classList.add('show');
  else btnRetour.classList.remove('show');
});

btnRetour.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Ramène le focus sur le bouton pour les utilisateurs clavier
  btnRetour.focus({ preventScroll: true });
});



// api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"