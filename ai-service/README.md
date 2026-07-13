# NextTrip AI Service

Standalone local AI service for:

- Smart Trip Planner API
- Nearby Places Explore API

It uses the project data sent by Laravel and applies recommendation/scoring logic without external packages.

## Run

```bash
python server.py
```

Default URL:

```text
http://127.0.0.1:8010
```

Laravel reads this URL from `AI_SERVICE_URL`.
