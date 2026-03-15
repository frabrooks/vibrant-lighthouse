# Local Development

There are two reasonable ways to work on `vibrant-lighthouse` locally.

## Option 1: Docker-based local stack

Use this if you want the repo to connect to your already-running local `vm-infra` stack, run Alembic migrations, and start both backend and frontend for you.

From the repo root:

```powershell
Copy-Item .env.local.example .env.local
docker compose --env-file .env.local -f docker-compose.dev.yml up --build
```

What this does:

- joins the external Docker network provided by your local `vm-infra`
- runs the FastAPI backend against the PostgreSQL instance from that shared stack
- applies Alembic migrations from `database/alembic.ini`
- starts the Angular dev server on port `4200`

You should create a local `.env.local` in the repo root with the values the backend needs, especially:

```env
PLATFORM_NETWORK=platform
DATABASE_HOSTNAME=postgres
DATABASE_PORT=5432
DATABASE_NAME=platform
DATABASE_USERNAME=platform
DATABASE_PASSWORD=change-me
DATABASE_SCHEMA=vibrant_lighthouse
COGNITO_REGION=eu-west-2
COGNITO_USERPOOL_ID=replace-me
COGNITO_APP_CLIENT_ID=replace-me
```

## Option 2: Mixed local workflow with Python venv

Use this if you want your editor and local shell to run the backend directly instead of through Docker.

### Backend

From `api/`:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Then from the repo root, with the venv active:

```powershell
alembic -c database/alembic.ini upgrade head
uvicorn api.app.main:app --reload
```

### Frontend

From `ng-app/`:

```powershell
npm ci
npm start
```

The frontend reads browser runtime config from `ng-app/src/assets/runtime-config.js` in local development.

## Notes

- VS Code import errors like `Import "pydantic" could not be resolved` usually mean the Python interpreter is not set to `api/venv`.
- The production frontend container uses runtime environment injection, but local dev uses the checked-in `src/assets/runtime-config.js` defaults unless you change them.
- The current production build for the frontend succeeds, but Angular still reports bundle-size warnings and a CommonJS warning for `qrcode`.
