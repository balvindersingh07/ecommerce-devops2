# Git Workflow

This repository follows a simplified Git Flow model.

## Branches

- `main`: production branch
- `develop`: active integration
- `feature/<name>`: feature branches from `develop`
- `hotfix/<name>`: urgent fixes from `main`

## Pull Requests

- All changes merge via PR.
- At least one reviewer required.
- CI checks must pass before merge.
- No direct commits to `main`.
