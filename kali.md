# Kali Linux CLI (via Docker)
**Tools:** Python, Flask, Requests

---

## Step 1: Install & Start Kali Linux CLI (Docker)

Sabse pehle VS Code ke PowerShell terminal me Kali Linux ka container banayein aur start karein:

```bash
# Naya Kali container download aur run karne ke liye

docker run -it --name my_kali kalilinux/kali-rolling /bin/bash

# System ki list ko update karein

apt update

Agar container band ho jaye, toh dobara start karne ke liye:

# docker exec -it my_kali /bin/bash
