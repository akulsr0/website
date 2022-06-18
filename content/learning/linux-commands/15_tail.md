---
id: 15
title: tail command
date: 18-Jun-2021
---

### tail command

The tail command is used to output last lines of a file.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>tail [options] file
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
tail main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/174426507-9f6019b9-1a1b-41cb-895a-d8438a1351a2.png' alt='tail-output' >

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-n</strong>
    <span>Prints last n lines of a file.</span>
</div>

**Example:**

```bash
tail -n 3 main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/174426597-2f671647-acac-42b5-98f3-84914c9b23de.png' alt='tail-n-output'>

<div style="height:24px;"></div>

**Example:** Printing line from X to Y using head and tail command.

Suppose we have to print **from line 5 to line 7**, Here, _X_ is 5 and _Y_ is 7. We can use following command to print it-

```bash
# Here, X and Y are starting line number and ending line number respectively.
head -n Y main.js | tail -n Y-X+1
```

So, for outputing line 5 to 7, command would be:

```bash
head -n 7 main.js | tail -n 3
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/174426860-3bc93375-84ed-4e63-afa1-36055311ab9e.png' alt='head-tail-output'>
