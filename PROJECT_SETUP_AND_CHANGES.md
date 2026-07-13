# NextTrip Project Setup and Changes

## Required Services

The project must run three services at the same time:

```text
Backend:  http://127.0.0.1:8000
Frontend: http://127.0.0.1:5173
AI:       http://127.0.0.1:8010
```

## Backend Setup

Start MySQL from XAMPP, then create a database named:

```text
next_trip
```

Run the backend with the project-local PHP 8.3 scripts:

```bash
cd C:\Users\User\Desktop\mohamad\backend
./artisan83.bat key:generate
./artisan83.bat migrate
./artisan83.bat db:seed
./artisan83.bat storage:link
./artisan83.bat serve
```

Do not use global `php artisan` for this project. Use:

```bash
./artisan83.bat
./composer83.bat
```

This project uses Laravel 13 and requires PHP 8.3.

## AI Service Setup

Run the AI service:

```bash
cd C:\Users\User\Desktop\mohamad\ai-service
python server.py
```

Health check:

```text
http://127.0.0.1:8010/health
```

AI service endpoints:

```text
GET  /health
POST /plan-trip
POST /nearby-places
```

## Frontend Setup

Run the frontend:

```bash
cd C:\Users\User\Desktop\mohamad\frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Test Accounts

```text
Admin
email: admin@test.com
password: password
```

```text
Tourist
email: noor@test.com
password: password
```

```text
Tourist
email: suliman@test.com
password: password
```

```text
Guide
email: baraa@test.com
password: password
```

```text
Guide
email: matar@test.com
password: password
```

## AI Feature Location

The AI trip planner UI is available for tourist users:

```text
http://127.0.0.1:5173/tourist/trip
```

Login with a tourist account before opening this page.

## Implemented AI APIs

### 1. Smart Trip Planner API

Frontend calls Laravel:

```text
POST /api/tourist/ai/trips/plan
```

Laravel calls the AI service:

```text
POST http://127.0.0.1:8010/plan-trip
```

The AI service scores places based on:

- user interests
- rating
- reviews count
- budget
- activity level
- outdoor preference
- approximate route distance

It returns a multi-day trip plan with ordered places, start times, durations, estimated costs, travel time, and AI scores.

### 2. Nearby Places Explore API

Frontend calls Laravel:

```text
POST /api/tourist/ai/nearby-places
```

Laravel calls the AI service:

```text
POST http://127.0.0.1:8010/nearby-places
```

The AI service filters and ranks nearby places based on:

- latitude and longitude
- radius in kilometers
- budget
- interests
- rating
- distance

## Backend Changes

Added the Laravel AI client:

```text
backend/app/Services/AiServiceClient.php
```

It sends requests from Laravel to the AI service at:

```text
http://127.0.0.1:8010
```

The HTTP timeout was increased to 60 seconds to support larger AI responses.

Added the tourist AI controller:

```text
backend/app/Http/Controllers/Tourist/AiTripController.php
```

Added Laravel API endpoints:

```text
POST /api/tourist/ai/trips/plan
GET  /api/tourist/ai/trips
GET  /api/tourist/ai/trips/{trip}
POST /api/tourist/ai/nearby-places
```

Added or updated models/resources for AI trip storage and nearby results:

```text
backend/app/Models/AiNearbyExplore.php
backend/app/Models/AiNearbyExploreResult.php
backend/app/Models/Trip.php
backend/app/Models/TripPlace.php
backend/app/Http/Resources/TripResource.php
backend/app/Http/Resources/TripPlaceResource.php
backend/app/Http/Resources/PlaceResource.php
```

Updated the AI migration:

```text
backend/database/migrations/2026_06_06_111845_create_ai.php
```

Updated `.env.example` with the AI service URL:

```text
AI_SERVICE_URL=http://127.0.0.1:8010
```

## AI Service Changes

Added a standalone Python AI service:

```text
ai-service/server.py
```

The service implements:

- smart trip planning
- nearby place exploration
- health check endpoint

The server was updated to use `ThreadingHTTPServer` and to handle client disconnects cleanly.

## Machine Learning Layer

An experimental machine learning layer was added inside:

```text
ai-service/server.py
```

The ML layer does not require external packages such as `scikit-learn`. It uses a lightweight Logistic Regression implementation written with Python standard library code.

Because the project does not yet have real user interaction history, the service generates a synthetic training dataset from the current project places and request preferences. Each synthetic row represents a simulated user-place interaction.

Synthetic features include:

- interest match
- rating
- reviews count
- budget fit
- activity level match
- indoor/outdoor match
- distance score
- expected visit duration

The model predicts a user-place suitability probability and returns it as:

```text
ml_score
```

The final ranking now combines the previous rule-based score with the ML score:

```text
final_score = 70% rule_based_score + 30% ml_score
```

The AI responses now include ML evaluation metrics:

```text
accuracy
precision
recall
f1
samples
test_samples
```

Important note: these metrics are calculated on synthetic data generated from the project data. They are useful for demonstrating ML readiness and model behavior, but they should not be presented as real-world production accuracy until real user interactions are collected.

## Frontend Changes

Added the tourist AI trip planner page:

```text
frontend/src/features/tourist/trip-planner/pages/TripPlannerPage.tsx
```

Added the tourist route:

```text
/tourist/trip
```

Added frontend API integration for:

- Smart Trip Planner
- Nearby Places Explore
- categories lookup
- interests lookup

## Additional Fixes

Added project-local PHP runtime scripts:

```text
backend/artisan83.bat
backend/composer83.bat
```

Fixed frontend admin API compatibility issues:

- Admin places now use `/admin/places` instead of `/admin/destinations`.
- Suggested places table now supports backend response shape with nested `user` and `city`.
- Admin users page now handles paginated backend responses correctly.
- Admin users page now maps backend fields `role` and `status` to frontend fields.
- User statuses were aligned with backend values:

```text
active
blocked
unavailable
closed
```

Added the admin notifications route:

```text
/admin/notifications
```

## Common Issues

### Frontend URL does not open

Run Vite explicitly on IPv4:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Then open:

```text
http://127.0.0.1:5173
```

### AI root URL returns 404

This is normal:

```text
http://127.0.0.1:8010
```

Use the health endpoint instead:

```text
http://127.0.0.1:8010/health
```

### MySQL connection refused

Start MySQL from XAMPP and make sure the database exists:

```text
next_trip
```
