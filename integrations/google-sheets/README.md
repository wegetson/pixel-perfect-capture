# Formularz → Google Sheets na Cloudflare

Zapis działa po stronie serwera. Arkusz nie musi być publiczny. Nie trzeba korzystać z kluczy ani kredytów Lovable.

## 1. Uruchom skrypt na swoim koncie Google

1. Otwórz [arkusz z leadami](https://docs.google.com/spreadsheets/d/1Ct6OWYNUOnCK2EKAvwWKQkQTKU0CUT6_RJLSBZl1iwQ/edit#gid=0).
2. Wybierz **Rozszerzenia → Apps Script**. Wklej zawartość `Code.gs` do edytora, zastępując domyślną pustą funkcję. Zapisz projekt.
3. Z listy funkcji nad edytorem wybierz **setup** i kliknij **Uruchom**. Zaloguj się i przyznaj skryptowi dostęp do arkusza. Przejrzyj uprawnienia — kod zapisuje tylko w wskazanym arkuszu, ale Google może pokazać szerszy zakres dostępu do arkuszy.
4. W **Ustawieniach projektu → Właściwości skryptu** znajdziesz wygenerowany `CONTACT_FORM_TOKEN`. Zachowaj go prywatnie. Nie wklejaj go do czatu ani GitHub.
5. Wybierz **Wdróż → Nowe wdrożenie → Aplikacja internetowa**. Ustaw **Wykonuj jako: Ja** oraz **Kto ma dostęp: Wszyscy**. Wdróż i skopiuj adres aplikacji kończący się na `/exec` (nie `/dev`).

Publiczny jest tylko adres skryptu. Odczyt tego adresu nie pokazuje leadów, a zapis wymaga tajnego tokenu. Nie zmieniaj udostępniania samego arkusza. Po zmianie kodu skryptu edytuj wdrożenie i wybierz nową wersję.

## 2. Dodaj dwa sekrety aplikacji w Cloudflare

Otwórz **Workers & Pages → moja-strona → Settings → Variables and Secrets**. Użyj ustawień działającej aplikacji, nie zmiennych sekcji Build.

| Typ    | Nazwa (lewe pole)             | Wartość (prawe pole)                                |
| ------ | ----------------------------- | --------------------------------------------------- |
| Secret | `GOOGLE_SHEETS_WEBHOOK_URL`   | Adres aplikacji Apps Script kończący się na `/exec` |
| Secret | `GOOGLE_SHEETS_WEBHOOK_TOKEN` | Wartość `CONTACT_FORM_TOKEN` z właściwości skryptu  |

Kliknij **Deploy** / **Save and deploy**. Oba ustawienia muszą być w tym samym środowisku, które obsługuje hsmarketing.pl.

Sekrety nie trafiają do przeglądarki. Nie nazywaj ich `VITE_*` i nie wpisuj samych nazw jako wartości.

## 3. Opublikuj kod i sprawdź zapis

Po scaleniu poprawki do gałęzi produkcyjnej poczekaj na pomyślne wdrożenie Cloudflare. Wyślij jeden test przez formularz na hsmarketing.pl i sprawdź nowy wiersz w arkuszu. Kolumny A–D to: nazwa, kontakt, zainteresowania, opis. Karta jest wskazana przez `gid=0`, więc zmiana jej nazwy nie psuje zapisu.

Jeśli pojawi się błąd, w logach aplikacji Cloudflare sprawdź wpisy zaczynające się od `Contact form:`. Przyczyną może być niepoprawny adres `/exec`, różne tokeny, brak autoryzacji skryptu lub niewłaściwe ustawienie dostępu do aplikacji internetowej. Dane formularza pozostają na stronie po nieudanej wysyłce. Nie ponawiaj testów wielokrotnie bez sprawdzenia arkusza — po przerwaniu połączenia zapis mógł już nastąpić.

## Dotychczasowe połączenie Lovable

Gdy oba ustawienia webhooka są nieobecne, serwer nadal obsługuje dotychczasowe `LOVABLE_API_KEY` i `GOOGLE_SHEETS_API_KEY`. Muszą to być rzeczywiste wartości sekretów projektu, nie ich nazwy ani zwykły klucz Google API. Ta ścieżka wymaga karty `Arkusz1`. Częściowa lub błędna konfiguracja webhooka kończy się błędem i nie wysyła danych innym połączeniem.

Dokumentacja: [aplikacje internetowe Apps Script](https://developers.google.com/apps-script/guides/web), [właściwości skryptu](https://developers.google.com/apps-script/guides/properties), [zmienne i sekrety Cloudflare](https://developers.cloudflare.com/workers/configuration/environment-variables/).
