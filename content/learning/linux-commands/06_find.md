---
id: 6
title: find command
date: 11-Jun-2021
---

### find command

The find command is used to search for files or folders.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>find path [options] expression
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
find . -name 'Button.js'
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173191667-c70945ab-9d93-413e-b40c-7f1c2c08392c.png' alt='find-output'>

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-name</strong>
    <span>To specify the name you're searching for.</span>
</div>

**Example**

_Same as above_

<div class="command-option">
    <strong>-type</strong>
    <span>To specify the type of file/folder you're searching.</span>
</div>

The most popular values for this flag are: **d** and **f** which stand for _directory_ and _file_ respectively.

<div style="height:12px"></div>

**Example:**

```bash
find . -type d -name 'assets'
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173192256-c740bbd9-299d-48c7-b5f7-1fd0c3c0947f.png' alt='find-type-output' >

<div class="command-option">
    <strong>-regex</strong>
    <span>To search for files/folders which matches given regex pattern.</span>
</div>

**Example:**

Suppose we have to find all _.style.js_ files in current codebase, we can give regex for that as follows:

```bash
find . -regex '.*/*.style.js'
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173190922-1cc2881b-2abf-440f-a02a-0a50d2dedde7.png' alt='find-regex-output' >

<div class="command-option">
    <strong>-size</strong>
    <span>To search for files/folders with specific size or size range.</span>
</div>

<details>
    <summary>Size Units</summary>
    <ul>
        <li>b - for 512-byte blocks (default)</li>
        <li>c - for bytes</li>
        <li>w - for two-byte words</li>
        <li>k - for Kilobytes</li>
        <li>M - for Megabytes</li>
        <li>G - for Gigabytes</li>
    </ul>
</details>

<details>
    <summary>Size Constraints</summary>
    <ul>
        <li>For specific size: -size 100M</li>
        <li>For greater than 100MB: -size +100M</li>
        <li>For lesser than 100MB: -size -100M</li>
        <li>Between 100MB and 200MB: -size +100M -size -200M</li>
    </ul>
</details>

**Example:**

Suppose we have to find image files (jpeg/png) which are greater than 100 kilobytes, we can do that by using size flag as follows:

```bash
find -E . -type f -regex '.*\.(jpeg|png)' -size +100k
```

**Note:** Here -E flag allows to interpret modern regex syntax.

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173191285-e7ce8525-5e16-498c-b1f3-873d78b77704.png' alt='find-size-output' >

<div class="command-option">
    <strong>-and/-a, -or/-o, -not</strong>
    <span>Logical operators for combining your expressions</span>
</div>

**Example:**

```bash
# NOT Operator
find . -type f -not -name '*.js'

# AND Operator
find . -name '*.png' -and -size +100kb

# OR Operator
find . -name 'SearchInput.js' -or -name 'Button.js'
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173193722-28bb6ccd-9d98-4a20-ac86-44556b15f47c.png' alt='find-logical-operator-output' >
