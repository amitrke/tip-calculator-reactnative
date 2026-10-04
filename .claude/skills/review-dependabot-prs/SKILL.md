---
name: review-dependabot-prs
description: Triage open Dependabot pull requests for this repo and automatically merge every one that is not failing its PR checks, without asking per PR. Use whenever the user asks to review, triage, process, clear, or merge dependabot PRs or dependency updates in this repo.
---

# Triage and auto-merge Dependabot PRs (Tip Calculator)

`.github/dependabot.yml` runs weekly version updates for the root npm
(yarn) project and GitHub Actions, targeting **`develop`**, with Expo, React
and React Native major/minor bumps ignored (those move together via
`npx expo install --fix`). Security-update PRs from before that config (or on
branches it doesn't cover) may still target **`main`**. Policy: **merge
everything that is not failing the automatic checks that run on PR creation.**
No confirmation is needed per PR, and bump size is not a reason to hold, except
as noted in step 4. Merging to `develop` runs Expo Build Test (`eas update`);
merging to `main` triggers Expo Publish (`expo export` only, no store
submission).

## 1. List open Dependabot PRs

```
gh pr list --author "app/dependabot" --state open --limit 50 \
  --json number,title,baseRefName,mergeable,mergeStateStatus,statusCheckRollup,url
```

If there are none, say so and stop. Skip (and report) any PR whose base isn't
`main` or `develop`.

## 2. Classify each PR from `statusCheckRollup`

- **Failing**: any `CheckRun` with conclusion `FAILURE`, `TIMED_OUT`,
  `CANCELLED`, or `ACTION_REQUIRED`, or any `StatusContext` with state
  `FAILURE`/`ERROR`. **Do not merge.** Find the cause
  (`gh pr checks <n>`, `gh run view <run-id> --log-failed`) and report it in
  one line.
- **Pending**: any check not yet `COMPLETED`, or `mergeable` is `UNKNOWN`. Don't
  merge yet; report as pending. Don't poll or sleep in a loop.
- **Conflicting**: `mergeable` is `CONFLICTING`. Don't merge; comment
  `@dependabot rebase` (`gh pr comment <n> --body "@dependabot rebase"`) and
  report it.
- **Not failing**: every check is `SUCCESS`, `SKIPPED`, or `NEUTRAL` and the PR
  is `MERGEABLE`. **Merge.**

A PR with zero checks reported is treated as pending, not passing.

## 3. Merge

```
gh pr merge <n> --merge
```

Use `--merge` (the repo history uses merge commits, e.g. "Merge pull request
#50 from ..."). Never use `--admin` to bypass failing or missing required
checks. Merge one at a time; after each merge, re-check the remaining PRs with
`gh pr view <n> --json mergeable,mergeStateStatus`. PRs touching `yarn.lock`
commonly turn conflicting; those get `@dependabot rebase` and are picked up on
the next run.

## 4. Report

Give a short table: merged (number, package, from→to), failing (with cause),
pending, conflicting/awaiting rebase, skipped (other base). Call out any
**major version bumps** or bumps of `expo`, `react-native`, or `react` that were
merged, since Expo SDK versions are pinned together and these can break the
app even when checks pass; recommend a local `yarn install` + smoke test.

Merging to `main` leaves `develop` behind. Mention that `develop` should pull
`origin/main` afterwards. Don't close PRs or comment `@dependabot ignore`
unless the user asks.
