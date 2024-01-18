// Esegui una richiesta per ottenere la lista dei dispositivi dalla tua Azure Function
fetch("http://localhost:7071/api/findDevice")
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
          <span class="font-weight-bold">Matricola: ${dispositivo.matricola}</span>
          <span class="badge badge-primary badge-pill">${getTipoDispositivo(dispositivo)}</span>
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
    return "Aria";
  } else if (dispositivo.water) {
    return "Acqua";
  } else {
    return "Tipo non definito";
  }
}
