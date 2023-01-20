---
id: 2
title: creating first github action - hello world
date: 20-Jan-2023
---

## Creating a \`Hello World\` github action

Let's start with a basic _Hello World_ github action:

- Create your workflow file (_hello-world.yml_) inside **.github/workflows** folder

<img style="max-width: 240px;margin: 0 auto;" src='https://user-images.githubusercontent.com/43666833/213724282-c5675abe-e480-4052-b6ea-6994731c2871.png' alt='folder-structure'>

- Now, we have to add the name, event and jobs in that workflow file

```yml
name: Hello World

on: push

jobs:
  say-hello-world:
    runs-on: ubuntu-latest
    steps:
      - run: echo Hello World
```

### Result

<img style="margin: 0.6rem 0" src='https://user-images.githubusercontent.com/43666833/213723226-73ece491-e3c7-469a-93ef-864fecab8770.png' alt='hello-world-result'>
