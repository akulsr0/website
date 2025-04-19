---
title: installing zsh shell in ubuntu
category: ubuntu
date: 18-Apr-2025
---

Here's how you can install zsh shell in ubuntu-

1. Run following command in your terminal

```bash
sudo apt install zsh
```

2. Change your default shell to zsh by running following command

```bash
sudo chsh -s /usr/bin/zsh
```

3. Logout your user, and try login again. zsh shell is installed and set to default shell successfully!

<img class="dev-tip-img" src="https://res.cloudinary.com/akulsrivastavadotcom/image/upload/v1744964936/content/devtips/ubuntu/installing-zsh-shell-in-ubuntu/zsh-without-theme.png" alt="zsh-without-theme">

4. Now, let's add theme to it, I will be using <a href="https://github.com/sindresorhus/pure" target="_blank">pure</a> theme.

5. Create `.zsh` folder in your home directory and clone `pure` repository there-

```bash
mkdir -p "$HOME/.zsh"
git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure"
```

6. Add following lines of code at start of your `~/.zshrc` file

```bash
fpath+=($HOME/.zsh/pure)
autoload -U promptinit; promptinit
prompt pure
```

7. You're all set and done!

<img class="dev-tip-img" src="https://res.cloudinary.com/akulsrivastavadotcom/image/upload/v1744964473/content/devtips/ubuntu/installing-zsh-shell-in-ubuntu/zsh-shell.png" alt="zsh-shell" >
