---
title: Deploy Node/Express App on Amazon EC2
description: In this tutorial, let's learn how can we deploy a node/express app on Amazon EC2 server.
slug: deploy-node-express-app-on-amazon-ec2
date: 18-Aug-2021
isTechBlog: true
---

In this tutorial, let's learn how can we deploy a node/express app on Amazon EC2 server.

<br/>

### 1) Let's create a Node/Express app

<br />

We need to have an node app, before deploying it. Let's create one real quick.

```bash
mkdir node-ec2-demo
cd node-ec2-demo
npm init -y
npm i express
touch index.js
```

Now your folder structure should look like this -

<br />

![1](https://user-images.githubusercontent.com/43666833/124282352-5b504100-db68-11eb-9167-c0e8fd69b172.png)

<br />

### 2) Setup Express

<br />

In index.js, let's create an express app

```javascript
const express = require("express");
const app = express();
app.set("PORT", process.env.PORT || 4000);
app.listen(app.get("PORT"), () => {
  console.log(`Server is running at port ${app.get("PORT")}`);
});
```

Now, time to add some routes to our Express app.

```javascript
app.get("/", (req, res) => {
  res.send("Hello, welcome to the app.");
});

app.get("/api/:slug", (req, res) => {
  const { slug } = req.params;
  res.json({
    data: { text: `/api/${slug} data` },
    success: true,
  });
});
```

### 3) Run Locally and Test

```bash
node index.js
```

Now, open the browser and try both routes, you should get following response:

<br />

<a href='http://localhost:4000' target="_blank">http://localhost:4000</a> <br />
<img src='https://user-images.githubusercontent.com/43666833/124284972-1c6fba80-db6b-11eb-97ab-e81fb7e00efb.png' style="max-width: 360px" alt='route-1-local' />

<br />

<a href='http://localhost:4000/api/some-slug' target="_blank">http://localhost:4000/api/some-slug</a> <br />
<img src='https://user-images.githubusercontent.com/43666833/124285496-9738d580-db6b-11eb-8336-d9d659e02d9e.png' style="max-width: 360px" alt='route-2-local' />

<br />

### 4) Creating an AWS EC2 instance

<br />

First you need to login into AWS, and goto AWS Console.
<a href='https://console.aws.amazon.com/console/home' target='_blank'>https://console.aws.amazon.com/console/home</a>

<br />

Search for EC2, and goto EC2 Dashboard.

<br />

<img src='https://user-images.githubusercontent.com/43666833/124286678-d3206a80-db6c-11eb-9148-5e816c105bd5.png' style="max-width: 360px" alt='search-ec2' />

<br />
<br />

Choose **'Launch Instance'**

<br />

<img src='https://user-images.githubusercontent.com/43666833/124286991-272b4f00-db6d-11eb-9e2a-c6c181d8842b.png' style="max-width: 360px" alt='launch-instance' />

<br />
<br />

For this tutorial, I will be using a **Ubuntu Free Tier Server**

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124287352-88532280-db6d-11eb-9f9a-2009754da244.png' style="max-width: 360px" alt='ubuntu-instance' />

<br />
<br />

Let's keep everything as default, and click **'Review and Launch'**

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124287544-c51f1980-db6d-11eb-9380-1a27c115e486.png' style="max-width: 360px" alt='review-and-launch' />

<br />

**Launch** the server

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124287658-e54ed880-db6d-11eb-81a6-27fcf9c97e89.png' style="max-width: 360px" alt='launch-server' />

<br />
<br />

Create a key pair, **download it** and click **Launch Instances**

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124287917-3232af00-db6e-11eb-9304-f026f02b0380.png' style="max-width: 360px" alt='launch-instances' />

<br />
<br />

You will see something like this after launching the instances

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124288205-89d11a80-db6e-11eb-8fad-87c4c26cfe24.png' style="max-width: 360px" alt='launched-instances' />

<br/>
<br/>

Here, **i-00fbc275f101090c5** is the id of my Amazon EC2 instance. In your case it will be different. Just click on it and proceed further.
Now, you need to connect you the server, select the instance by click on the checkbox on left side and press **Connect** option.

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124288787-3a3f1e80-db6f-11eb-9a4f-ab1f3657a23b.png' style="max-width: 360px" alt='connect-server' />

<br />
<br />

Let's connect to the server in the terminal
Navigate to the folder where you have downloaded the **key-pair** file, which is of **.pem** extension
Now follow the steps as mentioned over here:

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124289461-fb5d9880-db6f-11eb-9657-84ae774a258e.png' style="max-width: 360px" alt='connect-instance' />

<br />
<br />

Once you're connected, you will see something like this

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124289861-66a76a80-db70-11eb-8bcd-d3b160210f2c.png' style="max-width: 360px" alt='connected-instance' />

<br />
<br />

In order to run node app in server we need to install nodejs in the system first. <br/>

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E
sudo apt-get install -y nodejs
```

Now, you need to host your code on github. Once your project is on Github, you can clone it on your server. Goto your github repository and copy the git url.

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124291110-d66a2500-db71-11eb-93b3-6202260dfbb8.png' style="max-width: 360px" alt='git-repo' />

<br />

Now goto your server (in terminal), and clone the repository
Replace the url with your git url.

<br/>

```bash
git clone https://github.com/akulsr0/node-ec2-demo.git
```

Now we have **node** and **npm** installed on the system. It's time to run the app.
Navigate to the cloned repository, do **npm install** and run your _index.js_ file.<br/>

```bash
cd node-ec2-demo/
npm install
node index.js
```

Now you need to add, security group inbound rules in your instance, so that it can be accessed by anyone (any IP basically)

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124294329-2a2a3d80-db75-11eb-93e8-1a5e24e2e8c5.png' style="max-width: 360px" alt='ec2-security-rules' />

<br />
<br />

Click on your **Security Group** > **Edit inbound rules** > **Add Custom/TCP and PORT**
Choose **'Anywhere'** to get your app accessed by any IP address. And, **Save Rules**

<br />

<img src='https://user-images.githubusercontent.com/43666833/124294810-bf2d3680-db75-11eb-9d0a-fa4b9713b165.png' style="max-width: 360px" alt='ec2-security-group-rules' />

<br />
<br />

Now you can visit your node app on you Public IP Address (with PORT), i.e. **https://15.207.114.147:4000/** in our case.
<br/>
But there is a catch here, if you exit the app from terminal, then you will no longer be able to access your node app.

<br />

### 5) Using pm2 for running our app continuously

<br />

In order to keep our node app running even after exiting the server. We can use pm2 to manage the app.<br/>

```bash
npm i -g pm2
sudo pm2 start index.js
```

<img src='https://user-images.githubusercontent.com/43666833/124296601-c5bcad80-db77-11eb-84e0-ff40ab06e6f3.png' style="max-width: 360px" alt='running-with-pm2' />

<br />
<br />

### 6) Finishing off

<br />

Now your app will be available on your server's Public IP Address. You can quit the server and it will be running forever until you close or kill it manually.
Here are both the routes that we created in our express app, hosted on Amazon EC2 Server.

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124297431-ad995e00-db78-11eb-963a-7ee9f6134daa.png' style="max-width: 360px" alt='route-1' />

<br/>

<img src='https://user-images.githubusercontent.com/43666833/124297433-aeca8b00-db78-11eb-9ba3-dbfdec2a953d.png' style="max-width: 360px" alt='route-2' />
