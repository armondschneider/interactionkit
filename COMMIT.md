# Commits and pull requests

## Branch names

Use `<type>/<short-kebab-case-description>`. Keep each branch focused on one change.

| Prefix | Use for | Example |
| --- | --- | --- |
| `feat/` | New features or components | `feat/sheet-blur-transition` |
| `bug/` | Bug fixes | `bug/sheet-focus-restoration` |
| `chore/` | Maintenance, dependencies, or tooling | `chore/update-dependencies` |
| `docs/` | Documentation | `docs/button-usage` |
| `refactor/` | Restructuring without behavior changes | `refactor/modal-lifecycle` |
| `test/` | Tests | `test/sheet-keyboard-support` |
| `perf/` | Performance improvements | `perf/image-loading` |
| `ci/` | CI configuration | `ci/package-checks` |

Use `chore`, not `chor`. A `bug/` branch uses `fix` in its commit messages and PR title.

Start new work from an up-to-date `main`:

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/sheet-blur-transition
```

Start with a clean working tree. If you already have changes, preserve them; do not discard or overwrite unrelated work to follow these steps.

## Conventional Commits

Use this format:

```text
<type>(<optional-scope>): <short description>

<optional body explaining why>

<optional footer>
```

- Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`, `build`, and `revert`.
- Use an optional scope such as `button`, `sheet`, `image-viewer`, `site`, or `package`.
- Write a concise, imperative description: “add”, “fix”, or “remove”, not “added” or “fixed”.
- Use lowercase types and scopes. Do not end the subject with a period; aim for 72 characters or fewer.
- Keep each commit focused. Stage specific files and review the staged diff before committing.
- Mark breaking changes with `!` and explain the migration in a `BREAKING CHANGE:` footer.

Examples:

```text
feat(sheet): add blur and fade transitions
fix(button): show loading text beside the spinner
chore(deps): update development dependencies
docs: document contribution workflow
```

Breaking change example:

```text
feat(sheet)!: rename the trigger label prop

BREAKING CHANGE: Replace triggerLabel with openLabel.
```

Review and commit only your intended changes:

```bash
git status --short
git add src/components/sheet/Sheet.tsx
git diff --cached
git commit -m "feat(sheet): add blur and fade transitions"
```

## Opening a pull request

1. Run the checks from the repository root:

   ```bash
   npm test
   npm run build
   npm run typecheck
   npm run check:lib
   git diff --check
   ```

2. For UI changes, verify light/dark themes, mobile/desktop layouts, keyboard behavior, and reduced motion. Include screenshots or a short recording when helpful.
3. Push your branch: `git push -u origin <branch-name>`.
4. Open a PR against `main`. Use a Conventional Commit title, for example `feat(sheet): add blur and fade transitions`.
5. Describe **what changed**, **why**, and **how it was tested**. Link related issues with `Closes #123` when applicable. Call out breaking changes and migration steps.
6. Keep unrelated changes out of the PR. Use a draft PR if the work is not ready for review.
7. Resolve review feedback and ensure checks pass before merging. If squash-merging, keep the final squash commit title in Conventional Commit format.

Publishing is separate from merging. Do not run `npm run publish:lib` as part of normal commit or PR checks; npm publishing is currently on hold.
