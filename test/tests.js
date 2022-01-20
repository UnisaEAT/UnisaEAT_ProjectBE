/**
 * In questo file viene specificato l'ordine in cui i test devono essere eseguiti.
 */

require("./integrationTest/integrationTest");
return; //messo il return per eseguire solo il test di integrazione


//tesserinoTest files
require("./tesserinoTest/createTesserinoTest");
require("./tesserinoTest/rinnovoTesserinoTest");
require("./tesserinoTest/ricaricaTesserinoTest");

//chatTest files
require("./chatTest/invioMessaggioTest");
require("./chatTest/modificaMessaggioTest");

//personaleTest files
 require("./personaleTest/inserimentoPersonaleAdisuTest");
 require("./personaleTest/inserimentoOperatoreMensaTest"); 
 
 //Ticket 
 require("./ticketTest/compilazioneTicketTest");
 require("./ticketTest/risoluzioneTicketTest");
 
 //Faq
 require("./FaqTest/inserimentoDomandaFaq");
 require("./FaqTest/modificaDomandaFaq");

 //Login
require("./loginTest/login");
//Profilo

require("./profiloTest/modificaPassword");
 //Ricorda alla fine di togliere tutti i commenti