# 📊 Project Definition Report (PDR) & System Architecture

## 📋 1. Executive Summary & Project Definition

**Project Name:** CloudPulse  
**Target Platform:** Self-Hosted Linux / Docker Infrastructure  
**Primary Purpose:** A 100% free, private Platform-as-a-Service (PaaS) allowing developers, friends, and family to deploy, host, and manage web applications and services without relying on paid cloud providers.

### **Functional Requirements:**
- **User & Auth Management:** Multi-user support with role-based access control (Admin vs Friend roles).
- **Git Integration:** Auto-clone and auto-build from public or private GitHub/GitLab repositories.
- **Container Lifecycle Management:** Trigger `build`, `start`, `stop`, `restart`, and `delete` operations on deployed app containers via Docker API.
- **Dynamic Subdomain Routing:** Automatic proxying of incoming requests to target container ports based on subdomain headers.
- **Log Streaming:** Real-time stdout/stderr build and execution log streaming to UI via WebSockets.
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
        string password_hash "Bcrypt Salted Hash"
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
        string value_encrypted "AES-256-GCM Encrypted"
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
        string log_line "Sanitized (No Secrets)"
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

    subgraph Host Server / Docker Container Environment
        subgraph Edge Proxy Layer
            TR[Traefik / Dynamic Nginx Proxy - Port 8080]
        end

        subgraph CloudPulse Core Plane
            UI[CloudPulse Web UI - Port 3000]
            API[Control API Engine - Port 4000]
            DB[(SQLite / Postgres DB)]
        end

        subgraph Docker Engine Engine
            DE[Docker Daemon Socket /var/run/docker.sock]
            
            subgraph Sandboxed App Containers
                C1[Friend App 1: Next.js - Port 3001]
                C2[Friend App 2: Python API - Port 3002]
                C3[Family App: React - Port 3003]
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

## 🔄 4. Data Flow & End-to-End Sequence Diagram

This sequence details the step-by-step lifecycle from authentication to dynamic deployment:

```mermaid
sequenceDiagram
    autonumber
    actor Friend as User / Friend
    participant UI as CloudPulse UI
    participant API as Control API Backend
    participant DB as Encrypted Database
    participant Git as GitHub Repository
    participant Docker as Docker Engine API
    participant Proxy as Traefik Gateway

    Friend->>UI: 1. Login (Email + Password)
    UI->>API: POST /api/auth/login
    API->>DB: Verify Bcrypt Hash
    DB-->>API: Valid Credential
    API-->>UI: Issue HttpOnly JWT Token

    Friend->>UI: 2. Input Git URL & Secrets (.env)
    UI->>API: POST /api/projects/deploy { gitUrl, envSecrets }
    API->>DB: Store encrypted secrets (AES-256-GCM)
    API->>Git: Clone repo into /var/tmp/cloudpulse/builds/<project-id>
    Git-->>API: Code downloaded safely

    API->>Docker: Execute docker build -t project-id:latest .
    Docker-->>API: Stream build logs (Sanitized secret masking)
    API->>Docker: Execute docker run -d --memory=512m --cpus=1.0 -p <dynamic_port>:3000
    Docker-->>API: Container ID returned (Status: Running)

    API->>Proxy: Register dynamic routing rule (app-name.local -> dynamic_port)
    Proxy-->>API: Rule confirmed active
    API-->>UI: Deployment Complete! URL: http://app-name.cloudpulse.local
    UI-->>Friend: Display live project status & log terminal
```

---

## 🛡️ 5. Data Safety & Security Matrix

| Layer | Security Threat | Mitigation Mechanism | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Authentication** | Brute force / Credential theft | Bcrypt + JWT Cookies | 12 Salt Rounds, HttpOnly, SameSite=Strict cookies |
| **Database Secrets** | Plaintext leaks / DB dumping | AES-256-GCM Encryption | Secrets encrypted at rest; decrypted in-memory only at container startup |
| **Git Ingestion** | Remote Code / Shell Injection | Strict Input Sanitization | Validates HTTPS git URLs, rejects arbitrary shell tokens |
| **Container Engine** | Host takeover / Resource exhaustion | Unprivileged Cgroups | CPU ceiling (`1.0`), RAM max (`512MB`), isolated network bridges |
| **Log Terminal** | Accidental API Key disclosure | Regex Secret Masking | Automatically redacts matching `.env` secret values before outputting logs |
| **Public Gateway** | Port scanning / DDoS | Cloudflare Tunnels | Outbound-only TLS connection; no open inbound router ports required |

