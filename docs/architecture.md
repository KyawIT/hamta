# Architektur & Tech-Stack

## Überblick

Das Projekt besteht aus vier Teilen:

| Teil | Technologie | Zweck |
| ---- | ----------- | ----- |
| **Frontend** | Angular 21, Tailwind CSS 4 | Öffentliche Website + Adminbereich |
| **Backend** | Quarkus (Java), Hibernate Panache | REST-API für die Speisekarte |
| **Datenbank** | PostgreSQL 16 | Persistenz |
| **Auth** | Keycloak 26 | Anmeldung / Rollen (noch nicht verdrahtet) |
| **Storage** | MinIO (S3-kompatibel) | Bild-Uploads |

## Frontend

- **Öffentliche Seite** (`/`): Single-Page aus Sektionen – Hero, About, Menu, Gallery, Location, Contact. Dazu Rechtsseiten `/impressum` und `/datenschutz`.
- **Adminbereich** (`/admin`): eigener, lazy-geladener Bereich mit eigenem Layout (Sidebar + Topbar), getrennt von der öffentlichen Seite. Details siehe [worklog.md](worklog.md).
- **Design-Tokens** (in `frontend/src/styles.css`): dunkles Farbschema (`#131313`), Gold-Akzent (`#c9862f`), Schriften Manrope (sans) + Noto Serif. Scharfe Ecken.

## Backend – Speisekarte-API

Basis-URL: `http://localhost:8080`

Drei Gericht-Kategorien, jeweils als eigene Tabelle/Entity/Resource:

### Datenmodell (aktuell)

Alle drei Entities (`Vorspeise`, `Hauptspeise`, `Nachspeise`) sind **identisch** aufgebaut:

| Feld | Typ | Bemerkung |
| ---- | --- | --------- |
| `id` | Long | automatisch (DB-Sequence, Increment 50) |
| `name` | String | Pflichtfeld |
| `imageUrl` | String | optional, wird beim Bild-Upload gesetzt |

> ⚠️ Noch **keine** Felder für Preis, Beschreibung, Allergene o.ä. – siehe offene Punkte in [roadmap.md](roadmap.md).

### Endpoints

Für jede Kategorie identisch (`vorspeisen` / `hauptspeisen` / `nachspeisen`):

| Methode | Pfad | Zweck |
| ------- | ---- | ----- |
| `GET` | `/api/{kategorie}` | Alle Gerichte |
| `GET` | `/api/{kategorie}/{id}` | Ein Gericht |
| `POST` | `/api/{kategorie}` | Anlegen |
| `PUT` | `/api/{kategorie}/{id}` | Bearbeiten |
| `DELETE` | `/api/{kategorie}/{id}` | Löschen |

### Bild-Upload

| Methode | Pfad | Zweck |
| ------- | ---- | ----- |
| `POST` | `/api/images/upload/{category}/{id}` | Bild (Multipart `file`) hochladen |

Ablauf: Bild → auf max. 1200px verkleinert → als **WebP** konvertiert → in MinIO gespeichert → URL automatisch in `image_url` des Gerichts geschrieben. Erlaubte Kategorien: `vorspeise`, `hauptspeise`, `nachspeise`.

## Sicherheit (Status)

- Keycloak läuft im docker-compose und die Dependency ist im Backend vorhanden.
- **Aber:** Es gibt keine OIDC-Konfiguration und keine `@RolesAllowed`-Annotationen → **die API ist aktuell offen.**
- Frontend-Login ist derzeit ein Platzhalter (`AuthService`), 1:1 gegen Keycloak austauschbar.

## Was es noch NICHT gibt

- Reservierungen (kein Entity/Endpoint)
- Öffnungszeiten / Einstellungen (kein Entity/Endpoint)
- Echte Authentifizierung (Frontend + Backend)
