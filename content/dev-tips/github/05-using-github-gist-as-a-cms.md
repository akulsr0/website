---
title: using github gist as a cms
category: github
date: 16-Jun-2024
keywords: cms, github gist, free cms, how to create a free cms, how to create a basic cms for free
---

Many times, we need a very basic cms for our hobby projects. For those cases, we can use github gist to have it.

<br />

**Steps:**

1. We need to create a public gist, with a json file having our config data
   <img class='dev-tip-img mw-full' src="https://github.com/akulsr0/website/assets/43666833/01fd6183-00c1-4b30-bfba-5e9c29047c1d" alt="create-config-gist"><br/>

2. Once the gist is create, grab the gist id
   <img class='dev-tip-img mw-full' src="https://github.com/akulsr0/website/assets/43666833/a1a32b01-61f5-4bcb-80c5-e936f4bede69" alt="gist-id"><br />

3. Then, we can simply fetch its content by following url. The config data would be present at `response.files['your-file-name'].content`.
   <br />In our case it would be `response.files[data.json].content`

```
API: https://api.github.com/gists/<your-gist-id-here>
Example:  https://api.github.com/gists/88c72cf2e8ba532a24024d9cfa5cc52a
```

4. Once we get the stringified json, we can parse it and use it.

<br />

**Video Tutorial**

<div style="display: flex; justify-content:center; margin-top: 8px">
<iframe width="560" height="315" src="https://www.youtube.com/embed/TUB7iFGnd08?si=rSvZSUZBUtCXmH_J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
