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
2. **Azure Digital Twin:** Utilizzato per gestire ogni dispositivo IoT connesso.
3. **Azure Stream Analytics:** Analizza in tempo reale i dati dai dispositivi IoT, facilitando l'elaborazione e l'archiviazione immediata dei dati relativi all'inquinamento.
4. **Azure SQL Database:** Database relazionale scelto per la sua struttura tabellare e capacità di gestire dati strutturati in modo efficiente.
5. **Azure Functions:** Utilizzate per consentire all'interfaccia utente di accedere al database e recuperare i dati relativi all'inquinamento.
6. **Azure Static Web Apps:** Creazione di un'applicazione web con un'interfaccia utente intuitiva per gli utenti finali.

## Requirements
* Azure CLI per poter effettuare la distribuzione delle risorse
* Node.js (v20.9.0), TypeScript (v4.0.0) e Prisma (v^5.7.1) per effettuare il deploy delle risorse

## Istruzioni per installare il progetto
1. Eseguire il login ad un account Azure attraverso Azure CLI
2. Modificare il file [create.sh]("create.sh") specificando le impostazioni per il proprio progetto
3. Eseguire il file `create.sh`

## Motivazioni dietro la selezione dei servizi

### Front-end
#### Azure Static Web Apps or App Service
La scelta di utilizzare Azure Static Web Apps anziché Azure App Service per l'erogazione dell'interfaccia utente è stata guidata da diverse considerazioni. In primo luogo, Azure Static Web Apps offre una soluzione altamente scalabile e a basso costo per l'hosting di siti web statici, il che si adatta perfettamente alle esigenze di tale  progetto. Inoltre, Azure Static Web Apps integra nativamente con altri servizi Azure, come Azure Functions, semplificando l'integrazione dell'interfaccia utente con la logica di backend. Questa integrazione nativa consente una maggiore efficienza nello sviluppo e nella gestione dell'applicazione, riducendo il tempo e le risorse necessarie per il deployment e la manutenzione. Infine, Azure Static Web Apps supporta funzionalità come il controllo del codice sorgente tramite GitHub e l'automazione dei workflow di sviluppo. Queste caratteristiche ci hanno convinto che Azure Static Web Apps fosse la scelta ideale per fornire un'interfaccia utente intuitiva e efficiente per il sistema di monitoraggio ambientale.

### APIs
#### Azure Functions o App Service
La scelta di utilizzare Azure Functions anziché Azure App Service per la gestione delle operazioni di backend è stata guidata principalmente dalla natura delle esigenze di elaborazione dei dati. Azure Functions offre un approccio serverless alla gestione delle operazioni di backend, consentendo una scalabilità automatica e una gestione dei costi ottimizzata in base al consumo effettivo delle risorse computazionali. Questo è particolarmente vantaggioso per un sistema di monitoraggio ambientale, in cui possono verificarsi fluttuazioni significative nel carico di lavoro in base agli eventi ambientali o alle attività operative. Inoltre, Azure Functions permette un'integrazione diretta con altri servizi Azure, come Azure IoT Hub e Azure SQL Database, facilitando lo sviluppo e il deployment di soluzioni completamente integrate. Infine, l'approccio senza server di Azure Functions elimina la necessità di gestire l'infrastruttura sottostante, consentendo agli sviluppatori di concentrarsi esclusivamente sulla logica di business e sullo sviluppo delle funzionalità senza preoccuparsi della gestione dei server e delle risorse di calcolo.

### Database
### Azure SQL o CosmosDB
La decisione di utilizzare Azure SQL Database anziché Azure Cosmos DB per la gestione dei dati è stata basata sulle specifiche esigenze del progetto. Azure SQL Database è stato preferito per la sua struttura tabellare e la sua capacità di gestire dati strutturati in modo efficiente, fornendo una soluzione affidabile e scalabile per l'archiviazione dei dati generati dai dispositivi IoT. Questo approccio si adatta bene al sistema di monitoraggio ambientale, in cui i dati raccolti sono principalmente strutturati e richiedono una modellazione relazionale per analisi e interrogazioni efficaci. Inoltre, Azure SQL Database offre un'ampia gamma di strumenti per la gestione dei dati, inclusi strumenti di backup e ripristino, sicurezza avanzata e integrazione con altre soluzioni Azure. Questi fattori hanno portato alla scelta di Azure SQL Database come il database ideale per il progetto.

### Azure IoT Hub
La scelta di utilizzare Azure IoT Hub per la gestione dei dispositivi IoT è stata guidata da diverse motivazioni valide. Innanzitutto, Azure IoT Hub fornisce funzionalità specificamente progettate per la gestione dei dispositivi IoT, garantendo una connessione affidabile e una comunicazione bidirezionale con i dispositivi distribuiti in un ambiente conciario. Questo è essenziale per assicurare la raccolta affidabile e in tempo reale dei dati critici sull'ambiente. Inoltre, Azure IoT Hub offre un'ampia gamma di strumenti per la sicurezza e la gestione dei dispositivi. Infine, l'integrazione con Azure Digital Twins consente una rappresentazione digitale accurata e in tempo reale degli asset fisici presenti nell'ambiente conciario, fornendo una visione completa e dettagliata che facilita la gestione e l'ottimizzazione delle risorse.

## Architettura del Progetto
![Architettura proposta](images/Tanneries.png)
