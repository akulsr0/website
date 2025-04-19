---
title: Understanding contrast ratio for Web Accessibility
description:
slug: understanding-contrast-ratio-for-web-accessibility
date: 08-Apr-2022
isTechBlog: true
---

To make the web accessible to different types of users with different types of abilities, there are some guidelines by <a href='https://www.w3.org/WAI/standards-guidelines/wcag/' target="_blank">WCAG</a> which tells level of conformance for better web accessibility.

<br />

#### Levels of Conformance

- **Level A**: It is the lowest level and is required by the users in order to access the web content.
- **Level AA**: It includes both itself and Level A. It is required for many websites (eg. government websites) to make the website accessible to differently abled users.
- **Level AAA**: It is the highest level of conformance. It includes all the levels i.e. A, AA, AAA.

<br />

#### Contrast Ratio

The contrast is dependent on foreground and background. In case of some text on web, the contrast ratio is dependent on text and background color. As per the guidelines of <a href='https://www.w3.org/WAI/standards-guidelines/wcag/' target="_blank">WCAG</a>, the required contrast ratios are as following:

<br />

<div class='table-wrapper'>

| Level | Normal Text | Large Text |
| ----- | ----------- | ---------- |
| AA    | 4.5:1       | 3:1        |
| AAA   | 7:1         | 4.5:1      |

</div>

<br />

**Note:** Large Text is 18pt (24px), or 14pt (18.66px) when bold.

<br />

#### How to check Contrast Ratio?

There are multiple ways to check contrast ratio, we can do it in the web developer tools or we can check it through <a href='https://webaim.org/resources/contrastchecker/' target='_blank'>WebAIM Contrast Checker</a>

<br />

#### Using DevTools

Let's take an example of a heading, with red text color and pink background color, and inspect it in web developer tools to find out the contrast ratio.

```html
<h1 style="color: red;background-color: pink;">Heading</h1>
```

<img src='https://user-images.githubusercontent.com/43666833/162402178-c77b1f06-1feb-482b-81b6-c36dfd35faff.gif' alt='check-contrast' >

<br /><br />

In the above demonstration, you can see when we click on the color, it tells us the current contrast ratio and the required contrast ratio for Level AA and Level AAA. This required contrast ratio can change depending upon the size of the text. You can also notice that when we click on the color, two lines are drawn on the color picker. These two lines divide the color picker into three sections for Level A, AA and AAA. The middle section is the section of Level AA, and the top and bottom sections can be either Level A or Level AAA depending upon the color. Colors selected within the middle section will have Level AA of conformance. If our color is not having target contrast ratio we can choose a similar color within the color picker which meets the expected contrast ratio.

<br />

#### How to know if a webpage has Contrast Issues?

You can check if a webpage has contrast issues by doing following steps:

- Click on three dots at top right side of your browser.
- Goto More tools > CSS Overview
- Click Capture Overview
- Scroll down, if there are any contrast issues they will come here.

<img src='https://user-images.githubusercontent.com/43666833/162405012-1f9eb0cd-481d-4b7b-942d-0bd7912f84be.gif' alt='check-contrast-issues' >
