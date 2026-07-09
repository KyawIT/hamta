# Arbeitsprotokoll

Chronologisches Protokoll der Arbeit. Neueste Einträge oben.
Format pro Eintrag: **Datum – Person – Bereich**, dann kurz *Was* und *Warum*.

---

## 2026-07-09 – Obaid – Frontend: Speisekarten-Verwaltung

**Branch:** `feature/admin-menu`

### Was gemacht

- `/admin/menu` als vollständige Oberfläche zum **Speisen verwalten** (noch In-Memory, ohne Backend):
  - `MenuAdminService` (signal-basiertes CRUD, API-ready) + Beispieldaten.
  - Kategorien = **volle Website-Gliederung** (8 Speisen + 8 Getränke), gruppiert.
  - Liste als **Bild-Karten** (Foto, Preis-Badge, Kategorie, Zutaten), Segment-Umschalter
    Speisen/Getränke, **Suche** kategorieübergreifend.
  - Anlegen / Bearbeiten / Löschen über Formular-Modal mit **Live-Vorschau**.
  - **Foto direkt vom Gerät** hochladen (Client-seitige Verkleinerung auf 900px, Vorschau).
  - Durchgehend **mobile-first**: Floating-Button, Bottom-Sheet, große Touch-Ziele.

### Warum

Der Admin soll die Speisekarte selbst pflegen können. Bewusst erst als UI mit Beispieldaten,
damit unabhängig vom Backend/Team weitergearbeitet werden kann. Anbindung an die echte API
folgt, sobald das Kategorie-Modell im Backend geklärt ist (siehe roadmap).

### Nächster geplanter Schritt

- Team-Entscheidung zum **Kategorie-Modell** (Category-Entity im Backend).
- Danach `/admin/menu` an die echte API + Bild-Upload (MinIO) anbinden.

### Nebenbei

- DB/Backend lokal zum Laufen gebracht (docker-compose, `.env`-Dateien korrekt benannt,
  JDK 25/26 installiert). Backend läuft, DB aber leer (Seed läuft nicht automatisch).
- Hinweis: `.env` mit Zugangsdaten war kurzzeitig in der Git-History (`c07d225`) → Team sollte
  prüfen, ob Repo öffentlich ist, und ggf. Passwörter rotieren.

---

## 2026-07-08 – Obaid – Frontend: Adminbereich

**Branch:** `feature/admin-area` (in `main` gemergt)

### Was gemacht

1. **Admin-Grundgerüst** (Commit `882bc35`)
   - Neue, lazy-geladene Route `/admin` mit eigenem Layout (`AdminShell`): Sidebar + Topbar, getrennt von der öffentlichen Seite.
   - Platzhalterseiten: `dashboard`, `menu`, `reservations`, `settings`.
   - Farbschema/Fonts von der Restaurant-Seite übernommen, aber nüchterner Admin-Look.
   - `noindex`-Meta-Tag + `robots.txt`-Eintrag `Disallow: /admin`, damit der Adminbereich nicht in Suchmaschinen landet.

2. **Auth-Flow mit Platzhalter-Login** (Commit `10f740e`)
   - `AuthService`: merkt sich den Login-Status (Signal + localStorage). **Fake-Login** – akzeptiert vorerst jede Eingabe.
   - `authGuard`: schützt alle `/admin`-Seiten, leitet unangemeldet auf `/admin/login`.
   - Login-Screen im HAMTA-Look (Gold-Logo, Spinner, Fehlermeldung), außerhalb der Shell.
   - Logout-Button in der Topbar.

### Warum

Der Kunde/Admin soll das Restaurant später selbst verwalten können (Speisekarte, Reservierungen, Öffnungszeiten). Der Adminbereich ist bewusst „versteckt" (kein Login-Button auf der öffentlichen Seite) und über `hamta.at/admin` erreichbar. Die eigentliche Sicherheit übernimmt später Keycloak – der Platzhalter-Login lässt sich 1:1 austauschen, ohne den Rest der App zu ändern.

### Nächster geplanter Schritt (Obaid)

- `/admin/menu` an die echte Speisekarte-API anbinden (Liste, Anlegen, Bearbeiten, Löschen, Bild-Upload) – **abhängig von der Team-Entscheidung** zum Datenmodell (siehe [roadmap.md](roadmap.md)).

---

<!-- Vorlage für neue Einträge:

## JJJJ-MM-TT – Name – Bereich

### Was gemacht
- ...

### Warum
- ...

### Nächster geplanter Schritt
- ...

-->
