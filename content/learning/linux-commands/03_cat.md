---
id: 3
title: cat
date: 8-Jun-2022
---

### cat command

The cat command is used to show the contents of a file. If given multiple file names, it concatenates the content and then shows it.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>cat [options] filename
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
# To display content of note.txt
cat note.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172652482-db3942b1-3c8e-4ab4-8bd3-f89bc841ac35.png' alt='cat-output'>

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-n</strong>
    <span>To show number for each line</span>
</div>

**Example:**

```bash
cat -n note.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172653942-d3bcdca9-7c1e-47cb-b9f1-7be41ecc61fd.png' alt='number-lines-output' >

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-b</strong>
    <span>To show number for each non blank line</span>
</div>

**Example:**

```bash
cat -b note.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172654444-fda7271d-7f16-4497-918c-66952a67aa04.png' alt='number-nonblank-output' >

<div class="command-option">
    <strong>-s</strong>
    <span>To not show more than one single blank line</span>
</div>

**Example:**

```bash
cat -s note.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172654979-8b657e00-9446-441d-8190-45592294a792.png' alt='notshow-nonblankline-output' >

<div style="height:32px"></div>

#### Displaying multiple files at once

```bash
# cat file1 file2 ...
cat note1.txt note2.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172657170-5b3626c9-6e54-4dd4-ac5a-7f6896cec733.png' alt='cat-multiple-output'>

<div style="height:32px"></div>

#### Displaying selective files via wildcard

```bash
cat *.config.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172661186-3cdef7c6-da8e-4eb0-92a6-756df44c1ff8.png' alt='cat-wildcard-output'>
