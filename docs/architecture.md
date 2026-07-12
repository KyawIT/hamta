# Architektur & Tech-Stack

## Überblick

Das Projekt besteht aus vier Teilen:

| Teil | Technologie | Zweck |
| ---- | ----------- | ----- |
| **Frontend** | Angular 21, Tailwind CSS 4 | Öffentliche Website + Adminbereich |
| **Backend** | Quarkus (Java), Hibernate Panache | REST-API für die Speisekarte |
| **Datenbank** | PostgreSQL 16 | Persistenz |
| **Auth** | Keycloak 26 + Quarkus OIDC | Admin-Anmeldung und Bearer-Token-Prüfung |
| **Storage** | MinIO (S3-kompatibel) | Bild-Uploads |

## Frontend

- **Öffentliche Seite** (`/`): Single-Page aus Sektionen – Hero, About, Menu, Gallery, Location, Contact. Dazu Rechtsseiten `/impressum` und `/datenschutz`.
- **Adminbereich** (`/admin`): eigener, lazy-geladener Bereich mit eigenem Layout (Sidebar + Topbar), getrennt von der öffentlichen Seite. Details siehe [worklog.md](worklog.md).
- **Design-Tokens** (in `frontend/src/styles.css`): dunkles Farbschema (`#131313`), Gold-Akzent (`#c9862f`), Schriften Manrope (sans) + Noto Serif. Scharfe Ecken.

## Backend – Speisekarte-API

Basis-URL: `http://localhost:8080` · Swagger-UI im Dev-Modus aktiv.

**Fünf** Gericht-Kategorien, jeweils als eigene Tabelle/Entity/Resource:
`Starter`, `MainCourse`, `Dessert`, `Cocktail`, `Beverage`. Bilder sind in eine
eigene `Image`-Entity ausgelagert (Fremdschlüssel `image_id`).

### Datenmodell (aktuell)

Speise-Entities (`Starter`, `MainCourse`, `Dessert`, `Cocktail`) sind gleich aufgebaut:

| Feld | Typ | Bemerkung |
| ---- | --- | --------- |
| `id` | Long | automatisch (DB-Sequence, Increment 50) |
| `name` | String | Pflichtfeld |
| `zutaten` | Text | Beschreibung / Zutaten |
| `preis` | BigDecimal(10,2) | Preis in Euro |
| `image` | → `Image` | optionaler Fremdschlüssel |

`Beverage` ist identisch, **ohne** `zutaten`. `Image` hat nur `id` + `url`.

> ⚠️ **Modell-Lücke:** Die Website zeigt feinere Kategorien (Steaks, Pizza, Salate,
> Aperitifs, Bier …), die im Backend alle in `main_course` bzw. `cocktail`/`beverage`
> zusammenfallen. Sauber wäre eine **Category-Entity** statt fester Tabellen – siehe [roadmap.md](roadmap.md).

### Endpoints

Für jede Kategorie identisch (`starters` / `main-courses` / `desserts` / `cocktails` / `beverages`):

| Methode | Pfad | Zweck |
| ------- | ---- | ----- |
| `GET` | `/api/{kategorie}` | Alle Gerichte |
| `GET` | `/api/{kategorie}/{id}` | Ein Gericht |
| `POST` | `/api/{kategorie}` | Anlegen |
| `PUT` | `/api/{kategorie}/{id}` | Bearbeiten |
| `DELETE` | `/api/{kategorie}/{id}` | Löschen |

### Bild-Upload & -Sync

| Methode | Pfad | Zweck |
| ------- | ---- | ----- |
| `POST` | `/api/images/upload/{category}/{id}` | Bild (Multipart `file`) hochladen |
| `POST` | `/api/images/sync` | MinIO-Bucket auslesen, fehlende URLs in `image` anlegen |

Upload-Ablauf: Bild → auf max. 1200px verkleinert → als **WebP** konvertiert → in MinIO
gespeichert → URL in die `image`-Tabelle geschrieben. Kategorien: `vorspeise`, `hauptspeise`, `nachspeise`.

### Seed-Daten (offen)

Es gibt zwei sich überschneidende Seed-Dateien (`backend/.../import.sql`, `seed_speisekarte.sql`
im Root), die **nicht** automatisch laufen → DB startet leer. Empfehlung: **eine** Flyway-Migration
als Quelle der Wahrheit. Siehe [roadmap.md](roadmap.md).

## Sicherheit (Status)

- Keycloak läuft im docker-compose. Quarkus validiert Bearer-Tokens über den Realm `hamta`;
  Server-URL und Client-ID können mit `OIDC_AUTH_SERVER_URL` und `OIDC_CLIENT_ID` gesetzt werden.
- Öffentliche Lesezugriffe auf Speisekarte, Kategorien und Galerie bleiben anonym erreichbar.
- Änderungen an Speisen, Getränken und Kategorien sowie Admin-Galerie, Bildverwaltung, Upload und
  MinIO-Sync erfordern einen gültigen Keycloak Access Token.
- Der Angular-Admin nutzt Authorization Code + PKCE und sendet das Access Token bei `/api`-Aufrufen
  als `Authorization: Bearer …` mit.

## Was es noch NICHT gibt

- Reservierungen (kein Entity/Endpoint)
- Öffnungszeiten / Einstellungen (kein Entity/Endpoint)
- Echte Authentifizierung (Frontend + Backend)
