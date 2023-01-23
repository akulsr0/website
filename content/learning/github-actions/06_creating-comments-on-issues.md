---
id: 6
title: example - creating comments on issues
date: 23-Jan-2023
---

## Creating comments on issues opened

We can create a workflow to automate and comment on issues opened. The prerequisite for this is a PAT (Personal Access Token), which you have to create and store in github secrets and pass it in the workflow to make it authorized to create a comment.

<br />

### Creating a PAT (Personal Access Token)

- Go to settings > <a href='https://github.com/settings/tokens' target='_blank'>tokens</a>
- Click **Generate new token** and create a classic token with _repo_ access
- Once token is generated, copy it and keep it somewhere safe.

You can also go through the official documentation for <a href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token' target='_blank'>creating a personal access token</a>.

<br />

### Adding PAT to Github Actions Secret

- Open your repository and go to **Settings** tab
- Go to Security > Secrets and variables > Actions
- Click on **New repository secret**
- Enter desired key in name and PAT in secret

You can also go through the official documentation for <a href='https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository' target='_blank'>adding github action secret</a>

<br />

Once you're done with adding your Personal Access Token in your github action secret, you can proceed with writing the workflow for creating comments when an issue is opened.

```yml
name: Issue Comment

on:
  issues:
    types: [opened]

jobs:
  issue-comment:
    runs-on: ubuntu-latest
    steps:
      - name: Adding Comment to Issues Openend
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GH_ACTION_EXAMPLES_PAT }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Thanks for reporting an issue.'
            })
```

### Result

Following is the <a href='https://github.com/akulsr0/github-action-examples/issues/7' target='_blank'>output</a> for the above workflow-

<img style="margin:1rem 0" src='https://user-images.githubusercontent.com/43666833/214041252-69470f6c-b130-495f-8e4e-76622aa1e2ab.gif' alt='issue-comment-result'>
