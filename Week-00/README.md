# Week 00: Git & GitHub

<div align="center">
  <img src="./pose1.jpeg" alt="Chai Aur Code Cohort Pose" width="750" style="border-radius: 10px;" />
</div>

---

**A practical introduction to version control, branching, and collaborating on code.**

Week 00 is where a project gets its memory. You make a change, save a checkpoint, try an idea on a separate branch, and share your work so someone else can review it. This guide follows that first contribution from your computer to GitHub, one step at a time.

[![X](https://img.shields.io/badge/Follow%20on-X-111111?style=flat&logo=x&logoColor=white)](https://x.com/Aman_Pal_1)
[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udityapal)
[![Email](https://img.shields.io/badge/Contact-Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:udityapal2024@gmail.com)

## 📚 Week 00 Study Materials

Download the class references and revisit the session materials:

| Resource                                                                | Open                                                                             |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Git and GitHub reference** (`github.pdf`)                             | [📄 Open PDF](./github.pdf)                                                      |
| **Additional class notes** (`Git_and_Github_lyst1736093713658 (1).pdf`) | [📄 Open PDF](./Git_and_Github_lyst1736093713658%20%281%29.pdf)                  |
| Git and GitHub class screenshot 1                                       | [View image](./Git_GitHub%20Master%20Class/Screenshot%202026-01-17%20163739.png) |
| Git and GitHub class screenshot 2                                       | [View image](./Git_GitHub%20Master%20Class/Screenshot%202026-01-17%20163847.png) |

## The first contribution

Imagine you have spotted a typo in a project README. It is a tiny change, but it can teach you the whole collaboration loop. You start with a copy of the project, create a branch for your fix, save the change as a commit, and publish the branch. On GitHub, you open a pull request so the change can be discussed and merged.

Along the way, Git keeps track of the work on your computer. GitHub hosts a remote copy and gives people a place to collaborate. They work together, but they are not the same thing.

## What you'll learn

- How Git records changes as a history of commits.
- How the working tree, staging area, and repository fit together.
- How branches let you work on changes independently.
- How GitHub remotes and pull requests support collaboration.
- How to use Git from initial setup through advanced history, recovery, and collaboration workflows.
- How GitHub issues, pull requests, Actions, and releases fit into the workflow.

## The Git workflow

The diagram below shows the journey from a local change to shared work. In everyday terms: edit, inspect, stage, commit, push, then open a pull request.

![Git workflow from editing files to committing and sharing changes](./WorkFlow%20diagram.png)

### 1. Get a local copy

Clone a repository you have permission to work with, then move into its folder:

```bash
git clone https://github.com/Uditya-Pal-1/Chai-Aur-Code-Cohort.git
cd Chai-Aur-Code-Cohort
```

If you do not have permission to push to the original repository, fork it on GitHub and clone your fork instead.

### 2. Create a branch

Keep your change separate from the default branch. Use a short name that describes the work:

```bash
git switch -c fix-readme-typo
```

### 3. Make and inspect the change

Edit the file, then check what Git has noticed before saving anything:

```bash
git status
git diff
```

`git status` summarizes changed and untracked files. `git diff` shows edits that have not yet been staged.

### 4. Stage and commit

Stage only the file or files you intend to include, review the staged version, and create a commit with a useful message:

```bash
git add Week-00/README.md
git diff --staged
git commit -m "docs: improve Week 00 Git guide"
```

A commit is a named checkpoint in the project's history. Staging lets you choose exactly what goes into that checkpoint.

### 5. Push and open a pull request

Publish your branch to GitHub, then open a pull request from that branch. Describe what changed and why; after review, the change can be merged into the project.

```bash
git push -u origin fix-readme-typo
```

The `-u` option connects your local branch to its remote counterpart, so later pushes can usually be made with `git push`.

## Three places to keep straight

| Area         | What it contains                                       |
| ------------ | ------------------------------------------------------ |
| Working tree | The files you are currently editing.                   |
| Staging area | The specific changes selected for the next commit.     |
| Repository   | The commits Git has recorded in the project's history. |

The usual flow is **working tree → staging area → commit**. Pushing then sends commits to a remote repository, such as the one hosted on GitHub.

## Git command reference: basic to advanced

Replace values in angle brackets, such as `<branch>`, with your own names. Run commands from inside the repository unless the command says otherwise.

### 1. Install, configure, and start

| Command                                            | What it does                                            |
| -------------------------------------------------- | ------------------------------------------------------- |
| `git --version`                                    | Check that Git is installed.                            |
| `git config --global user.name "Your Name"`        | Set the author name used for new commits.               |
| `git config --global user.email "you@example.com"` | Set the author email used for new commits.              |
| `git config --list --show-origin`                  | Inspect configuration and where each setting came from. |
| `git init`                                         | Create a new Git repository in the current folder.      |
| `git clone <url>`                                  | Download a repository and its history.                  |

### 2. Inspect and manage files

| Command                        | What it does                                                           |
| ------------------------------ | ---------------------------------------------------------------------- |
| `git status`                   | Show the current branch and file states.                               |
| `git status --short --branch`  | Show a compact status including the branch.                            |
| `git diff`                     | Review changes that have not been staged.                              |
| `git diff --staged`            | Review changes selected for the next commit.                           |
| `git add <file>`               | Stage a specific file.                                                 |
| `git add -p`                   | Interactively stage selected parts of changes.                         |
| `git restore <file>`           | Discard unstaged edits to a tracked file.                              |
| `git restore --staged <file>`  | Unstage a file while keeping its edits.                                |
| `git mv <old-path> <new-path>` | Move or rename a tracked file.                                         |
| `git rm <file>`                | Remove a tracked file and stage its removal.                           |
| `git check-ignore -v <file>`   | Find which ignore rule matches a file.                                 |
| `git clean -nd`                | Preview untracked files and directories that `git clean` would remove. |

### 3. Save and inspect history

| Command                                      | What it does                                            |
| -------------------------------------------- | ------------------------------------------------------- |
| `git commit -m "message"`                    | Create a commit from staged changes.                    |
| `git commit --amend`                         | Edit the latest commit; use only before sharing it.     |
| `git log --oneline`                          | Show a compact commit history.                          |
| `git log --oneline --graph --decorate --all` | Visualize commits and branches together.                |
| `git show <commit>`                          | Inspect a commit and the changes it contains.           |
| `git diff <commit-a>..<commit-b>`            | Compare two commits.                                    |
| `git blame <file>`                           | See which commit last changed each line.                |
| `git log -S "search text" -- <file>`         | Find commits that added or removed a particular string. |

### 4. Branch and integrate work

| Command                    | What it does                                                  |
| -------------------------- | ------------------------------------------------------------- |
| `git branch`               | List local branches.                                          |
| `git switch <branch>`      | Switch to an existing branch.                                 |
| `git switch -c <branch>`   | Create and switch to a new branch.                            |
| `git switch -`             | Return to the branch you were on previously.                  |
| `git branch -m <new-name>` | Rename the current branch.                                    |
| `git branch -d <branch>`   | Delete a branch that has already been merged.                 |
| `git merge <branch>`       | Merge another branch into the current branch.                 |
| `git merge --abort`        | Cancel an in-progress merge and return to its starting state. |
| `git rebase <base-branch>` | Replay the current branch's commits on top of another branch. |
| `git rebase --continue`    | Continue a rebase after resolving conflicts.                  |
| `git rebase --abort`       | Cancel an in-progress rebase.                                 |
| `git cherry-pick <commit>` | Apply one selected commit to the current branch.              |

### 5. Work with remotes

| Command                           | What it does                                                     |
| --------------------------------- | ---------------------------------------------------------------- |
| `git remote -v`                   | List remote names and URLs.                                      |
| `git remote add origin <url>`     | Add a remote named `origin`.                                     |
| `git remote set-url origin <url>` | Change the URL for a remote.                                     |
| `git fetch origin`                | Download remote updates without integrating them.                |
| `git fetch --prune`               | Fetch updates and remove stale remote-tracking references.       |
| `git pull --ff-only`              | Fetch and update the current branch only if it can fast-forward. |
| `git push -u origin <branch>`     | Publish a branch and set its upstream tracking branch.           |
| `git push`                        | Publish commits to the configured upstream branch.               |

### 6. Pause, undo, and recover

| Command                       | What it does                                                          |
| ----------------------------- | --------------------------------------------------------------------- |
| `git stash push -m "message"` | Temporarily save tracked working changes.                             |
| `git stash list`              | List saved stashes.                                                   |
| `git stash pop`               | Reapply the newest stash and remove it from the stash list.           |
| `git stash apply "stash@{0}"` | Reapply a stash while keeping it in the list.                         |
| `git revert <commit>`         | Create a new commit that undoes a previous commit.                    |
| `git reset --soft HEAD~1`     | Move the branch back one commit while keeping changes staged.         |
| `git reset --mixed HEAD~1`    | Move the branch back one commit while keeping changes unstaged.       |
| `git reflog`                  | View recent local branch and `HEAD` movements to find earlier states. |

`git reset --hard`, `git clean -fd`, and force-pushing can discard work or affect collaborators. Avoid them unless you understand the consequences and have checked what will be changed. Prefer `git revert` for undoing commits that have already been shared.

### 7. Explore advanced workflows

| Command                                   | What it does                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `git rebase -i HEAD~<n>`                  | Interactively reorder, combine, reword, or drop recent commits. Use on commits that have not been shared.                                                                       |
| `git push --force-with-lease`             | Update a remote branch after rewriting your own history, while checking that it has not advanced unexpectedly. Coordinate before using it.                                      |
| `git bisect start`                        | Begin a binary search through history to find the commit that introduced a bug. Mark revisions with `git bisect good` or `git bisect bad`, then finish with `git bisect reset`. |
| `git worktree add -b <branch> <path>`     | Check out another branch in a separate working directory.                                                                                                                       |
| `git worktree list`                       | List working directories attached to this repository.                                                                                                                           |
| `git tag -a <tag> -m "message"`           | Create an annotated tag, commonly used to mark a release.                                                                                                                       |
| `git push origin <tag>`                   | Publish one tag to a remote.                                                                                                                                                    |
| `git submodule update --init --recursive` | Initialize and update a repository's recorded submodules.                                                                                                                       |

## GitHub commands with GitHub CLI

GitHub CLI (`gh`) is a separate tool from Git. Install it and authenticate with `gh auth login` before using these commands. You can also complete most of these workflows on GitHub's website.

| Command                                    | What it does                                                |
| ------------------------------------------ | ----------------------------------------------------------- |
| `gh repo clone <owner>/<repo>`             | Clone a GitHub repository.                                  |
| `gh repo view --web`                       | Open the current repository on GitHub.                      |
| `gh repo fork <owner>/<repo> --clone`      | Fork a repository and clone your fork.                      |
| `gh issue list`                            | List issues in the current repository.                      |
| `gh issue create`                          | Create an issue interactively.                              |
| `gh pr create`                             | Open a pull request from the current branch.                |
| `gh pr list`                               | List pull requests.                                         |
| `gh pr view <number> --web`                | Open a pull request in the browser.                         |
| `gh pr checkout <number>`                  | Check out a pull request locally for review.                |
| `gh pr diff <number>`                      | Review a pull request's changes in the terminal.            |
| `gh pr checks <number>`                    | Check CI and other required status checks.                  |
| `gh pr review <number> --approve`          | Approve a pull request.                                     |
| `gh pr merge <number> --squash`            | Squash-merge a pull request when repository rules allow it. |
| `gh run list`                              | List recent GitHub Actions workflow runs.                   |
| `gh run view <run-id>`                     | Inspect a workflow run and its results.                     |
| `gh release create <tag> --generate-notes` | Create a GitHub release with generated release notes.       |

For a first contribution, the most useful sequence is usually `git status` → `git add` → `git diff --staged` → `git commit` → `git push`, followed by `gh pr create` or the GitHub website.

## When something goes wrong

- **The wrong branch is active:** run `git branch` and switch with `git switch <branch-name>`.
- **A file is missing from the commit:** run `git status`, stage it with `git add <file>`, and commit again.
- **A merge conflict appears:** open each conflicted file, resolve the marked sections, run `git add <file>`, and finish the merge as Git instructs.
- **A push is rejected:** check `git status` and `git remote -v`; you may need to bring your branch up to date or confirm you have permission to push.

When in doubt, pause and run `git status`. It is often the quickest way to see what Git expects next.

## Keep going

The first commit does not need to be impressive; it needs to be understandable. Make a small change, inspect it, save it with a clear message, and share it. Repeat that loop, and version control becomes less of a list of commands and more of a reliable way to build together.

For contribution guidelines, see the repository's [CONTRIBUTING.md](../CONTRIBUTING.md). For licensing details, see the [LICENSE](../LICENSE).
