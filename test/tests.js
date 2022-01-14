/**
 * In questo file viene specificato l'ordine in cui i test devono essere eseguiti.
 * L'ordine è importante in alcuni casi, ad esempio:
 * Il rinnovo del tesserino può essere testato solo quando l'utente ha un tesserino
 * Per questo l'ordine sarà createTesserino -> rinnovoTesserino
 */


//tesserinoTest files
require("./tesserinoTest/createTesserinoTest");
require("./tesserinoTest/rinnovoTesserinoTest");