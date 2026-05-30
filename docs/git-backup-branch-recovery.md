# Git backup branch and recovering `main`

This is a common strategy when you are about to do a major overhaul or push experimental development code to `main` but want an absolute safety net.

Think of branches in Git like pointers to specific snapshots (commits) of your codebase. Creating a backup branch creates a new pointer to your current `main` snapshot. If things go sideways later, you can force `main` to point back to exactly where `backup` is.

## Before risky work: create a backup branch

```bash
# 1. Fetch the latest updates from the remote
git fetch origin

# 2. Make sure you are on main and it matches remote
git checkout main
git pull origin main

# 3. Create a backup branch at the current main snapshot
git branch backup

# 4. Push the backup branch to the remote (recommended)
git push -u origin backup
```

Keep `backup` on the remote until you are confident the new work on `main` is stable.

## Recover `main` from `backup` (force-push)

Use this only when you need to roll remote `main` back to the snapshot stored on `backup`.

```bash
# 1. Fetch the latest updates from the remote to make sure your tracking is accurate
git fetch origin

# 2. Switch to your local backup branch
git checkout backup

# 3. Force-push the local backup branch directly into the remote main branch
git push origin backup:main --force
```

### What `git push origin backup:main --force` does

- **`backup:main`** — Tells Git: take the local `backup` branch and push it to the remote branch named `main`.
- **`--force` (or `-f`)** — Tells the remote server to ignore the fact that history is changing. Erase whatever is currently on remote `main` and replace it entirely with this snapshot.

## Important production warnings

Because you are working in a team environment (for example the **InfraFund-net7** repositories), force-pushing to `main` can be dangerous. Keep these in mind:

### Branch protection rules

Most production repositories have branch protection enabled on `main` that blocks force pushes (`--force`). If that is the case, you will get an error. You would either need to temporarily disable that protection in the repository settings (with team approval) or use a **`git revert`** strategy instead of rewriting history.

### Disrupting co-workers

Force-pushing rewrites Git history. If other developers have pulled the “bad” `main` branch in the meantime, their local histories will diverge, and they will have to manually reset their local branches to match the new rewritten `main`:

```bash
git fetch origin
git checkout main
git reset --hard origin/main
```

Coordinate with the team before force-pushing to `main`.

## Related docs

- [Deploy on Vercel](./deploy-vercel.md)
- [Contributing](../CONTRIBUTING.md)
