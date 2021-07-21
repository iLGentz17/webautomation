<<<<<<< HEAD
##Project name: web automation
***
#programma per automatizzare la parte di ricerca dei pec tramite partita iva
***
composizione:
*-pec: contiene un file per salvare i dati restituiti dall'server.js (il file si svuota ogni volta che il programma viene avviato)
*-program: contiene l'eseguibile per avviare il programma
*-node_modules: contiene i moduli di node
raccomandazioni:
*-non spostare i file in altre cartelle
*-non rinominare i fila
***
requisiti:
-installare node.js (link utile: https://nodejs.org/it/download/)
-avviare config.bat (solo prima del primo avvio) per scaricare i node_modules
=======
# Web automation
### programma per automatizzare la parte di ricerca dei pec tramite partita iva
***

### composizione:
* pec: contiene un file per salvare i dati restituiti dall'server.js (il file si svuota ogni volta che il programma viene avviato)
* program: contiene l'eseguibile per avviare il programma
* node_modules: contiene i moduli di node
***
### raccomandazioni:
* non spostare i file in altre cartelle
* non rinominare i fila
***
### requisiti:
* installare node.js (link utile: https://nodejs.org/it/download/)
* avviare config.bat (solo prima del primo avvio) per scaricare i node_modules
>>>>>>> 0375c442357da7e18ef4ea4f198bdfa044578a32
*** 
### uso del programma:
* avviare 'automaticPec.exe' che aprirà due finestre (CMD e una pagina NW)
* non chiudere la finestra del CDM (si chiude automaticamente una volta arrestato il programma) 
* nella schermata di NW apparirà un riquadro con scritto "inserire il file", cliccando il bottone 'choose file' andrà scelto il file .csv e poi premere su 'conferma'
* ora apparirà una schermata di transizione che avvisa che il programma è in esecuzione e si aprirà una finestra che inserisce autonomamente le paritite iva
* quando l'ultima finestra citata si chiuderà si può procedere a scaricare il file cliccando su download (il file si troverà nella cartella Download di windows)
* premere sulla X in alto a sinistra per chiudere il programma
***
### avvertenze:
* in caso si avvii il download prima della fine del programma, il processo non si conclude, ma si avranno salvati solo i dati analizzati fino a quel momento e bisognerà riaprire il programma
* in caso si chiuda la finestra che calcola i pec saranno salvati solo i dati analizzati fino a quel momento e sarà possibile scaricarli 
* in caso si chiuda il CDM il precesso si chiuderà 
