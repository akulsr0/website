---
id: 7
title: example - creating labels on issues
date: 23-Jan-2023
---

## Creating labels on issues opened

We can also create a workflow which automates labelling issues as soon as they are opened. It also needs the Personal Access Token, here you can find [the steps to create it](/learning/github-actions/creating-comments-on-issues)
The workflow for the same is as follows-

```yml
name: Issue Label

on:
  issues:
    types: [opened]

jobs:
  issue-label:
    runs-on: ubuntu-latest
    steps:
      - name: Adding Label to Issues Openend
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GH_ACTION_EXAMPLES_PAT }}
          script: |
            github.rest.issues.addLabels({
               issue_number: context.issue.number,
               owner: context.repo.owner,
               repo: context.repo.repo,
               labels: ['triage']
            })
```

### Result

Following is the <a href='https://github.com/akulsr0/github-action-examples/issues/10' target='_blank'>output</a> for the above workflow-

<img style="margin:1rem 0" src='https://user-images.githubusercontent.com/116796624/214089839-e05cb37b-e0fe-4337-8ccd-44c98c535304.gif' alt='create-label-result'>
