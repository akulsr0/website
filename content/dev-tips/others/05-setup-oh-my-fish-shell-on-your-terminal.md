---
title: Setting up oh-my-fish (Fish Shell Framework) on your terminal
category: others
date: 01-Jan-2022
---

The journey of software development is incomplete without terminal, and there are multiple shells which we can use on that terminal as per our preference(s).

One of them is the fish shell, with its most popular feature of auto suggestions.

Here's how you can install and setup fish shell with (oh-my-fish):

<br />

### Installing fish shell

You can either download and install it from its website - [here](https://fishshell.com/). Or, if you have Homebrew installed you can simply install it from terminal.

```sh
brew install fish
```

<br />

### Change shell to fish

To make fish as your default shell run following-

```sh
chsh -s /usr/local/bin/fish
```

![activate-fish-shell](https://user-images.githubusercontent.com/43666833/147846995-1a542782-6177-4df3-aeef-214724fd634b.gif)

<br />

### Installing oh-my-fish

To install [oh-my-fish](https://github.com/oh-my-fish/oh-my-fish#installation), you just need to run following in your terminal.

```sh
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
```

![installing-oh-my-fish](https://user-images.githubusercontent.com/43666833/147847067-48db9aa7-7994-4265-b667-fe53358038cf.gif)

<br />

Done, yeah that's it, the fish shell is successfully installed with oh-my-fish. Here's how it looks:

<br />

![omf-looks](https://user-images.githubusercontent.com/43666833/147847197-b08a794b-cece-48d9-a559-fea3d6a692ba.gif)
