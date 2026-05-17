# Branch Protection Checklist

Use this checklist for `main` and `develop`.

## Required Settings

- Protect `main` and `develop` from direct pushes.
- Require pull request before merge.
- Require at least 1 reviewer approval.
- Require successful CI status checks before merge.
- Require resolved conversations before merge.

## Suggested Required Checks

- `Frontend install, test, build`
- `Backend install and test`
- `Build and push frontend image`
- `Build and push backend image`
- `Run Trivy scan for backend image`

## Merge Strategy

- Allow squash merges for feature branches.
- Restrict force push and branch deletion.

## Azure Repos Equivalent Policies

- Minimum number of reviewers: 1+
- Build validation policy: required
- Work item linking: required (optional if course does not mandate)
- Check for comment resolution: required
