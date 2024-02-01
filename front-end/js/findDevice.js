// Esegui una richiesta per ottenere la lista dei dispositivi dalla tua Azure Function
fetch("https://gatess.azurewebsites.net/api/finddevice")
  .then(response => response.json())
  .then(data => {
    // Trova il div con l'ID "dispositivi-lista"
    const listaDispositivi = document.getElementById("dispositivi-lista");

    // Verifica se la risposta contiene un campo "dispositivo"
    if (data.dispositivo && Array.isArray(data.dispositivo)) {
      // Popola dinamicamente la lista dei dispositivi
      data.dispositivo.forEach(dispositivo => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
          <a href="dettagliDevice.html?matricola=${dispositivo.matricola}" class="d-flex justify-content-between align-items-center w-100">
            <div class="d-flex align-items-center">
              <span class="font-weight-bold">Matricola: ${dispositivo.matricola}</span>
            </div>
            <div>${getTipoDispositivo(dispositivo)}</div>
          </a>
        `;
        listaDispositivi.appendChild(listItem);
      });
    } else {
      console.error("La risposta non contiene un campo 'dispositivo'");
    }
  })
  .catch(error => {
    console.error("Errore nella richiesta:", error);
  });

// Funzione per ottenere il tipo corretto del dispositivo
function getTipoDispositivo(dispositivo) {
  if (dispositivo.aria) {
    return '<img src="../images/wind_icon.png" alt="Logo Aria" height="20">';
  } else if (dispositivo.water) {
    return '<img src="../images/water_icon.png" alt="Logo Acqua" height="20">';
  } else {
    return "Tipo non definito";
  }
}
