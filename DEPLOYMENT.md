# Deployment

`vibrant-lighthouse` stays a monorepo:

- `api/` contains the FastAPI application layer
- `database/` contains SQLAlchemy models, sessions, and Alembic migrations
- `ng-app/` contains the Angular frontend

## Production shape

Production deployment from this repo currently deploys the API and publishes both backend and frontend container images.
Shared infrastructure such as Traefik, PostgreSQL, and MySQL is expected to come from the separate `vm-infra` repository.

The deploy workflow at `.github/workflows/cicd-deploy.yml`:

1. Builds and pushes the API image to GitHub Container Registry
2. Builds and pushes the frontend image to GitHub Container Registry
3. Copies `docker-compose.deploy.yml` to the VM
4. Writes a remote `.env` file from GitHub secrets
5. Runs `alembic -c database/alembic.ini upgrade head` against the shared PostgreSQL database
6. Starts or updates the FastAPI container on the shared external Docker network

The backend uses `DATABASE_SCHEMA` so migrations and runtime queries can stay inside the app's own PostgreSQL schema.
Both backend Cognito settings and frontend runtime config are environment-driven.

## Required GitHub secrets

- `API_HOST`
- `PLATFORM_NETWORK`
- `VM_HOST`
- `VM_USER`
- `VM_SSH_KEY`
- `VM_SSH_PORT`
- `GHCR_USERNAME`
- `GHCR_PAT`
- `DATABASE_HOSTNAME`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `DATABASE_SCHEMA`
- `COGNITO_REGION`
- `COGNITO_USERPOOL_ID`
- `COGNITO_APP_CLIENT_ID`

The workflow pushes images to:

- `ghcr.io/<repo-owner>/vibrant-lighthouse-api`
- `ghcr.io/<repo-owner>/vibrant-lighthouse-frontend`

On the VM, `GHCR_USERNAME` and `GHCR_PAT` are used to pull the API package before migrations and deploy.

## Frontend

The frontend is now published as a production-ready container image as part of the same pipeline.
It is not yet auto-deployed on the VM, but it is ready to be wired into `vm-infra` and Traefik using the image already stored in GHCR.
At container startup it generates `assets/runtime-config.js` from environment variables, so the built bundle no longer hard-codes the production API URL or Cognito identifiers.

Frontend runtime variables:

- `FRONTEND_API_URL`
- `FRONTEND_COGNITO_USER_POOL_ID`
- `FRONTEND_COGNITO_APP_CLIENT_ID`

## Local development

Use `docker compose -f docker-compose.dev.yml up --build`.
This local stack now matches the current monorepo layout and runs Alembic from `database/alembic.ini`.
