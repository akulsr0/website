---
title: different git account for subdirectory
category: github
date: 19-Feb-2024
keywords: different github account for given subdirectory, multiple github accounts, two github account on single machine
---

If you want to have a specific git account work for a subdirectory, you can make it happen with the help of conditionally including another gitconfig in your root one

Here's how you can do it

- Create a _.gitconfig_ inside your subdirectory, and add your name and email as below

```
[user]
        name = akulsr0
        email = akulsr0@gmail.com
```

- Now, you need to include this _.gitconfig_ conditionally inside your root _~/.gitconfig_

- You can do that by adding following code inside your root git configuration i.e. _~/.gitconfig_

```
[includeIf "gitdir:~/Documents/opensource/**"]
    path = ~/Documents/opensource/.gitconfig⏎
```

- Now, directories inside your subdirectory will have the new git account. You can verify that by running following command in your terminal (inside any folder within your subdirectory)

```
git config user.email
```

- Now, for any repository to use new config's email, you can clone it with adding that username in clone url as follows

```
git clone https://username@github.com/username/repository.git
```
