function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateDate() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let formattedDate = now.toLocaleDateString('fr-FR', options);
  
  // Capitaliser la première lettre de chaque mot
  formattedDate = formattedDate
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  document.getElementById('current-date').textContent =
    `${formattedDate}, ${hours}h${minutes}`;
}

updateDate();

setInterval(updateDate, 60_000);




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

bouton.addEventListener("click", () => {
  const intro = document.getElementById("intro-text");
  if (container.style.display === "grid") {
    container.style.display = "none";
    intro.style.display = "block";
    bouton.textContent = "🔮 Tirer les 12 cartes";
    return;
  }

  bouton.disabled = true;
  loading.style.display = "block";
  intro.style.display = "none";

  container.innerHTML = "";

  fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!" })
  })
  .then(r => { if (!r.ok) throw new Error(`Erreur ${r.status}`); return r.json(); })
  .then(data => {
    const horoscopes = data.horoscope || {};

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
    console.error("Erreur lors de la récupération des données :", error);
    loading.innerText = "❌ Impossible de charger les cartes.";
    bouton.disabled = false;
  });
});
// Récupération des éléments
const modal = document.getElementById("modal-mentions");
const btn = document.getElementById("open-mentions");
const closeBtn = document.getElementsByClassName("close-btn")[0];

// Ouverture du modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Fermeture du modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Fermeture du modal si l'utilisateur clique en dehors de la fenêtre
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}



// api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"