# Daily Activity – 24-09-2026

## Topic: Git, GitHub, PAT, Bitwarden, Eclipse Project Setup

### 1. Samson-Sir Learning Folder

Created/used the main learning folder:

```bash
~/Documents/Samson-Sir
```

It contains subject folders such as:

```text
01-html
02-CSS
03-Bootstrap
04-JavaScript
05-Java
06-React
07-NodeJS
08-PostgreSQL
09-Zoho-Catalyst
10-Linux
11-LeetCode
12-Agentic-AI
13-Spring-Boot
14-Git-GitHub
15-English-Speaking
Daily-Progress
```

### 2. Samson-Sir Git Repository

The `Samson-Sir` folder was already initialized as a Git repository.

Important concepts discussed:

- `.git` = hidden folder containing Git repository information.
- `main` = Git branch.
- `git add` = stages files for commit.
- `git commit` = saves a version in local Git history.
- `git push` = uploads commits to GitHub.
- `origin` = name given to the GitHub remote repository.

The existing GitHub remote is:

```text
https://github.com/prempremadev-eng/Samson-Sir.git
```

Checked with:

```bash
git remote -v
```

### 3. GitHub PAT (Personal Access Token)

A GitHub Fine-grained Personal Access Token was created for GitHub authentication.

Important points:

- PAT is used instead of the GitHub account password when Git asks for a password over HTTPS.
- PAT should NEVER be put in GitHub code or committed to a repository.
- PAT should NOT be saved inside `.gitignore`.
- `Only select repositories` limits the token to selected repositories.
- `All repositories` allows the token to access repositories under the account according to its permissions.
- For repository work, `Contents → Read and write` was selected.

The PAT was saved securely in Bitwarden as a Secure Note.

### 4. Bitwarden

Created a Bitwarden account to securely store the GitHub PAT.

A Secure Note was created for the GitHub token.

Important:

- Bitwarden Master Password must be remembered.
- PAT can be retrieved from the Bitwarden Secure Note when needed.
- Do not share the PAT with anyone.
- Do not put the PAT in normal project files.

### 5. Eclipse DSAPractice Project

Eclipse project:

```text
DSAPractice
```

Initially, Eclipse Git setup accidentally created a separate `.git` repository inside the project.

We removed ONLY the Git metadata:

```bash
rm -rf .git
```

This did NOT delete the Java files.

The project still contained:

```text
src/
bin/
.classpath
.project
.settings/
.gitignore
```

### 6. Move DSAPractice into Samson-Sir

Instead of creating a separate GitHub repository for `DSAPractice`, we decided to keep it inside the existing `Samson-Sir` repository.

First, the existing `11-LeetCode` folder was used.

The project was moved with:

```bash
mv ~/snap/eclipse/common/eclipse-workspace/DSAPractice ~/Documents/Samson-Sir/11-LeetCode/
```

Meaning:

- `mv` = move
- First path = the current Eclipse `DSAPractice` project
- Second path = the destination `Samson-Sir/11-LeetCode/`

The project was then located at:

```text
~/Documents/Samson-Sir/11-LeetCode/DSAPractice
```

Final structure:

```text
Samson-Sir/
└── 11-LeetCode/
    └── DSAPractice/
        ├── src/
        ├── bin/
        ├── .settings/
        ├── .classpath
        ├── .project
        └── .gitignore
```

### 7. .gitignore

The Eclipse project's `.gitignore` contains:

```gitignore
/bin/
```

This means the `bin` folder is ignored by Git and is not uploaded to GitHub.

The GitHub repository correctly does NOT show the `bin` folder.

### 8. Add and Push DSAPractice

From the `Samson-Sir` root:

```bash
cd ~/Documents/Samson-Sir
```

Checked:

```bash
git status
```

Then staged the LeetCode project:

```bash
git add 11-LeetCode/
```

Committed:

```bash
git commit -m "Add DSAPractice LeetCode project"
```

Pushed:

```bash
git push
```

The push was successful.

GitHub now contains:

```text
Samson-Sir
└── 11-LeetCode
    └── DSAPractice
        ├── .settings
        ├── src/problemPractice
        │   ├── RemoveDuplicate.java
        │   ├── ValidParentheses.java
        │   └── LongestCommonPrefix.java
        ├── .classpath
        ├── .gitignore
        └── .project
```

### 9. Future Daily Git Workflow

When adding/changing learning files inside `Samson-Sir`:

```bash
cd ~/Documents/Samson-Sir
git status
git add .
git commit -m "Describe what I learned"
git push
```

The important idea:

```text
Edit/Create files
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
GitHub
```

## Key Learning Today

1. Git repository and GitHub repository are not the same thing.
2. `.git` stores local Git information.
3. `main` is the branch.
4. `origin` points to the GitHub repository.
5. PAT is a secret authentication token.
6. PAT should be stored securely, not in `.gitignore`.
7. One `Samson-Sir` GitHub repository can contain all learning subjects.
8. `DSAPractice` is now part of `Samson-Sir/11-LeetCode`.
9. `/bin/` in `.gitignore` prevents Eclipse compiled files from being uploaded.
10. `git add → git commit → git push` is the normal workflow.
