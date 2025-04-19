---
title: copy link with text highlighted in a website
category: others
date: 18-Feb-2023
---

Ever wondered, when you search for some query on google, you get a nice minimal answer from a long blog post or article, and when you open that article that particular text or group of text gets highlighted. In case you haven't seen that here's a demo-

<br />

<img class='dev-tip-img mw-full' src='https://user-images.githubusercontent.com/43666833/219867516-94f1706f-339f-495e-a300-2381bd415eeb.gif' alt='copy-link-highlight-text-demo'>

<br />

### How does it work?

For the above demo, the link is -

```
https://observatoireprevention.org/en/2021/03/09/why-do-the-japanese-have-the-highest-life-expectancy-in-the-world/#:~:text=Japanese%20life%20expectancy&text=This%20low%20mortality%20is%20mainly,and%203.7%25%20for%20women).
```

If we look closely, the link has _#:~:text=_ at the end of the website path. So the structure of url to form such a link is-

```
# structure of url
https://yourwebsite.com/path/to/article/#:~:text=the text you want to highlight
```

And here is a demo url, where you can verify the above -
<a href='https://akulsrivastava.com/about#:~:text=Hey%20there%2C%20I%20am%20Akul' target='_blank'>https://akulsrivastava.com/about#:~:text=Hey%20there%2C%20I%20am%20Akul</a>

<br />

### How to create a link with text highlighted

1. Go to the website and select the text which you want to highlight.
2. Right-click on the text
3. Select _Copy link to highlight_

<img class='dev-tip-img' src='https://user-images.githubusercontent.com/43666833/219868344-118c631a-67c6-4c5a-a61e-18859056f75d.png' alt='how-to-copy-highlight-link'>

<br />

### Highlighting multiple texts

To get the link with multiple texts highlighted, manual effort is needed i.e. structuring the url by ourselves in the following format-

```
https://website.com/your/path/#:~:text=this is text 1&text=this is text 2
```

**Demo Url** - <a href='https://akulsrivastava.com/about#:~:text=Hey there, I am Akul&text=I also like to explore opensource projects' target='_blank'>https://akulsrivastava.com/about#:~:text=Hey there, I am Akul&text=I also like to explore opensource projects</a>
