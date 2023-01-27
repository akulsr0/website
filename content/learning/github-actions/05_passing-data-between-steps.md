---
id: 5
title: passing data between steps
date: 23-Jan-2023
---

## Passing data to next steps

In cases where we need to pass some information from one step to next step, we can do it as follows with the help of <a href='https://github.com/actions/toolkit/tree/main/packages/core' target='_blank'>@actions/core</a>

```yml
name: Passing data between steps

on: [push]

jobs:
  passing-data-between-steps:
    runs-on: ubuntu-latest
    steps:
      - name: Passing data between steps
        id: step-1
        uses: actions/github-script@v6
        with:
          script: |
            const authorName = context.payload.head_commit.author.name;
            core.setOutput("authorMsg", `The author of this is ${authorName}`);

      - name: Print author message
        run: echo ${{ steps.step-1.outputs.authorMsg }}
```

### Result

Following is the <a href='https://github.com/akulsr0/github-action-examples/actions/runs/3981143949/jobs/6824683385' target='_blank'>output</a> for the above workflow-

<img style='margin:1rem 0' src='https://user-images.githubusercontent.com/43666833/213935399-68fa11dd-4e23-4ede-8b67-a75dc76211a3.png' alt='passing-data-between-steps-output'>
