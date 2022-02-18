---
title: Filtering Network Requests in Chrome DevTools
category: webdev
date: 18-Feb-2022
---

![filter-network-requests](https://user-images.githubusercontent.com/43666833/154629228-5f7e0aca-7288-4a71-83b7-880eba46e7c1.png)

<br />

While development or debugging some error, there is often flood of api calls which happens in Network tab. We can filter those api calls as per our needs on the basis of various things like its domain, method, resource type etc...

<br />

Let's take example of [Tickertape](https://www.tickertape.in/) (website) and see how we can filter those api calls.

<br />

### Filtering based on Request Method: GET/POST/...

To filter the requests based on method, simply write _*method:value*_ (eg: method:GET, method:POST, etc...) in the filter input.

<br />

![filter-method](https://user-images.githubusercontent.com/43666833/154631882-38fd9769-bd26-4821-b57c-d12aa24ea570.gif)

<br />

### Filtering based on domain

There are multiple network calls which happen in the complete load of a website, this could be images, fonts, media files, websocket requests etc... Among these requests the domain of the request could be different. Let's say if we want to view only api requests, we can filter the domain as the domain of api host and we will get only api request.

<br />

![filter-domain](https://user-images.githubusercontent.com/43666833/154633779-624dc0fe-68c0-4139-8c2b-8dfe4a717b8b.gif)

<br />

**Note:** We can also use \* selector to select all subdomains of a TLD. For instance, if you want to select all subdomains of myapi.com then you can write \*.myapi.com

<br />

### Combining filters

We can also combine two or more filter by joining them with a space.

For example, if we want to filter on domain and method both, we can do as following:

```text
domain:api.tickertape.in method:GET
```

<br />

### Not/Inverse Filter

There could be cases where you might need to filter network calls on inverse of a condition. For example, filtering all api calls whose method is not GET.

To do so, add a hyphen (-) before your conditon. If you want to check all api request which are not GET request, you can do following:

```text
-method:GET
```

<br />

![filter-inverse](https://user-images.githubusercontent.com/43666833/154635317-1f390efe-ef2e-4db6-ad3c-02afe89598e2.gif)

<br />

### Resources

Check [this link](https://developer.chrome.com/docs/devtools/network/reference/#filter) for complete official documentation of network calls filtering.
