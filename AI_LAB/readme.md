# 🐧 My Local Ubuntu Web Server Lab

This is a complete, lightweight Ubuntu 24.04 environment running inside Docker. 

This lab allows me to safely practice Linux command-line skills, package management, and web server configuration without risking any damage to my main Windows system. If it breaks, I can just delete it and start over in seconds.

---

## 📂 Project Setup (Step 0)

Before running any commands, my VS Code project folder must contain a file named exactly `docker-compose.yml`. This file is the blueprint for the machine.

Create `docker-compose.yml` and paste this exact code inside:

```yaml
services:
  ubuntu-learning-lab:
    image: ubuntu:24.04
    container_name: basic-ubuntu-lab
    command: sleep infinity
    volumes:
      - ./workspace:/workspace
    ports:
      - "8080:80"
```
image: ubuntu:24.04: Tells Docker to pull the official, bare-bones Ubuntu 24.04 operating system.

container_name: basic-ubuntu-lab: Gives the machine a recognizable name so I don't have to memorize random Docker ID strings.

command: sleep infinity: Crucial step. Ubuntu containers normally shut down immediately if they don't detect a background task. This forces the container to stay awake until I explicitly tell it to shut down.

volumes: Creates a portal between Windows and Linux. Any file I put in the workspace folder in VS Code will instantly appear inside the /workspace folder in the Ubuntu container.

ports: Routes web traffic from my Windows machine (Port 8080) directly into the Ubuntu container's web server (Port 80).

```
1.  docker compose up -d

2.  docker exec -it basic-ubuntu-lab bash

3.  apt update

4.  apt install nginx nano htop -y

5.  service nginx start

// for edit file

6.  nano /var/www/html/index.nginx-debian.html

// for exit

7.  exit  or ctrl + D

//destroy the container

8.  docker compose down
```
start on : http://localhost:8080