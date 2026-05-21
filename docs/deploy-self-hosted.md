# Self-hosted Docker deploy (paused)

**Develop** and **main** marketing deploys use **Vercel** only. See [deploy-vercel.md](./deploy-vercel.md).

The `deploy-dev.yaml` workflow was removed temporarily so pushes to `develop` do not build Docker images or wait on self-hosted runners. Restore it from git history when you want VM/container deploy again.

Docker files under `deployment/` remain for local or future use.
