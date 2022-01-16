/**
 * In questo file viene specificato l'ordine in cui i test devono essere eseguiti.
 */

//tesserinoTest files
/**
 * Prerequisiti: 
 * Per createTesserinoTest bisogna caricare nel db il cliente Francesco Rossi che non possiede un tesserino
 * Alla fine del testing il cliente avrà un tesserino
 * 
 * Per rinnovoTesserinoTest bisogna caricare nel db il cliente Marco Rossi che possiede un tesserino scaduto
 * Alla fine del testing il cliente avrà rinnovato il suo tesserino
 * 
 * Per ricaricaTesserinoTest bisogna aver eseguito con successo createTesserinoTest, in modo che il cliente Francesco Rossi
 * Abbia un tesserino che è possibile ricaricare 
 */
//require("./tesserinoTest/createTesserinoTest");
//require("./tesserinoTest/rinnovoTesserinoTest");
//require("./tesserinoTest/ricaricaTesserinoTest");

//chatTest files
/**
 * Prerequisiti:
 * Per invioMessaggioTest deve essere caricata nel db una conversazione tra due utenti, in modo che a 
 * questa conversazione possa essere associato il messaggio inviato
 * 
 * Per modificaMessaggioTest bisogna caricare nel db una conversazione ed un messaggio, in modo 
 * da utilizzare l'id del messaggio per modifire il messaggio
 */
//require("./chatTest/invioMessaggioTest");
//require("./chatTest/modificaMessaggioTest");