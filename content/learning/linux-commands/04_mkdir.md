---
id: 4
title: mkdir command
date: 10-Jun-2021
---

<style>
    .command-option {
        display: flex;
        flex-direction: row;
        padding: 8px 0px;
    }
    .command-option:not(:first-of-type) {
        margin-top:24px;
    }
    .command-option > strong {
        flex: 1;
    }
    .command-option > span {
        flex: 3;
    }
</style>

### mkdir command

The mkdir command is used to create new folder(s).

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>mkdir [options] foldername
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
# To create a new folder with name `newfolder`
mkdir newfolder
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173013929-5918562c-6146-4b81-bdc3-e7844e09b895.gif' alt='mkdir-output' >

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-p</strong>
    <span>Don't throw error if folder already exists</span>
</div>

**Example:**

```bash
mkdir -p newfolder
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173015110-666673d2-e394-4633-a88a-9a515383af25.png' alt='no-error-folder-exists' >
