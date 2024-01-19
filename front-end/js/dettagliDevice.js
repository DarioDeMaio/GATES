// Ottieni la matricola dal parametro nell'URL
const urlParams = new URLSearchParams(window.location.search);
const matricola = urlParams.get('matricola');

// Esegui una richiesta per ottenere i dettagli del dispositivo dalla tua Azure Function
fetch("http://localhost:7071/api/findDeviceByMatricola", {
    method: "POST",
    body: JSON.stringify({ matricola: matricola }),
})
    .then(response => response.json())
    .then(data => {
        const deviceDetailsContainer = document.getElementById("deviceDetails");

        // Verifica se la risposta contiene un campo "dispositivo"
        if (data.dispositivo) {
            // Popola dinamicamente i dettagli del dispositivo
            const deviceDetailsHTML = `
            <div class="d-flex align-items-center mb-3">
                <span class="font-weight-bold mr-2">Matricola:</span>
                <span>${data.dispositivo.matricola}</span>
            </div>
            <div class="d-flex align-items-center mb-3">
                <span class="font-weight-bold mr-2">Tipologia:</span>
                ${getTipoDispositivo(data.dispositivo)}
            </div>
            <div class="d-flex align-items-center mb-3">
                <span class="font-weight-bold mr-2">Connection String:</span>
                <span id="connectionString">${data.dispositivo.connectionString}</span>
                <button class="btn btn-primary ml-2 copy-btn" onclick="copyConnectionString()">Copia</button>
            </div>
        `;
            deviceDetailsContainer.innerHTML = deviceDetailsHTML;

            // Richiama la funzione per ottenere le misurazioni
            findMisurazioni(matricola);
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

// Funzione per copiare la Connection String
function copyConnectionString() {
    const connectionStringElement = document.getElementById("connectionString");
    const tempInput = document.createElement("textarea");
    tempInput.value = connectionStringElement.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Connection String copiata negli appunti!");
}

// Funzione per ottenere le misurazioni e popolare la tabella
function findMisurazioni(matricola) {
    fetch("http://localhost:7071/api/findMisurazioni", {
        method: "POST",
        body: JSON.stringify({ matricola: matricola }),
    })
        .then(response => response.json())
        .then(data => {
            const misurazioniTableContainer = document.getElementById("misurazioniTable");

            if (data.misurazioni) {
                const misurazioniTableHTML = `
                    <h3>Misurazioni</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">${getMisurazioneLabel1(data.tipo)}</th>
                                <th scope="col">${getMisurazioneLabel2(data.tipo)}</th>
                                <!-- Aggiungi altri header in base al tipo di misurazioni -->
                            </tr>
                        </thead>
                        <tbody>
                            ${populateMisurazioniRows(data)}
                        </tbody>
                    </table>
                `;
                misurazioniTableContainer.innerHTML = misurazioniTableHTML;
            } else {
                console.error("La risposta non contiene un campo 'misurazioni'");
            }
        })
        .catch(error => {
            console.error("Errore nella richiesta:", error);
        });
}

function getMisurazioneLabel1(tipoDispositivo) {
    return tipoDispositivo === 'acqua' ? 'pH' : 'GAS';
}

function getMisurazioneLabel2(tipoDispositivo) {
    return tipoDispositivo === 'aria' ? 'COV' : 'Metalli';
}

// Funzione per popolare le righe della tabella delle misurazioni
function populateMisurazioniRows(data) {
    console.log(data.misurazioni)
    console.log(data.tipo)
    if(data.tipo==="acqua"){
        return data.misurazioni.map(misurazione => {
            return `
                <tr>
                    <th scope="row">${misurazione.id}</th>
                    <td>${misurazione.pH}</td>
                    <td>${misurazione.metalli}</td>
                    <!-- Aggiungi altre colonne in base al tipo di misurazioni -->
                </tr>
            `;
        }).join('');
    }else{
        return misurazioni.map(misurazione => {
            return `
                <tr>
                    <th scope="row">${misurazione.id}</th>
                    <td>${misurazione.gas}</td>
                    <td>${misurazione.cov}</td>
                    <!-- Aggiungi altre colonne in base al tipo di misurazioni -->
                </tr>
            `;
        }).join('');
    }
    
}