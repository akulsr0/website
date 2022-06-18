---
id: 14
title: head command
date: 18-Jun-2021
---

### head command

The head command is used to output first lines of a file.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>head [options] file
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
head main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/174426289-0f4d6eed-1de4-460f-9a7a-c1db62a2381e.png' alt='head-output' >

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-n</strong>
    <span>Prints first n lines of a file.</span>
</div>

**Example:**

```bash
head -n 3 main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/174426411-94906a6a-5a53-47c2-bc8a-4e0516f92c63.png' alt='head-n-output'>
