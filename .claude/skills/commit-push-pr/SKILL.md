---
name: commit-push-pr
description: Commit the current changes, push the branch, and open a pull request following this repo's conventions (conventional commit messages, feature-branch → develop → main flow, gh pr create with a Summary/Test plan body). Use whenever the user asks to commit, push, ship, or open a PR for work in this repo.
---

# Commit, push, and open a PR (Tip Calculator)

Use this whenever the user asks to commit work, push a branch, "ship" a change,
or open a pull request in this repo. Follow every step — don't skip the
confirmation gates, since push and PR creation are visible to others.

## 1. Assess state first

Run in parallel:
- `git status` (never `-uall`)
- `git diff` (unstaged) and `git diff --staged`
- `git log --oneline -15` — match the existing style: mostly **Conventional
  Commits** (`type: imperative summary`, lowercase, no trailing period) with
  types `feat`, `fix`, `chore`, `docs`, `build`, `ci`, `refactor`.

Confirm nothing unexpected is staged (secrets, `.env`, build output, generated
screenshots) before proceeding. If `git status` after a broad `git add` shows
files you didn't expect, stop and check their contents.

## 2. Figure out the right branch

Branch model (see `CLAUDE.md`):
- `develop` is the working branch; `main` is production.
- Small changes can be committed on `develop`. Larger or risky work → its own
  branch `git checkout -b <type>/<short-kebab-description>` off `develop`, PR
  into `develop`.
- Release: PR `develop` into `main`. Pushes to `main` run Expo Publish.

So:
- **On `main`**: stop. Never commit or push here directly — ask the user.
- **On `develop`** with a normal change: commit there, unless the change is
  large/risky, in which case branch first.
- **On a feature branch**: commit there as normal.
- **Preparing a release**: stay on `develop`; the PR base is `main`.

If unclear which applies, ask rather than guessing.

## 3. Commit

- Stage specific files by name — avoid `git add -A`/`git add .`.
- Focus the message on *why*, not a restatement of the diff.
- Only create commits when the user has asked for one (or clearly asked for
  the full commit→push→PR flow in this same request).
- Follow the attribution/trailer instructions given in the session.
- Never use `--no-verify`, `--amend` (unless explicitly asked), or skip hooks.
  If a pre-commit hook fails, fix the underlying issue and make a new commit.
- Before committing code changes, run `npx tsc --noEmit` (strict TypeScript).

## 4. Confirm before pushing

Pushing and opening a PR are visible to others. Show the user what will be
pushed (branch, target base, commit summary) and get an explicit go-ahead —
unless they already asked for the full commit→push→PR flow in the same message.

## 5. Push

```
git push -u origin <branch>
```

Never force-push without explicit user instruction, and never force-push to
`main`/`develop` at all.

## 6. Open the PR

```
gh pr create --base <develop-or-main> --title "<type: summary>" --body "$(cat <<'EOF'
## Summary
- <1-3 bullet points, what changed and why>

## Test plan
- [ ] <how this was/should be verified>
EOF
)"
```

- Default base is `develop` for feature branches; `main` for a deliberate
  `develop`→`main` release PR.
- Base the Summary on everything in the diff, not just the latest commit.
- Return the PR URL to the user when done.

## Repo-specific things worth mentioning

- The Maestro Tests workflow (macOS runner) runs on PRs to `main`/`develop`
  and is slow; a green TypeScript check locally isn't the same as it passing.
- Pushes to `develop` run Expo Build Test (`eas update`); pushes to `main` run
  Expo Publish. Store builds are manual (`workflow_dispatch`).
