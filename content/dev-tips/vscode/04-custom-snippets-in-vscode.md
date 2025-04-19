---
title: Custom Snippets in VSCode
category: vscode
date: 07-Jan-2022
---

![demo-snippet](https://user-images.githubusercontent.com/43666833/147082019-aed9f7f3-711f-4d9b-89aa-6a2df89d3487.gif)

<br />

Above is the demo of one custom snippet I made for Next.js (Typescript) components. Here's how you can make custom snippet's in VSCode.

<br />

### Create a code-snippets file in VSCode

<br />

![snippet-file](https://user-images.githubusercontent.com/43666833/147083222-dff8a107-bce9-4706-a7aa-6cf4c7af179d.gif)

- Click _Settings_ icon in bottom left.
- Click _User Snippets_
- Click _New Global Snippets File_ or select file if you previously made one.
- Give it a name, and done!

Once you created the code-snippets file, you can create a snippet in VSCode by adding following things in the code-snippets file-

- **Title** (eg. 'Component for Nextjs')<br />
  This is the title of your snippet.
- **Scope** (eg. 'javascript, typescript')<br />
  Your snippet will be available to you in the languages/scopes you mention here.
- **Prefix** (eg. 'CompNext')<br />
  This is the short prefix for your snippet.
- **Body** (eg. ['line1', 'line2'])<br />
  This is an array of lines of code for which you want the snippet.

You can also add $1, $2, and so on... in body to create placeholders and ask for user input there. User will be asked for input in increasing order of n ($n) and they can move to next placeholder by pressing tab.

You can also add label to these placeholders. Instead of `$1` you can write `${1:label}`

<br />

You can add snippets in the code-snippets file in following format-

```js
{
  // this is a snippet
  "Title of snippet": {
    "scope": "javascript, typescript",
    "prefix": "logerr",
    "body": [
        "// line 1 of code",
        "// line 2",
        "console.error(new Error('$1'))"
    ]
  }
  // similarly add more snippets here
}
```

Here's how it looks-

<br />

![snippet-output](https://user-images.githubusercontent.com/43666833/147088061-c7ef7c4e-e504-4f83-951b-b55fe405e589.gif)
