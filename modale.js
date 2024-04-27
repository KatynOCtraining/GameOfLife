// Récupération de la modale et du bouton de fermeture
var modal = document.getElementById("modal");
var closeButton = document.getElementsByClassName("close")[0];

// Fonction pour ouvrir la modale
function openModal() {
  modal.style.display = "block"; // Affiche la modale
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = "none"; // Masque la modale
}

// Écouteur d'événement pour le clic sur l'image
var imgTrigger = document.getElementById("imgTrigger"); // Remplacez "imgTrigger" par l'ID de votre image déclencheur
imgTrigger.addEventListener("click", openModal);

// Écouteur d'événement pour le clic sur le bouton de fermeture
closeButton.addEventListener("click", closeModal);

// Écouteur d'événement pour fermer la modale lorsque l'utilisateur clique en dehors de celle-ci
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});
