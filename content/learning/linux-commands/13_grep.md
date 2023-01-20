---
id: 13
title: grep
date: 14-Jun-2022
---

### grep command

The grep command is used to search a file for specific text.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>grep [options] pattern file
</p>

<p class="lc-paragraph">
<strong>Example:</strong> The following command will search for occurrence of <i>databaseURI</i> in <i>config.js</i> file.
</p>

```bash
grep databaseURI config.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173628514-5a6f7603-688d-4f26-9a65-f8334a1647ee.png' alt='grep-output' >

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-A</strong>
    <span>Prints n lines after the pattern match.</span>
</div>

**Example:**

Let's consider an example where we have a huge file and we want to search for some function implementation. We can search for that function and print some line after that to check that.

```bash
grep -A 5 getTitleFromSlug config.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173631253-4f418f5f-0d3c-496f-b1b9-d55985fea918.png' alt='grep-after-output'>

<div class="command-option">
    <strong>-B</strong>
    <span>Prints n lines before the pattern match.</span>
</div>

**Example:**

```bash
grep -B 8 getTitleFromSlug config.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173631663-86c1897b-29f9-40fa-bfc4-90bd9d2e6c24.png' alt='grep-after-output'>

<div class="command-option">
    <strong>-C</strong>
    <span>Prints n lines before and after for every match and place a line (--) between two matches.</span>
</div>

```bash
grep -C 1 console.log main.js
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173632724-aaaa6a21-e9de-4a16-a476-dc396dcd0dd0.png' alt='grep-context-output'>

<div style="height:32px"></div>

**Example:** Searching for regex pattern.

Suppose we have a list of emails and we want to find out emails ending with _gmail.com_

```bash
grep "@gmail.com$" emails.txt
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173637744-c751a133-32f2-4342-afc9-a45c9650bf62.png' alt='grep-example-regex-output'>

<div style="height:12px"></div>

**Example:** Usage with cat command along multiple files

Suppose we have multiple environment configuration files and we want to find some particular key from all of those environment config files.

```bash
cat *.config.js | grep someKey1
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/172661268-6e5a360b-eee7-40ce-aacd-a3ba0942f8a2.png' alt='grep-example-regex-output'>
