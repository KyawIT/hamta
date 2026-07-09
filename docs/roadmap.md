# Roadmap & offene Entscheidungen

## Offene Team-Entscheidungen

Diese Punkte sollten **im Team** geklärt werden, bevor weitergebaut wird:

1. **Kategorie-Modell im Backend** ⭐ (wichtigste Frage)
   Die Website (und der neue Admin) haben feine Kategorien: *Vorspeisen, Steaks, Hauptspeisen,
   Salate, Pizza, Suppen, Beilagen, Desserts* + *Aperitifs, Cocktails, Mocktails, Bier,
   Kaffee & Tee, Limonaden, Säfte, Softdrinks*.
   Das Backend hat aber nur 5 feste Tabellen (`main_course` bündelt Steaks/Pizza/Salate/… ).
   → **Empfehlung:** eine **Category-Entity** (bzw. `kategorie`-Feld) statt fester Tabellen,
   damit Kategorien Daten statt Code sind. Milads Aufgabe.

2. **Seed-Daten vereinheitlichen**
   Zwei überschneidende Seed-Dateien (`import.sql`, `seed_speisekarte.sql`), keine läuft
   automatisch → DB bleibt leer. **Empfehlung:** eine Flyway-Migration `V3__seed_speisekarte.sql`
   als einzige Quelle, die anderen entfernen.

3. **Reihenfolge: Auth zuerst oder später?**
   OIDC ist konfiguriert, aber Realm fehlt und Endpoints sind ungeschützt. Wann wird Keycloak
   scharf geschaltet (Backend `@RolesAllowed` + Frontend echter Login)?

## Geplante Features

### Adminbereich (`/admin`)

- [x] Grundgerüst (Shell, Routing, Layout)
- [x] Platzhalter-Login + Guard
- [x] **Speisekarte-Verwaltung** (`/admin/menu`) – UI fertig (In-Memory, mobile-first)
- [ ] `/admin/menu` an die echte API + Bild-Upload anbinden – *nach Kategorie-Entscheidung*
- [ ] **Reservierungen** (`/admin/reservations`) – *braucht neues Backend*
- [ ] **Einstellungen / Öffnungszeiten** (`/admin/settings`) – *braucht neues Backend*
- [ ] Echter Login über Keycloak (ersetzt Platzhalter)

### Backend

- [ ] Category-Entity einführen (Team-Entscheidung #1)
- [ ] Seed als eine Flyway-Migration (Team-Entscheidung #2)
- [ ] Reservierungs-Entity + Endpoints
- [ ] Öffnungszeiten/Settings-Entity + Endpoints
- [ ] Endpoints mit Keycloak absichern (`@RolesAllowed`)

## Deployment (später)

- Domain: **hamta.at**
- Öffentliche Seite unter `/`, Adminbereich unter `/admin`
