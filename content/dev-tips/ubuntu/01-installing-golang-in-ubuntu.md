---
title: installing golang in ubuntu
category: ubuntu
date: 18-Apr-2025
---

Here's how you can install Golang in Ubuntu-

1. Download golang linux archive from <a href="https://go.dev/dl/" target="_blank">here</a>.

2. Remove any previous Go installation (if any), and unzip downloaded archive into `/usr/local` directory.

```bash
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.24.2.linux-amd64.tar.gz
```

3. Add Golang path in your shell config by adding following line at the end of your `.zshrc` or `.bashrc`

```bash
export PATH=$PATH:/usr/local/go/bin
```

4. Golang is successfully installed on your system, restart your terminal to try it!

<img class="dev-tip-img" src="https://res.cloudinary.com/akulsrivastavadotcom/image/upload/v1744967308/content/devtips/ubuntu/installing-golang-in-ubuntu/golang-installed.png" alt="golang-installed">
