---
id: 12
title: ping command
date: 13-Jun-2021
---

### ping command

The ping command is used to check connection to some host.

<p class="lc-paragraph">
<strong>Syntax:&nbsp;</strong>ping [options] host
</p>

<p class="lc-paragraph">
<strong>Example:</strong>
</p>

```bash
ping akulsrivastava.com
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173620125-3434b188-4aed-4cc5-8028-e27842b9606c.png' alt='ping-output'>

<div style="height:12px"></div>

Lets understand what following line means:

```txt
64 bytes from 76.76.21.21 (76.76.21.21): icmp_seq=1 ttl=37 time=21.4 ms
```

Here, each of this line refers that a packet is sent to the host server called as **echo request**. And, the server replies the packet request called as **echo reply request**.

The address shown is the IP Address of the host.

ICMP stands for Internet Control Message Protocol, and icmp_seq basically tells the sequence of packet sent.

Time key i.e. _time_ tells the duration it took to sent and recieve packet from the server.

At the bottom, it tells the minimum, average, maximun and median deviation values for packet timings.

<p class="lc-paragraph"><strong>Options:</strong></p>

<div class="command-option">
    <strong>-c</strong>
    <span>Stop after sending n requests</span>
</div>

**Example:**

```bash
ping -c 3 akulsrivastava.com
```

<img class='lc-img' src='https://user-images.githubusercontent.com/43666833/173625428-c9423e77-ebba-4530-9ee3-0968e9994cbd.gif' alt='ping-count-output' >

<div class="command-option">
    <strong>-i</strong>
    <span>Sets interval of n seconds before sending each request</span>
</div>

Default value is one second, the below example will set interval of 3 seconds i.e. each packet is sent after 3 second.

<div style="height:12px;"></div>

**Example**

```bash
ping -i 3 akulsrivastava.com
```
