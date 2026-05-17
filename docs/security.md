# Security Implementation

## Secrets Management

- Azure Key Vault is provisioned by Terraform.
- Kubernetes pulls secrets using Secrets Store CSI Driver + `SecretProviderClass`.
- Backend reads `APPINSIGHTS_CONNECTION_STRING` from Kubernetes secret `backend-secrets`.

## Cluster Hardening

- Namespace-level Pod Security Admission labels enabled:
  - `staging`: `baseline`
  - `production`: `restricted`
- NetworkPolicy restricts backend ingress to only frontend pods.
- Container `securityContext` uses `allowPrivilegeEscalation: false`.

## CI Security Controls

- Trivy image scan runs in CI for HIGH/CRITICAL vulnerabilities.
- PR template includes explicit "No hardcoded secrets" checkpoint.

## Recommended Extensions

- Add Microsoft Defender for Cloud container scanning.
- Enable workload identity and disable legacy pod identity paths.
- Add dependency scanning (npm audit/Snyk/Dependabot) in CI.
