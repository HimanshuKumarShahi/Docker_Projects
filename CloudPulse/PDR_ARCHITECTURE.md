# 📊 Project Definition Report (PDR) & System Architecture

## 📋 1. Executive Summary & Project Definition

**Project Name:** CloudPulse  
**Target Platform:** Self-Hosted Linux / Docker Infrastructure  
**Primary Purpose:** A 100% free, private Platform-as-a-Service (PaaS) allowing developers, friends, and family to deploy, host, and manage web applications and services without relying on paid cloud providers.

### **Functional Requirements:**
- **User & Auth Management:** Multi-user support with role-based access (Admin, Developer/Friend).
- **Git Integration:** Auto-clone and auto-build from public or private GitHub/GitLab repositories.
- **Container Lifecycle Management:** Trigger `build`, `start`, `stop`, `restart`, and `delete` operations on deployed app containers via Docker API.
- **Dynamic Subdomain Routing:** Automatic proxying of incoming requests to target container ports based on subdomain headers.
- **Log Streaming:** Real-time stdout/stderr build and execution log streaming to UI.
- **Public Tunneling:** One-click integration with Cloudflare Tunnels for zero-trust public HTTPS deployment.

---

## 🗄️ 2. Entity-Relationship (ER) Diagram

The system database schema manages users, projects, builds, environment secrets, and domain configurations.

```mermaid
erDiagram
    USERS ||--o{ PROJECTS : "owns"
    PROJECTS ||--o{ DEPLOYMENTS : "has history of"
    PROJECTS ||--o{ ENV_VARIABLES : "configures"
    PROJECTS ||--o| DOMAINS : "binds to"
    DEPLOYMENTS ||--o{ BUILD_LOGS : "generates"

    USERS {
        string id PK
        string username
        string email
        string password_hash
        string role "Admin | Friend"
        datetime created_at
    }

    PROJECTS {
        string id PK
        string user_id FK
        string name
        string git_repo_url
        string branch
        string framework_type "NextJS | Vite | Python | Dockerfile"
        int internal_port
        string status "Active | Stopped | Building"
        datetime created_at
    }

    ENV_VARIABLES {
        string id PK
        string project_id FK
        string key
        string value_encrypted
        boolean is_secret
    }

    DOMAINS {
        string id PK
        string project_id FK
        string domain_name "app-name.cloudpulse.local"
        string public_tunnel_url "https://xyz.trycloudflare.com"
        boolean ssl_enabled
    }

    DEPLOYMENTS {
        string id PK
        string project_id FK
        string commit_hash
        string status "SUCCESS | FAILED | BUILDING"
        int duration_seconds
        datetime triggered_at
    }

    BUILD_LOGS {
        string id PK
        string deployment_id FK
        string log_line
        string log_level "INFO | ERROR | WARN"
        datetime timestamp
    }
```

---

## 🏗️ 3. High-Level System Architecture Diagram

```mermaid
flowchart TD
    subgraph External Users & Friends
        F1[Friend Desktop / Mobile]
        F2[Developer Client]
    end

    subgraph Internet Gateway / Public Access
        CF[Cloudflare Tunnel - Zero Trust]
    end

    subgraph Home Host Machine / Docker Container
        subgraph Edge Proxy
            TR[Traefik / Dynamic Nginx Proxy - Port 8080]
        end

        subgraph CloudPulse Core
            UI[CloudPulse Web UI - Port 3000]
            API[Control API Engine - Port 4000]
            DB[(SQLite / Postgres DB)]
        end

        subgraph Docker Engine Engine
            DE[Docker Daemon Socket /var/run/docker.sock]
            
            subgraph Spawned Friend Containers
                C1[Friend App 1: Next.js - Port 3001]
                C2[Friend App 2: Python API - Port 3002]
                C3[Family Photo App: React - Port 3003]
            end
        end
    end

    F1 -->|Public HTTPS| CF
    F2 -->|Local Web UI| UI
    CF -->|Secure Tunnel| TR
    TR -->|Route: app1.local| C1
    TR -->|Route: app2.local| C2
    TR -->|Route: family.local| C3

    UI -->|REST / WebSockets| API
    API -->|Read/Write State| DB
    API -->|Control Socket Commands| DE
    DE -->|Build & Run Containers| C1
    DE -->|Build & Run Containers| C2
    DE -->|Build & Run Containers| C3
```

---

## 🔄 4. Data Flow & Deployment Sequence Diagram

This sequence illustrates what happens when a friend deploys a new project from a Git repository URL:

```mermaid
sequenceDiagram
    autonumber
    actor Friend as Friend / Developer
    participant UI as CloudPulse UI
    participant API as Control API Backend
    participant Git as GitHub Repository
    participant Docker as Docker Daemon API
    participant Proxy as Traefik Gateway

    Friend->>UI: Input Git URL (https://github.com/friend/app) & Env Vars
    UI->>API: POST /api/projects/deploy { gitUrl, envVars }
    API->>Git: Clone repository into /tmp/builds/<project-id>
    Git-->>API: Code downloaded successfully
    API->>API: Detect build type (Dockerfile / package.json / requirements.txt)
    API->>Docker: Execute docker build -t project-id:latest .
    Docker-->>API: Stream build logs (sent to UI via WebSockets)
    API->>Docker: Execute docker run -d --name project-id -p <dynamic_port>:3000
    Docker-->>API: Container ID returned (Status: Running)
    API->>Proxy: Register new dynamic rule (subdomain -> dynamic_port)
    Proxy-->>API: Rule active
    API-->>UI: Deployment Complete! Return URL: http://app.cloudpulse.local
    UI-->>Friend: Display live project URL & status dashboard
```

---

## 🛡️ 5. Security & Resource Isolation Blueprint

1. **Docker Container Isolation:**
   - Every deployed project runs in its own non-privileged container bridge network.
   - Deployed containers cannot access host files or other containers unless explicitly linked.
2. **Resource Limits per Project:**
   - **RAM Limit:** Default `512MB` max per container (prevents one memory-heavy app from freezing your server).
   - **CPU Limit:** Default `1.0 CPU Core` ceiling.
3. **Secret Encryption:**
   - All environment variables (`.env`) stored in the database are encrypted at rest using AES-256 GCM encryption.
