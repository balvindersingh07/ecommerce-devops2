# Architecture Design

## CI/CD Workflow

1. Developer pushes feature branch and raises PR.
2. Azure DevOps CI pipeline triggers on PR and target branches.
3. Frontend/backend tests run, then Docker images build and push to ACR.
4. CD pipeline deploys to AKS staging namespace.
5. Manual validation gate controls promotion to production namespace.

## Git Branching Strategy

- `main`: production-ready
- `develop`: integration branch
- `feature/*`: feature development
- `hotfix/*`: emergency production fixes

## Containerization Design

- Frontend image: React build served via NGINX
- Backend image: Node.js Express API
- Local development: `docker-compose.yml`

## Azure Services

- Azure DevOps: CI/CD orchestration
- ACR: image registry
- AKS: orchestration runtime
- Key Vault: secret management
- Log Analytics + Application Insights + Azure Monitor: observability
