# Arbeitsprotokoll

Chronologisches Protokoll der Arbeit. Neueste Einträge oben.
Format pro Eintrag: **Datum – Person – Bereich**, dann kurz *Was* und *Warum*.

---

## 2026-07-08 – Obaid – Frontend: Adminbereich

**Branch:** `feature/admin-area` (noch nicht in `main` gemergt)

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
