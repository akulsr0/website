---
title: Enabling Feature (Experimental) Flags on Safari iOS
category: webdev
date: 2-Jul-2023
keywords: experimental flags safari, feature flags safari, feature flags safari ios, experimental flags safari ios
---

Have you ever curiously tried some latest features or web APIs on your iOS device, and turns out its not working because of browser support, as the feature might be experimental. You can enable such features for your Safari (iOS), here's how you can do that-

- Open **Settings** > **Safari** > **Advanced**
- Select **Experimental Features** or **Feature Flags**

<img class='dev-tip-img' src='https://github.com/akulsr0/website/assets/43666833/64d5a83b-eb7d-404c-940d-cc446d176a74' alt='ff-settings'>

<br />

Let's try out with an example to see how it works, as I write, the CSS property _content-visibility_ is disabled by default and available inside feature flags to be used. I will be using following markup to test it with and without the feature flag enabled.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .content-wrapper {
        content-visibility: hidden;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Test App</h1>
      <div class="content-wrapper">
        <img src="https://picsum.photos/200" alt="" />
      </div>
    </div>
  </body>
</html>
```

<br height="1">

<div style='display: flex; gap: 0.6rem'>
    <div style='flex: 1;'>
        <h3>Result:</h3>
        <p>We can see, the content was not hidden by default, since css property <em>content-visibility</em> was not enabled in feature flag. But after enabling it, the <em>content-wrapper</em> div got hidden.</p>
    </div>
    <img class='dev-tip-img' style='max-width: 50%;' src='https://github.com/akulsr0/website/assets/43666833/3567102c-694d-4f55-a23c-8471e9201218' alt='safari-ios-ff-demo'>
</div>
