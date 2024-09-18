const btnCalc = document.querySelector(".btn-calc");

btnCalc.addEventListener("click", () => {
  // Récupère les valeurs des champs de saisie
  let jour = parseInt(document.getElementById("day").value, 10);
  let mois = parseInt(document.getElementById("month").value, 10);
  let annee = parseInt(document.getElementById("year").value, 10);

  // Réinitialise les messages d'erreur
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));
  document.querySelectorAll("input").forEach((el) => {
    el.classList.remove("error");
    el.previousElementSibling.classList.remove("error-label"); // Enlève la classe de label erroné
  });

  // Validation du jour
  if (isNaN(jour) || jour < 1 || jour > 31) {
    document.querySelector(".day-error").textContent = "Invalid day";
    document.getElementById("day").classList.add("error");
    document.querySelector('label[for="day"]').classList.add("error-label");
  }

  // Validation du mois
  if (isNaN(mois) || mois < 1 || mois > 12) {
    document.querySelector(".month-error").textContent = "Invalid month";
    document.getElementById("month").classList.add("error");
    document.querySelector('label[for="month"]').classList.add("error-label");
  }

  // Validation de l'année
  if (isNaN(annee) || annee < 1900 || annee > 2100) {
    document.querySelector(".year-error").textContent = "Invalid year";
    document.getElementById("year").classList.add("error");
    document.querySelector('label[for="year"]').classList.add("error-label");
  }

  // Vérifie la validité du jour en fonction du mois
  const daysInMonth = new Date(annee, mois, 0).getDate();
  if (jour > daysInMonth) {
    document.querySelector(".day-error").textContent =
      "Invalid day for the given month";
    document.getElementById("day").classList.add("error");
    document.querySelector('label[for="day"]').classList.add("error-label");
  }

  // Si des erreurs sont présentes, arrête le traitement
  if (document.querySelectorAll(".error").length > 0) return;

  // Crée une instance de la date de naissance
  const birthDate = new Date(annee, mois - 1, jour);

  // Crée une instance de la date actuelle
  const today = new Date();

  // Calcule l'âge en années
  let age = today.getFullYear() - birthDate.getFullYear();

  // Ajuste l'âge si la date d'anniversaire n'est pas encore passée cette année
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Calcul des mois restants
  let months = today.getMonth() - birthDate.getMonth();
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }
  if (months < 0) {
    months += 12;
  }

  // Calcul des jours restants
  let days = today.getDate() - birthDate.getDate();
  if (days < 0) {
    // Ajuste le nombre de jours pour le mois précédent
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Affiche les résultats dans la console
  console.log(`Age: ${age} years, ${months} months, ${days} days`);

  // Optionnel : affiche les résultats dans le DOM
  document.querySelector(".calc-year").textContent = age;
  document.querySelector(".calc-month").textContent = months;
  document.querySelector(".calc-day").textContent = days;
});
