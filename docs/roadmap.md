# Roadmap & offene Entscheidungen

## Offene Team-Entscheidungen

Diese Punkte sollten **im Team** geklärt werden, bevor weitergebaut wird:

1. **Datenmodell eines Gerichts** ⭐ (wichtigste Frage)
   Aktuell hat ein Gericht nur `name` + `imageUrl`. Für eine echte Speisekarte fehlt vermutlich:
   - Preis
   - Beschreibung / Zutaten
   - evtl. Allergene, Sortier-Reihenfolge, „verfügbar ja/nein"
   → Milad müsste die Entities erweitern, bevor das Admin-Formular sinnvoll gebaut werden kann.

2. **Reihenfolge: Auth zuerst oder später?**
   Backend-Endpoints sind aktuell offen. Wann wird Keycloak verdrahtet (Backend `@RolesAllowed` + Frontend echter Login)?

3. **Architektur der Speisekarte**
   Drei identische Tabellen (Vor-/Haupt-/Nachspeise) vs. eine `Gericht`-Tabelle mit `kategorie`-Feld. Aktuell 3× dupliziert.

## Geplante Features

### Adminbereich (`/admin`)

- [x] Grundgerüst (Shell, Routing, Layout)
- [x] Platzhalter-Login + Guard
- [ ] **Speisekarte verwalten** (`/admin/menu`) – an bestehende API anbinden
- [ ] **Reservierungen** (`/admin/reservations`) – *braucht neues Backend*
- [ ] **Einstellungen / Öffnungszeiten** (`/admin/settings`) – *braucht neues Backend*
- [ ] Echter Login über Keycloak (ersetzt Platzhalter)

### Backend

- [ ] Gericht-Entities erweitern (Preis, Beschreibung, …) – nach Team-Entscheidung #1
- [ ] Reservierungs-Entity + Endpoints
- [ ] Öffnungszeiten/Settings-Entity + Endpoints
- [ ] Endpoints mit Keycloak absichern (`@RolesAllowed`)

## Deployment (später)

- Domain: **hamta.at**
- Öffentliche Seite unter `/`, Adminbereich unter `/admin`
