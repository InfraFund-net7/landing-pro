# Self-hosted runner deploy (`develop` only)

**Production (`main`)** deploys on **Vercel** — see [deploy-vercel.md](./deploy-vercel.md). There is no `deploy.yaml` for `main`.

**Develop** can still use Docker on your VM via `deploy-dev.yaml`.

## Temporary: GitHub-hosted deploy test

Deploy jobs currently use **`runs-on: ubuntu-latest`** and only **load/verify** the Docker image (smoke test). They do **not** update your server.

When self-hosted access is fixed, change deploy back to `[self-hosted, develop-runner]` / `[self-hosted, prod-runner]` and uncomment the compose deploy steps in the workflow files.

| Branch | Workflow | Deploy runner label | Typical host |
|--------|----------|---------------------|--------------|
| `develop` | `deploy-dev.yaml` | `develop-runner` (when not smoke test) | `infrafund-develop` |
| `main` | — | Vercel Git deploy | Vercel edge |

## Fix: deploy job stuck on "Waiting for a runner"

The build job succeeds; deploy waits forever when **this repo cannot see a self-hosted runner** with the right label.

### 1. Confirm the label on the server

```bash
cd ~/actions-runner
cat .runner | grep -E 'agentName|labels'
sudo ./svc.sh status
```

Develop needs `"develop-runner"` in `labels`. Prod needs `"prod-runner"` on the prod machine.

### 2. Confirm the repo sees the runner (most common fix)

**landing-pro** → **Settings** → **Actions** → **Runners** → **Self-hosted runners** tab.

- **Empty tab** → org runner is not shared with this repo. Deploy will always stall.
- **infrafund-develop** listed as **Idle** → repo access is OK; re-run the workflow.

### 3. Org admin: grant repository access

Runner service name like `actions.runner.InfraFund-net7.infrafund-develop` means an **organization** runner.

1. **InfraFund-net7** → **Settings** → **Actions** → **Runner groups**
2. Open the group for `infrafund-develop`
3. **Repository access** → add **landing-pro** (or all repositories)
4. Save and refresh the repo **Self-hosted** tab

### 4. Alternative: repo-level runner

**landing-pro** → **Settings** → **Actions** → **Runners** → **New self-hosted runner**

Register on the VM with URL `https://github.com/InfraFund-net7/landing-pro` and label `develop-runner`. It will appear under the repo without org group changes.

### 5. Re-run

Cancel the stuck run (optional) → **Re-run all jobs** after the runner shows **Idle** on the Self-hosted tab.

## Required GitHub configuration

- **Secrets:** `DATABASE_URL`, `PAYLOAD_SECRET`, `DEV_*` (develop); `PROD_*` (main)
- **Variables:** `DOCKER_COMPOSE_PATH_DEVELOP`, `DOCKER_COMPOSE_PATH_PRODUCTION`

## Server checklist

- `sudo ./svc.sh status` → active (running)
- Logs: `Connected to GitHub`, `Listening for Jobs`
- Docker and compose paths in `vars` exist on the runner host
