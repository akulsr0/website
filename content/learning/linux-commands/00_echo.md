---
id: 0
title: echo command
date: 7-Jun-2021
---

### echo command

It is used to print something on the terminal through standard output (stdout).

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>echo [options] [string]
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
echo Hello World
```

<img class="lc-img" src='https://user-images.githubusercontent.com/43666833/172562166-6092173d-fca3-475b-8793-afa716d94911.png' alt='example-output'>

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-n</strong>
    <span>Do not print new line</span>
</div>

By default echo command prints the message on a new line, in order to avoid that we can add a this flag.

**Example:**

```bash
echo -n HeLLo World
```

<img class="lc-img" src='https://user-images.githubusercontent.com/43666833/172568783-bd6f2330-296f-49f9-a9c7-74a5b56726cd.png' alt='no-new-line-output' >

<div class="command-option">
    <strong>-e, -E</strong>
    <span>Enable/Disable interpreting backslash escape characters respectively.</span>
</div>

In order to enable/disable interpreting backslash escape characters we can use this flag.

<details>
<summary>Backslash escape characters</summary>
<ul>
<li>\b&nbsp;&nbsp;&nbsp;&nbsp;Backspace</li>
<li>\c&nbsp;&nbsp;&nbsp;&nbsp;Suppress trailing newline</li>
<li>\f&nbsp;&nbsp;&nbsp;&nbsp;Form feed</li>
<li>\n&nbsp;&nbsp;&nbsp;&nbsp;New line</li>
<li>\t&nbsp;&nbsp;&nbsp;&nbsp;Horizontal tab</li>
<li>\v&nbsp;&nbsp;&nbsp;&nbsp;Vertical tab</li>
</ul>
</details>

**Example**

```bash
echo -E "Hello\nWorld"
```

<img class="lc-img" src='https://user-images.githubusercontent.com/43666833/172583886-340a5ffa-d506-4c31-80b9-f5d943049b70.png' alt='escape-chars-interpreting-output' >
