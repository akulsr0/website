---
id: 3
title: executing javascript in github action
date: 22-Jan-2023
---

## Executing javascript code in github action

We can execute javascript code in our github action with the help of <a href="https://github.com/actions/github-script" target="_blank">github-script</a>. Let's try this with a _Hello World_ example-

```yml
name: Hello World in JS

on: [push, pull_request]

jobs:
  say-hello-world:
    runs-on: ubuntu-latest
    steps:
      - name: Say `Hello World` from JS
        uses: actions/github-script@v6
        with:
          script: |
            console.log('Hello World');
            console.log('Hello Again...')
```

### Result

Following is the <a href='https://github.com/akulsr0/github-action-examples/actions/runs/3980354495/jobs/6823373982' target='_blank'>output</a> for the above github action-

<img style="margin:1rem 0" src='https://user-images.githubusercontent.com/43666833/213924748-bb3d1193-4ae9-4c28-b034-5e97ad1eaf9c.png' alt='hello-world-in-js-result'>
