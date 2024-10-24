# QRWorker

## Zadání

Cílem je připravit microservice, která bude sloužit jako mock služby pro rozeznávání údajů na průkazu totožnosti.

Služba by měla mít asynchronní API (REST nebo GraphQL) s následujícími endpointy:

* endpoint pro upload obrázku v base64, který bude vracet referenci na proces zpracování nahraného obrázku (dokladu)
    * pro zjednodušení bude obrázek obsahovat QR kód s datem ve tvaru `yyyy-mm-dd`
* endpoint pro získání výsledku zpracování dokladu na základě reference procesu, který by měl vrátit jeden z těchto stavů (přesný formát odpovědi neni zadán):
    * `PENDING` - čeká na zpracování nebo zpracování probíhá
    * `EXPIRED` - nahraný doklad je po datu expirace (datum z QR kódu je menší než aktuální datum)
    * `VALID` - nahraný doklad je validní (datum z QR kódu je větší než aktuální datum)
    * `FRAUD` - dahraný doklad je podvrh (QR kód neobsahuje datum ve specifikovaném formátu)

Řešení by mělo zahrnovat následující body:

* implementace microservice (pro parsing QR kodu použijte nějakou existujici knihovnu, plugin nebo službu (musí běžet lokálně!))
* pokrytí implementace unit testy
* dokumentace v README souboru (instalace, použití, příklady volání API, spuštění testů, ...)
    * může být anglicky nebo česky
* průběžné commity do repozitáře

Pokud by cokoliv nebylo jasné pomůže Martin Vondrášek, Honza Kovářík nebo Martin Janeček.

