# Argo22 úkol

## Spuštění
- pro úvodní naistalování balíčků spustit `npm install`
- následně spustit pomocí `npm start`
  - násleně běží na http://localhost:3000
  - endpointy
    - POST: `http://localhost:3000/qr/upload`
        - zařadí request do fronty, spustí se zpracování (nečeká se na výsledek), vrátí se `id`
    - GET: `http://localhost:3000/qr/getResult/:id`
        - pro `id` vrátí stav zpracování
- testy lze spustit pomocí `npm test`

## Struktura
- `\test_data` - obsahuje testovací data
- `\doc` - dokumentace (aspoň zadání)

## Poznámky
- k implementaci použito REST API
- validaci jsem dal pro jednoduchost dovnitř těla controlleru, lepší řešení by bylo použít pipu
- k předávání výsledku použit `Result` objekt, pokud nastane chyba vrátím 200 a success: false
```ts
{
  success: boolean;
  errors: string[] = [];
  data?: T
}
```
- neřešil jsem odchytávání výjimky v Exception Filteru
- swagger api jsem neřešil

## Hlavní třídy
- `QrController` - controller obsahující endpointy, v controlleru se provádí validace a následně  se volá metoda fasády
- `ValidationService` - třída obsahující validační logiku, lepší by bylo dát do pipy
- `Result` - standardizovaný objekt předávající případnou chybu
- `QrFacade` - fasáda obsahující vlastní logiku
- `Queue` - abstrakce nad frontou (ukládání řešeno do sqlite)
- `QrDecoder` - třída zapouzdřující logiku pro dekódování QR kódu z base64 stringu
- `ItemProcessor` - třída zapouzdřující zpracování base64 qr kódu ze stringu a uložení výsledku do fronty