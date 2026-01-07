
// ====== RÉCUPÉRATION DES ÉLÉMENTS ======
const inputTache = document.querySelector('input[type="text"]');
const selectCategorie = document.getElementById("categories");
const rangeDuree = document.getElementById("dureeRange");
const inputDate = document.querySelector('input[type="datetime-local"]');

// conteneur d'affichage
const container = document.createElement("div");
document.body.appendChild(container);

// mapping durée
const durees = {
  1: "court",
  2: "moyen",
  3: "long"
};

// ====== LOCALSTORAGE ======
function getTaches() {
  return JSON.parse(localStorage.getItem("taches")) || [];
}

function saveTaches(taches) {
  localStorage.setItem("taches", JSON.stringify(taches));
}

// ====== AFFICHAGE ======
function afficherTaches() {
  container.innerHTML = "<h2>Mes tâches</h2>";
  const taches = getTaches();

  taches.forEach((tache, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "5px";
    div.style.padding = "5px";

    div.innerHTML = `
      <strong>${tache.nom}</strong><br>
      Catégorie : ${tache.categorie}<br>
      Durée : ${tache.duree}<br>
      Date : ${tache.date || "non définie"}<br>
      <button onclick="supprimerTache(${index})">Supprimer</button>
    `;

    container.appendChild(div);
  });
}

// ====== CRÉATION DE TÂCHE ======
function creer_tache() {
  if (inputTache.value.trim() === "") return;

  const nouvelleTache = {
    nom: inputTache.value,
    categorie: selectCategorie.value,
    duree: durees[rangeDuree.value],
    date: inputDate.value
  };

  const taches = getTaches();
  taches.push(nouvelleTache);
  saveTaches(taches);

  inputTache.value = "";
  afficherTaches();
}

// ====== SUPPRESSION ======
function supprimerTache(index) {
  const taches = getTaches();
  taches.splice(index, 1);
  saveTaches(taches);
  afficherTaches();
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", afficherTaches);




