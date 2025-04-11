# FILE SYSTEM INFOA

## Tiedostojen tallennus!!

Eli autojenkuvat ja profiilikuvat tallennetaan julkisesti saataville
/public/uploads kansioon

### TÄRKEÄÄ

Mutta sitten ajokorttikuvat ja esim autojen palautuskuvat olisi hyvä tallentaa privateksi ja tehdä niille oma kansio
--> kansiorakenteen juuritasolle tehdään oma kansio tälle: secure_uploads/ tämä tarjotaan vain suojatulla API reitillä
tehdään api reitti --> api/files/[fileId]/route.ts <--- tehdään autentikointi kuvan hakemista varten
