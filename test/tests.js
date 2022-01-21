/**
 * In questo file viene specificato l'ordine in cui i test devono essere eseguiti.
 */

/*require("./integrationTest");

return; 
//messo il return per eseguire solo il test di integrazione*/

//tesserinoTest files
require("./tesserinoTest");

//chatTest files
require("./chatTest");

//personaleTest files
require("./personaleTest");
 
 //Ticket 
require("./ticketTest");
 
 //Faq
require("./faqTest");

 //Login
require("./loginTest");
//Profilo

require("./profiloTest");

require("./statisticheTest")

require("./ordineTest")

require("./conversazioneTest")
 //Ricorda alla fine di togliere tutti i commenti