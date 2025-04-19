---
id: 2
title: touch
date: 8-Jun-2022
---

### touch command

The touch command is used to create an empty file, or change the access timestamp of a file.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>touch [options] filename
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
touch main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172625149-beb0dd68-eb88-4d1d-83cf-1410d2073034.gif' alt='example-output'>

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-a</strong>
    <span>To change the access time to current time</span>
</div>

To demonstrate this flag, we will do following steps:

- create a new file
- check its access time (atime)
- after a minute, change its access time using touch command
- check its access time again

```zsh
touch note.txt
ls -lu
touch -a note.txt
ls -lu
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172626418-e7e496aa-dba8-4b11-b5ad-61d13f21ee2c.png' alt='change-atime-output'>

<div class="command-option">
    <strong>-m</strong>
    <span>To change the modify time to current time</span>
</div>

**Example:**

```js
touch main.js
stat main.js
touch -m main.js
stat main.js
```

<img class="lc-img" src='https://user-images.githubusercontent.com/43666833/172631912-c5c8b046-4891-43bb-b1e6-d080b3eb7357.png' alt='modify-time-output'>

<div class="command-option">
    <strong>-t</strong>
    <span>Change the access and modification times to the specified time instead of the current time of day</span>
</div>

The timestamp should be in **[[CC]YY]MMDDhhmm[.ss]** format, where:

- **CC**: First two digit of the year (the century) [OPTIONAL]
- **YY**: Last two digits of the year [OPTIONAL]
- **MM**: Month (two-digit numeric month)
- **DD**: Day (two-digit numeric day)
- **hh**: Hour
- **mm**: Minutes
- **ss**: Seconds [OPTIONAL]

**Example:**

```js
touch note.txt
stat note.txt
touch -t 192009191819 note.txt
stat note.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172636073-9ae5d8bb-d79c-4090-9e40-a836bef3a9a2.png' alt='custom-time-output'>

<div style="height:32px"></div>

#### Creating multiple files at once

```bash
# creating files from a set
touch file{4,5,6}.js

# creating files from a loop
touch file{1..3}.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172639687-8672bcf4-cf2d-4860-978d-9b6f2b53e9a8.gif' alt='multiple-files-output'>
