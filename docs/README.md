# Hamta – Projektdokumentation

Website & Verwaltungssystem für das Restaurant **Hamta** (italienische Küche & Pizza, Linz).

## Team

| Person | Schwerpunkt |
| ------ | ----------- |
| Milad  | Backend |
| Kyaw   | Frontend |
| Obaid  | Frontend / gemischt |

## Dokumente

| Datei | Inhalt |
| ----- | ------ |
| [architecture.md](architecture.md) | System-Überblick, Tech-Stack, Backend-API-Referenz |
| [worklog.md](worklog.md) | Chronologisches Arbeitsprotokoll – wer hat was gemacht |
| [roadmap.md](roadmap.md) | Nächste Schritte & offene Team-Entscheidungen |

## Projektstruktur (Repo-Root)

```
hamta/
  frontend/          Angular 21 App (aktive Website + Adminbereich)
  frontend-legacy/   Alte Frontend-Version (nur Referenz)
  backend/           Quarkus REST-API (Java)
  docker/            docker-compose: Postgres, Keycloak, MinIO
  docs/              Diese Dokumentation
```

## Schnellstart

### Frontend

```bash
cd frontend
npm install        # nach jedem Pull mit geänderter package.json wichtig!
npm start          # läuft auf http://localhost:4200
```

### Infrastruktur (Datenbank, Auth, Storage)

```bash
cd docker
cp .env.example .env   # Werte anpassen
docker compose up -d
```

Dienste danach erreichbar unter:
- **Postgres** – Port `5433`
- **Keycloak** – http://localhost:8081
- **MinIO** – API `9010`, Konsole http://localhost:9011

### Backend

```bash
cd backend
./mvnw quarkus:dev     # Dev-Modus mit Hot Reload
```

Swagger-UI (API-Doku) ist im Dev-Modus aktiv.
