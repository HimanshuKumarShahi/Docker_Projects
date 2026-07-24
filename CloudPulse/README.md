# ⚡ CloudPulse - Self-Hosted Cloud Deployment Platform

> **CloudPulse** is a modern, lightweight, self-hosted Platform-as-a-Service (PaaS) — a completely **free Vercel and Render alternative** built to run in Docker. It allows you, your friends, and your family to deploy fresh web projects instantly from GitHub repositories or local source code with **zero hosting costs** and **bank-grade data security**.

---

## 🌟 Key Features

* 🚀 **One-Click & Git Deployments:** Deploy Node.js, Next.js, React, Python, or static websites automatically from git URLs.
* 🔒 **100% Private & Free:** Runs locally on your hardware/Docker container without any subscription fees.
* 🛡️ **End-to-End Data Safety:** AES-256 encrypted secrets, sandboxed Docker containers, and RBAC security.
* 🌐 **Automatic Reverse Proxy:** Dynamic routing (Traefik / Caddy) assigning clean local domains (`http://my-app.cloudpulse.local`).
* 🌍 **Free Public Access for Friends:** Cloudflare Tunnels (Zero Trust) providing secure `https://` public links without port forwarding.
* 📊 **Resource & Log Monitoring:** Track build status, container health, CPU/RAM usage, and sanitized stdout logs in real-time.

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Control Plane UI** | Next.js 14 / Tailwind CSS | Dashboard for managing projects, builds, and logs |
| **Orchestration Backend** | Node.js (Express) / Docker API | Clones git repos, builds Docker images, manages containers |
| **Database** | SQLite / PostgreSQL | Stores users, project configs, encrypted secrets, and build history |
| **Dynamic Gateway** | Traefik / Nginx Proxy | Auto-routes subdomains to active container ports |
| **Public Gateway** | Cloudflare Tunnel | Exposes local apps safely to friends on the internet for free |
| **Container Engine** | Docker & Docker Compose | Isolated execution environment for every deployed app |

---

## 🔌 Port Mapping & Network Layout

| Service Name | Container Port | Host Port | Description |
| :--- | :--- | :--- | :--- |
| **CloudPulse Dashboard** | `3000` | `3000` | Main management UI for you and your friends |
| **Control API Engine** | `4000` | `4000` | Handles authentication, git clones, Docker builds, and logs |
| **Traefik Web Gateway** | `80` / `443` | `8080` / `8443` | Reverse proxy routing `*.cloudpulse.local` traffic |
| **Friend App Containers** | Dynamic (`3001-3999`) | Internal Docker Bridge | Isolated ports assigned dynamically to user apps |
| **Cloudflare Tunnel** | Outbound | Outbound | Secure public HTTPS tunnel to internet |

---

## 🔄 End-to-End User Flow & Data Safety Architecture

Below is the complete step-by-step lifecycle of a project from user registration to live production deployment, detailing how your server and data remain **100% secure** at every stage:

```
[User Login / Auth] ──> [Project Creation & Git Clone] ──> [AES-256 Secret Encryption]
                                                                     │
[Live App URL] <── [Cloudflare Tunnel] <── [Traefik Proxy] <── [Sandboxed Docker Build]
```

### 1. User Registration & Secure Authentication
* **What Happens:** Users (or friends) sign up or log in via the CloudPulse Dashboard (`http://localhost:3000`).
* **Behind the Scenes:**
  * User credentials are validated by the Control API Engine.
  * Passwords are hashed using **Bcrypt (12 salt rounds)** before storing in the database. Raw passwords are never kept in plain text.
  * Session management uses stateless **JWT Tokens** stored in `HttpOnly`, `SameSite=Strict` cookies to prevent Cross-Site Scripting (XSS) attacks.
* **Role-Based Access Control (RBAC):** Admin users have access to server-wide controls, while Friend accounts can only view and manage their own projects.

### 2. Project Creation & Git Ingestion
* **What Happens:** The user pastes a public or private GitHub repository URL (e.g. `https://github.com/friend/awesome-app`).
* **Behind the Scenes & Data Safety:**
  * Input sanitization filters out malicious command strings to prevent shell injection attacks.
  * The backend clones the repository into a isolated build directory (`/var/tmp/cloudpulse/builds/<project-id>`).
  * Repository contents are scanned for standard application manifests (`package.json`, `requirements.txt`, `Dockerfile`).

### 3. Environment Variable & Secret Encryption
* **What Happens:** The user enters sensitive `.env` keys (e.g., `DATABASE_URL`, `API_KEY`, `JWT_SECRET`).
* **Behind the Scenes & Data Safety:**
  * Environment variables flagged as secret are encrypted using **AES-256-GCM** encryption before database insertion.
  * Secrets are decrypted **only in memory** at the exact moment the application container is spawned.
  * Log sanitization rules automatically scrub secret keys from build and runtime console outputs.

### 4. Automated Containerization & Resource Sandboxing
* **What Happens:** CloudPulse builds a isolated Docker container for the project.
* **Behind the Scenes & Data Safety:**
  * **Unprivileged Execution:** Containers run under a dedicated, low-privilege Docker user.
  * **Resource Caps:** Each container is constrained (Default: **512MB RAM ceiling**, **1.0 CPU Core max**) to prevent a single buggy app from crashing your host server.
  * **Network Isolation:** Containers operate on an isolated internal bridge network (`cloudpulse-net`). They cannot communicate with host system files or other users' containers.

### 5. Dynamic Reverse Proxy & Internal Routing
* **What Happens:** The app container starts on a random dynamic port (e.g., `3005`).
* **Behind the Scenes & Data Safety:**
  * Traefik Proxy dynamically detects the container launch and binds `http://awesome-app.cloudpulse.local` directly to port `3005`.
  * External users cannot access internal container ports directly; all traffic passes through proxy security headers (HSTS, X-Frame-Options, CORS protection).

### 6. Zero-Trust Public Sharing (Cloudflare Tunnels)
* **What Happens:** Friends access the app over the internet via a free public link (`https://awesome-app.trycloudflare.com`).
* **Behind the Scenes & Data Safety:**
  * Cloudflare Tunnel establishes an encrypted, outbound-only connection from your server to Cloudflare’s global network.
  * **Zero Open Ports:** You **do not** need to open router ports (No Port Forwarding) or expose your home IP address.
  * All public traffic is protected by Cloudflare DDoS defense and SSL encryption.

### 7. Real-Time Log Streaming & Emergency Switch
* **What Happens:** Users view live container stdout/stderr build and execution logs in the UI dashboard.
* **Behind the Scenes & Data Safety:**
  * Logs are piped safely over secure WebSockets (`wss://`).
  * One-Click Kill Switch: Admins or owners can stop, pause, or instantly delete containers if anomalous behavior is detected.

---

## 🚀 Quick Start Guide (Step-by-Step)

### Step 1: Access the Docker Environment
Make sure your Docker environment is active:
```bash
# Navigate to project directory
cd /path/to/projects/AI_LAB

# Start the Docker environment
docker compose up -d

# Enter the Linux bash terminal
docker exec -it basic-ubuntu-lab bash
```

### Step 2: Navigate to CloudPulse Project
Inside the environment:
```bash
cd /path/to/projects/CloudPulse
```

### Step 3: Start CloudPulse Core Services
```bash
# Install dependencies
npm install

# Start the CloudPulse platform engine
npm run dev
```
Open your browser at `http://localhost:3000` to access the CloudPulse Dashboard!

---

## 🌐 Free Public Tunnel Setup (For Remote Friends)

To allow friends outside your home Wi-Fi to access deployed apps for **free**:

1. Install `cloudflared` on your system:
   ```bash
   apt-get install -y cloudflared
   ```
2. Run the tunnel command:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
3. Share the generated HTTPS link (e.g., `https://random-subdomain.trycloudflare.com`) with your friends!

---

## 📜 Cheat Sheet & Useful Commands

| Action | Command |
| :--- | :--- |
| **View Active Containers** | `docker ps` |
| **View App Logs** | `docker logs -f <container_name>` |
| **Stop All Containers** | `docker stop $(docker ps -a -q)` |
| **Check Port Allocation** | `ss -tulpn` |


