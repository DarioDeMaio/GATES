async function fetchDataAndRenderCharts() {
    const anno = document.getElementById('anno').value;
    const tipoDispositivo = document.getElementById('tipoDispositivo').value;

    if (!anno || isNaN(anno)) {
        alert('Inserisci un anno valido.');
        return;
    }

    const response = await fetch('http://localhost:7071/api/findDataForDashBoard', {
        method: 'POST',
        body: JSON.stringify({ tipo: tipoDispositivo, anno: anno }),
    });

    const data = await response.json();
    const misurazioni = data.misurazioni;

    if (tipoDispositivo === 'aria') {
        document.getElementById('graficoMedieCov').style.display = 'inline';
        document.getElementById('graficoMedieGasSerra').style.display = 'inline';
        document.getElementById('graficoTortaAria').style.display = 'inline';
        
        document.getElementById('graficoMediePH').style.display = 'none';
        document.getElementById('graficoMedieMetalli').style.display = 'none';
        document.getElementById('graficoTortaAcqua').style.display = 'none';

        const mediePerMeseCov = calculateMediaForMese(misurazioni, 'cov');
        const mediePerMeseGasSerra = calculateMediaForMese(misurazioni, 'gas');

        renderChart('graficoMedieCov', 'Media COV per Mese', mediePerMeseCov, 'rgba(75, 192, 192, 1)');
        renderChart('graficoMedieGasSerra', 'Media Gas Serra per Mese', mediePerMeseGasSerra, 'rgba(255, 99, 132, 1)');
        
        const sommaCOV = misurazioni.reduce((acc, misurazione) => acc + misurazione.cov, 0);
        const sommaGAS = misurazioni.reduce((acc, misurazione) => acc + misurazione.gas, 0);

        renderPieChart('graficoTortaAria', 'Somma COV e Gas Serra', sommaCOV, sommaGAS);

    } else {
        document.getElementById('graficoMediePH').style.display = 'inline';
        document.getElementById('graficoMedieMetalli').style.display = 'inline';
        document.getElementById('graficoTortaAcqua').style.display = 'inline';
        
        document.getElementById('graficoMedieCov').style.display = 'none';
        document.getElementById('graficoMedieGasSerra').style.display = 'none';
        document.getElementById('graficoTortaAria').style.display = 'none';

        const mediePerMesePH = calculateMediaForMese(misurazioni, 'pH');
        const mediePerMeseMetalli = calculateMediaForMese(misurazioni, 'metalli');

        renderChart('graficoMediePH', 'Media pH per Mese', mediePerMesePH, 'rgba(75, 192, 192, 1)');
        renderChart('graficoMedieMetalli', 'Media Metalli Pesanti per Mese', mediePerMeseMetalli, 'rgba(255, 99, 132, 1)');
        
        const sommaPH = misurazioni.reduce((acc, misurazione) => acc + misurazione.pH, 0);
        const sommaMetalli = misurazioni.reduce((acc, misurazione) => acc + misurazione.metalli, 0);

        renderPieChart('graficoTortaAcqua', 'Somma pH e Metalli Pesanti', sommaPH, sommaMetalli);
    }

}

function calculateMediaForMese(misurazioni, campo) {
    const aggregatoPerMese = {};

    misurazioni.forEach((misurazione) => {
        const mese = new Date(misurazione.data).getMonth();
        aggregatoPerMese[mese] = aggregatoPerMese[mese] || { somma: 0, conteggio: 0 };
        aggregatoPerMese[mese].somma += misurazione[campo];
        aggregatoPerMese[mese].conteggio += 1;
    });

    const mediePerMese = Object.keys(aggregatoPerMese).map((mese) => {
        return {
            mese: parseInt(mese, 10) + 1,
            media: aggregatoPerMese[mese].somma / aggregatoPerMese[mese].conteggio,
        };
    });

    return mediePerMese;
}

function renderChart(containerId, title, data, color) {
    const monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    const labels = data.map((item) => monthNames[item.mese - 1]);
    const values = data.map((item) => item.media);

    const ctx = document.getElementById(containerId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: values,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function renderPieChart(containerId, title, value1, value2) {
    const ctx = document.getElementById(containerId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['pH', 'Metalli Pesanti'],
            datasets: [{
                data: [value1, value2],
                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            }],
        },
    });
}