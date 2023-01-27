---
id: 4
title: workflow context
date: 22-Jan-2023
---

## Workflow Context of a github action

Workflow context holds the information about the workflow, jobs, event, repository, author etc... We can use this information in our actions.

```yml
name: Workflow Context

on: [push]

jobs:
  workflow-context:
    runs-on: ubuntu-latest
    steps:
      - name: Workflow Context
        uses: actions/github-script@v6
        with:
          script: |
            console.log(context)
```

### Result

Following is the <a href='https://github.com/akulsr0/github-action-examples/actions/runs/3980546191/jobs/6823699357' target='_blank'>context object output</a> for the above workflow-

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/213929775-bd82a1f4-1b98-4fc2-85c3-2b6a199b27af.gif' alt='workflow-context-output'>
