document.getElementById("aggiungiDispositivoForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  var matricola = document.getElementById("matricola").value;
  var tipo = document.getElementById("tipo").value;

  var formData = {
    matricola: matricola,
    tipo: tipo
  };

  fetch("http://localhost:7071/api/createDevice", {
    method: "POST",
    
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Errore nella richiesta');
    }
  })
  .then(data => {
    console.log(data)
    var msg = "Dispositivo "+ `${data.dispositivo.matricola}`+ " aggiunto con successo!"
    mostraPopupSuccesso(msg);
  })
  .catch(error => {
    mostraPopupErrore("Errore nella richiesta: " + error.message);
  });
});

function mostraPopupSuccesso(testo) {
  Swal.fire({
    icon: 'success',
    title: 'Successo',
    text: testo
  });
}

function mostraPopupErrore(testo) {
  Swal.fire({
    icon: 'error',
    title: 'Errore',
    text: testo
  });
}
