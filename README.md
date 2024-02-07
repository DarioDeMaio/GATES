<p align="center">
  <img src="images/GATES.png">
</p>

# GATES

## Descrizione del Progetto

### Abstract
Il progetto GATES mira a sviluppare un sistema completo di monitoraggio ambientale dedicato alle concerie. Attraverso l'impiego di dispositivi IoT, il sistema raccoglie in tempo reale dati critici sugli scarti generati, come l'acqua contaminata e le emissioni gassose. L'obiettivo è creare un sistema integrato che analizzi e archivi accuratamente tali dati, permettendo all'utente di accedere a informazioni aggregate attraverso un'interfaccia utente intuitiva. Questo approccio fornisce strumenti avanzati per decisioni informate sulla gestione ambientale, contribuendo a rendere il settore conciario più sostenibile.

### Funzionamento
Una conceria utilizza dispositivi IoT collegati all'hub IoT di Azure per una gestione centralizzata. I dati inviati dai dispositivi vengono elaborati in tempo reale con Azure Stream Analytics e archiviati in un database SQL di Azure. Mediante le Azure Functions è possibile accedere alle informazioni e associare o eliminare nuovi dispositivi all'hub. Tramite un'interfaccia web erogata da Azure Static Web Apps è possibile utilizzare tali Functions per interagire con il sistema.

## Servizi Utilizzati

1. **Azure IoT Hub:** Gestisce la connessione e la comunicazione bidirezionale con i dispositivi IoT, garantendo la gestione efficiente dei dispositivi distribuiti in una conceria.
2. **Azure Device Twin:** Utilizzato per gestire ogni dispositivo IoT connesso.
3. **Azure Stream Analytics:** Analizza in tempo reale i dati dai dispositivi IoT, facilitando l'elaborazione e l'archiviazione immediata dei dati relativi all'inquinamento.
4. **Azure SQL Database:** Database relazionale scelto per la sua struttura tabellare e capacità di gestire dati strutturati in modo efficiente.
5. **Azure Functions:** Utilizzate per consentire all'interfaccia utente di accedere al database e recuperare i dati relativi all'inquinamento.
6. **Azure Static Web Apps:** Creazione di un'applicazione web con un'interfaccia utente intuitiva per gli utenti finali.

## Architettura del Progetto
![Architettura proposta](images/Tanneries.png)

## Struttura della repository
* **az_func**: cartella contenente le Azure Functions, i file di configurazione di Node.js e una cartella denominata Prisma. In quest'ultima è presente lo schema SQL.
* **front-and**: cartella contenente i file HTML, CSS E JavaScript.
* **images**: cartella contenente le immagini utilizzate nel file readme.md
* **mock-devices**: cartella contenente i file Python che rappresentano i dispositivi IoT.

## Requirements
* Azure CLI per poter effettuare la distribuzione delle risorse
* Node.js (v20.9.0), TypeScript (v4.0.0) e Prisma (v^5.7.1) per effettuare il deploy della Function App
* BootStrap (v5.3)

## Istruzioni per installare il progetto
1. Eseguire il login ad un account Azure attraverso Azure CLI
2. Modificare il file [create.sh]("create.sh") specificando le impostazioni per il proprio progetto
3. Eseguire il file `create.sh`