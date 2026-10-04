---
name: cleanup-merged-branches
description: Delete local and remote git branches in this repo that are already merged into main or develop (including merged Dependabot and feature branches), never touching main, develop, the current branch, or anything with unmerged work. Use when the user asks to clean up, prune, or delete merged/stale branches.
---

# Clean up merged branches (Tip Calculator)

Deletes branches whose work is already in `origin/main` or `origin/develop`. It
only ever uses **safe deletes**: it never force-deletes, and never deletes a
branch that has commits not in one of those two branches.

## 0. Protected: never delete

`main`, `develop`, **`gh-pages`** and **`old`** (long-lived branches on
`origin`), the currently checked-out branch, any branch checked out in another
worktree (`git worktree list`), any branch matching `release/*`, and any
branch with an **open** PR (`gh pr list --state open --json headRefName`).

## 1. Update refs

```
git fetch --prune origin
```

Don't check out or pull anything. Work from `origin/main` and `origin/develop`.

## 2. Find merged branches

**Merged by ancestry** (the repo uses merge commits, so this covers nearly all).
Run for both `origin/main` and `origin/develop`; a branch counts if it is merged
into either:

```
git branch --merged origin/main --format='%(refname:short)'
git branch --merged origin/develop --format='%(refname:short)'
git branch -r --merged origin/main --format='%(refname:short)'
git branch -r --merged origin/develop --format='%(refname:short)'
```

**Merged but not ancestors** (squash or rebase merges), found via GitHub:

```
gh pr list --state merged --limit 200 --json headRefName,headRefOid,baseRefName
```

For each such PR, count the branch only if its current tip equals the PR's
`headRefOid`. If the branch has moved on since the merge, it has new commits
and must be kept.

Drop everything in the protected list, strip the `origin/` prefix for remote
branches, and ignore `origin/HEAD`.

## 3. Delete

Local:

```
git branch -d <branch>
```

`-d` refuses to delete unmerged work; if it refuses, keep the branch and report
it. **Never use `-D`.**

Remote (only branches from step 2 that still exist on `origin`):

```
git push origin --delete <branch>
```

Delete remote branches one at a time and report any failure (for example a
branch protection rule) without retrying or bypassing it. Don't use wildcards
or bulk-delete commands.

If the current branch is merged, don't delete it or switch away. List it under
"kept" so the user can handle it.

## 4. Report

Report: local branches deleted, remote branches deleted, branches kept and why
(open PR, checked out, unmerged commits, tip moved after merge, delete
refused), and anything that failed. If nothing was merged, say so. Finish with
`git fetch --prune origin` so local remote-tracking refs match.

Remote branch deletion can't be undone from here, though a merged branch's
commits remain reachable from `main`/`develop` history, and GitHub can restore a
deleted branch from its merged PR page.
