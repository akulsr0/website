---
title: Make your localhost webapp Internet accessible
category: webdev
date: 13-Aug-2022
---

If you have came across situations where you need to share your local running web application with your friends, colleague, team; but you aren't sure how to do that. This is for you!

<br />

### Get internet accessible link for your local running webapps and share it

<br />

For this you need a ssh key, if you don't have it, you can generate it with following steps-

- Open terminal
- Enter **ssh-keygen**
- Continue and create a new password

After generating the ssh key, we can use <a href='https://localhost.run/' target='_blank'>localhost.run</a> to tunnel our local web application. Here's how:

<br />

Suppose my web application is running locally on port 3000, we can run the following command to tunnel it and make it internet accessible-

```bash
ssh -R 80:localhost:3000 localhost.run
```

After running the above command it will ask for ssh password (which we created initially), you can enter it and continue.

<br />

<img src='https://user-images.githubusercontent.com/43666833/184432327-fd9d4ae7-b405-413d-914e-1f77821d6ad3.png' alt='localhost.run tunneling'>

At the bottom you will get a link which you can share with anyone and anyone with that link and Internet will be able to access your local running application.

<br />

**Note:** Once you exit the terminal, the link will work anymore.
