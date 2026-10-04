---
name: fix-failing-actions
description: Look through the most recent GitHub Actions runs for this repo, diagnose the failing ones, and fix the ones whose cause is in the repo (code, TypeScript, build, workflow config) on a branch with a PR. Use when the user asks to check CI, look at failing workflows/actions/builds, or fix broken pipelines.
---

# Diagnose and fix failing GitHub Actions runs (Tip Calculator)

Workflows live in `.github/workflows/`: `ci.yml` (typecheck + `expo export`
on push/PR to `main` and `develop`), `expo-built.yml` (push to `develop`:
`eas update` OTA publish), `expo-publish.yml` (push to `main`: `expo export`
check), and the manual `android-google-play-submit.yml` /
`ios-testflight.yml`. The goal is to
find real failures, fix what is fixable from the repo, and clearly report the
rest.

## 1. Find recent failures

```
gh run list --limit 40 --json databaseId,workflowName,displayTitle,headBranch,event,conclusion,status,createdAt,url
```

Keep runs with `conclusion` of `failure` or `timed_out`. Ignore `cancelled`,
`skipped`, and in-progress runs. Then **dedupe**: for each (workflow, branch),
only the newest run matters. If a newer run of the same workflow on the same
branch succeeded, the failure is already resolved, so skip it and say so.

## 2. Diagnose each remaining failure

```
gh run view <id> --json jobs -q '.jobs[] | select(.conclusion=="failure") | {name, steps: [.steps[] | select(.conclusion=="failure") | .name]}'
gh run view <id> --log-failed | tail -n 80
```

Find the failing step and the actual error line. yarn/npm `warn` lines are
noise; keep reading to the real error. Classify the cause:

- **Fixable in the repo**: TypeScript/build errors, bundling errors from
  `expo export`, broken workflow YAML, wrong paths/versions/Node version in a
  workflow, `yarn.lock` out of sync with `package.json`.
- **Dependabot PR broken by the bump itself** (e.g. a major bump with an
  incompatible peer dependency or Expo SDK mismatch): not a repo bug. Report it
  and recommend holding or closing the PR; don't hand-edit Dependabot branches.
- **Infra / transient / external**: network timeouts, registry outages, runner
  or simulator boot failures, store API rate limits. Suggest
  `gh run rerun <id> --failed`, and only rerun if the user says so.
- **Needs secrets or the user's accounts**: expired or missing `EXPO_TOKEN`,
  signing credentials, Google Play / App Store Connect auth errors. Do **not**
  attempt a workaround; report exactly what the user must refresh. Never
  print, echo, or add secret values.

## 3. Reproduce locally before fixing

Check out the failing ref and run what the workflow runs:
- `yarn install --frozen-lockfile`
- `npx tsc --noEmit`
- `yarn test` (currently a no-op) and, for publish failures,
  `npx expo export --platform android` / `--platform ios`

Read the workflow file for the authoritative commands. Confirm the failure
reproduces, make the smallest fix, and re-run the same commands to confirm it
passes. If a failure doesn't reproduce locally, say so rather than guessing at a fix.

## 4. Ship fixes safely

- Never commit directly to `main` or `develop`, and never touch a Dependabot
  branch. Branch off the failing branch's base:
  `git checkout -b fix/ci-<short-description> origin/develop`.
- Don't weaken CI to get green: no removing checks, adding
  `continue-on-error`, or skipping tests, unless the user explicitly asks.
- Changes to publish/submit workflows run against production; make the minimal
  fix and call it out in the PR.
- Commit and open the PR using the `commit-push-pr` skill. One PR per distinct
  root cause. When running unattended, push the fix branch and open the PR
  (that is the requested outcome of this skill) but never merge it.

## 5. Report

Give a table of recent failures: workflow, branch, run link, cause, and
outcome (fixed in PR link / needs user action / transient, rerun suggested /
Dependabot bump incompatible / already resolved). Don't claim a fix works
until the local reproduction passes, and say that CI on the PR still has to
confirm it.
