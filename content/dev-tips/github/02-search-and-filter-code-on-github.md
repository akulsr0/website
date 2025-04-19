---
title: Search and filter code on github
category: github
date: 8-Dec-2022
---

While developing and writing code, we often come across issues/errors and we look for help on stackoverflow. Sometimes we are not sure of the implementation of a library, or the structure of a file. In those cases, it is helpful to have a look over someone's code on github who has already done it. This post will share some filters which can enhance your searches on github.

<br>

Following are the filters which you can use in your github search-

1. [By filename](#by-filename)
2. [By term in filename](#by-term-in-filename)
3. [By multiple term in filename](#by-multiple-terms-in-filename)
4. [By extension](#by-extension)
5. [By username](#by-username)
6. [By organisation](#by-organisation)
7. [By repository](#by-repository)

<br>

### By filename

If you want to search for a particular filename on github, you can use this filter.

**For eg:** If I have to search for *lighthouserc.json* file, I can search for this specific file on github search as follows

```text
filename:lighthouserc.json
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206242031-4246deac-19a5-44ab-8f41-f1950fdbdd49.png' alt='filename-filter' >

<br>

### By term in filename

If you want to search for a particular term in a particular filename, you can use the following filter.

**For eg:** If I have to search for *lint-staged* in *package.json* file, I can search it as follows

```text
filename:package.json lint-staged
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206245921-fc1a58b3-4374-45c0-9201-cc299a8569e4.png' alt='term-in-filename' >

<br>

### By multiple terms in filename

If you want to search for a set of terms in a particular filename, you can add the terms space separated.

**For eg:** If I have to search for *lint-staged* and *prettier* in *package.json* file, I can search it as follows

```text
filename:package.json lint-staged prettier
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206247783-7e2827b8-4e66-479a-8d0e-4573bea684d7.png' alt='multiple-term-in-filename' >

<br>

### By extension

If you want to filter your search and limit it to a particular extension.

**For eg:** Suppose, I have to check types for react, I can filter out files having *ts* extension and say *React.FC* as term

```text
extension:ts React.FC
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206272868-5e74e1a2-34c0-46ab-acd6-0a9786605391.png' alt='extension-filter' >

<br>

### By username

If you want to filter and limit your search results to a particular user.

**For eg:** Suppose, I have to search my (akulsr0) Next.js projects. I can filter my search with username as *akulsr0*, filename as *package.json* containing *next*

```text
user:akulsr0 filename:package.json next
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206269817-78ad0c44-bc87-48ea-84f3-56551bb2032d.png' alt='username-filter' >

<br>

### By organisation

If you want to filter and limit your search results to a particular organisation.

**For eg:** Suppose, I have to search google's project using react, I can filter my search with organisation as *google*, filename as *package.json* containing *react*

```text
org:google filename:package.json react
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206271325-f81fbaf6-93ae-4efc-9fb8-0a92457da1ec.png' alt='org-filter' >

<br>

### By repository

If you have to filter results and limit them to a particular repository.

**For eg:** Suppose, I have to check all shell script files in react's codebase. I can filter my search with extension as *sh* and repository as *facebook/react*

```text
extension:sh repo:facebook/react
```

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/206273839-70af845b-834b-4efb-8301-e4b4aa10c2e9.png' alt='repo-filter' >