# ⚡ CloudPulse - Self-Hosted Cloud Deployment Platform

> **CloudPulse** is a modern, lightweight, self-hosted Platform-as-a-Service (PaaS) — a completely **free Vercel and Render alternative** built to run in Docker. It allows you, your friends, and your family to deploy fresh web projects instantly from GitHub repositories or local source code with **zero hosting costs**.

---

## 🌟 Key Features

* 🚀 **One-Click & Git Deployments:** Deploy Node.js, Next.js, React, Python, or static websites automatically from git URLs or fresh projects.
* 🔒 **100% Private & Free:** Runs locally on your hardware/Docker container without any subscription fees.
* 🌐 **Automatic Reverse Proxy:** Uses dynamic routing (Traefik / Caddy) to assign clean local domains (e.g. `http://my-app.cloudpulse.local`).
* 🌍 **Free Public Access for Friends:** Integrated with Cloudflare Tunnels (Zero Trust) to give your friends secure `https://` public links without port forwarding.
* 📊 **Resource & Log Monitoring:** Track build status, container health, CPU/RAM usage, and stdout logs in real-time.

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Control Plane UI** | Next.js 14 / Tailwind CSS | Dashboard for managing projects, builds, and logs |
| **Orchestration Backend** | Node.js (Express) / Docker API | Clones git repos, builds Docker images, manages containers |
| **Database** | SQLite / PostgreSQL | Stores users, project configs, environment variables, and build history |
| **Dynamic Gateway** | Traefik / Nginx Proxy | Auto-routes subdomains to active container ports |
| **Public Gateway** | Cloudflare Tunnel | Exposes local apps safely to friends on the internet for free |
| **Container Engine** | Docker & Docker Compose | Isolated execution environment for every deployed app |

---

## 🔌 Port Mapping & Network Layout

| Service Name | Container Port | Host Port | Description |
| :--- | :--- | :--- | :--- |
| **CloudPulse Dashboard** | `3000` | `3000` | Main management UI for you and your friends |
| **Control API Engine** | `4000` | `4000` | Handles git clones, Docker builds, and logs |
| **Traefik Web Gateway** | `80` / `443` | `8080` / `8443` | Reverse proxy routing `*.cloudpulse.local` traffic |
| **Friend App Containers** | Dynamic (`3001-3999`) | Internal Docker Bridge | Isolated ports assigned dynamically to user apps |
| **Cloudflare Tunnel** | Outbound | Outbound | Secure public HTTPS tunnel to internet |

---

## 🚀 Quick Start Guide (Step-by-Step)

### Step 1: Access the Docker Environment
Make sure your Docker container is running:
```bash
# Navigate to the AI_LAB directory in terminal
cd "ubuntu\AI_LAB"

# Start the Docker Lab
docker compose up -d

# Enter the Ubuntu bash terminal
docker exec -it basic-ubuntu-lab bash
```

### Step 2: Navigate to CloudPulse Project
Inside the project directory:
```bash
cd /ubuntu/CloudPulse
```

### Step 3: Start CloudPulse Core Services
```bash
# Install dependencies (if running Node.js backend)
npm install

# Start the CloudPulse platform engine
npm run dev
```
Open your browser at `http://localhost:3000` to access the CloudPulse Dashboard!

---

## 👥 How Friends Deploy Fresh Projects

1. **Get GitHub Repository URL:** Your friend gives you or enters their GitHub repository URL (e.g. `https://github.com/friend/awesome-app`).
2. **Add Environment Variables:** Input any required `.env` variables (e.g., API keys, database URLs) in the CloudPulse UI.
3. **Click "Deploy":** 
   - CloudPulse clones the code into an isolated folder.
   - Detects the project framework (Next.js, Vite, Python, HTML).
   - Builds a lightweight Docker container.
   - Spawns the container and routes it to `http://awesome-app.cloudpulse.local` or a free Cloudflare HTTPS URL for them to view live!

---

## 🌐 Sharing with Friends Outside Home (Cloudflare Tunnel Setup)

To allow friends outside your local Wi-Fi to access deployed apps for **free**:

1. Install `cloudflared` inside your container or Windows host:
   ```bash
   apt-get install -y cloudflared
   ```
2. Create a free tunnel command:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
3. Copy the generated public URL (e.g. `https://random-name.trycloudflare.com`) and send it to your friends!

---

## 📜 Cheat Sheet & Useful Commands

| Action | Command |
| :--- | :--- |
| **View Active Containers** | `docker ps` |
| **View App Build Logs** | `docker logs -f <app-container-name>` |
| **Stop All Deployed Apps** | `docker stop $(docker ps -a -q)` |
| **Check Port Usage** | `netstat -tuln` or `ss -tulpn` |

---
