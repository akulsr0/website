---
id: 1
title: structure of a github action
date: 19-Jan-2023
---

## structure of a github action

Github reserves a path for all your github action workflows in your repository i.e. **_.github/workflows_** and these workflows are written in <a href='https://learnxinyminutes.com/docs/yaml/' target='_blank'>YAML format</a> i.e. (_.yml_)

```
repository
└─── .github
│   └─── workflows
│       │   check-lint.yml
│       │   label.yml
│       │   ...
└─── .gitignore
└─── README.md
└─── ...
```

The structure of a github action workflow and its constituents are as follows:

<br />

**name** - This will be the name of your workflow, and it will be displayed in the **Actions** tab of your repository. It acts as an identifier for your workflow.

```yml
name - My Workflow
```

**on** - This defines the event, on the occurrence of which, it will automatically trigger the corresponding workflow.

For single event,

```yml
on - push
```

For multiple event,

```yml
on - [push, fork]
```

For specific branch,

```yml
on:
  push:
    branches:
      - development
      - staging
  pull_request:
    branches:
      - development
```

For scheduled time, (to create cron string you can use - <a href='https://crontab.guru/' target='_blank'>crontab guru</a>). With the following event, the workflow will run _Every Day Mon-Fri at 10.30 AM_

```yml
on:
  schedule:
    - cron: "30 10 * * 1-5"
```

**jobs** - A workflow is a collection of jobs, a job is a collection of steps, and a step is where we actually do something.

```yml
jobs:
  hello-world:
    steps:
      - run: echo Hello World
```

By default, jobs run in parallel, meaning that if you have multiple jobs they will start together. We can make them sequential by adding a _needs_ key.

```
jobs:
  say-hello:
    steps:
      - run: echo Hello
  say-world:
    steps:
      - needs: say-hello
      - run: echo World
```

You can also read and explore the official documentation for <a href='https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions' target='_blank'>workflow syntax</a>.
