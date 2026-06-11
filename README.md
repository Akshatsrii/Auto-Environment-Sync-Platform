<div align="center">

# 🔄 DevSync

### Auto Environment Sync Platform

**Eliminate environment setup friction. Clone, sync, and code — instantly.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Planned-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Academic-blue?style=flat-square)](#license)

[Features](#-features) · [Architecture](#-system-architecture) · [Getting Started](#-getting-started) · [Screens](#-screens) · [Roadmap](#-roadmap)

</div>

---

## 🧩 The Problem

Every developer has been there — you clone a repository, run the project, and immediately hit a wall:

```
Error: Node version mismatch. Required: 18.x, Found: 16.x
MongooseError: MongoDB connection refused
Error: Missing environment variable REDIS_URL
```

DevSync eliminates this friction by **automatically analyzing repositories** and generating environment-ready configurations before you even write a line of code.

---

## 🌟 Features

| Feature | Description |
|---|---|
| 🔍 **Repository Analysis** | Deep scan of GitHub repos to detect stack, dependencies, and config needs |
| ⚙️ **Environment Detection** | Identifies Node.js versions, MongoDB, Redis, and Docker requirements |
| 🩺 **Health Monitoring** | Scores your environment's readiness and flags missing components |
| 🔀 **Environment Comparison** | Side-by-side diff of multiple environments to catch version mismatches |
| 📋 **Activity Logs** | Full scan history with detailed environment reports |
| 🔗 **GitHub Integration** | Connects directly to your GitHub account for seamless repo access |

---

## 🏗 System Architecture

The diagram below shows the high-level architecture of DevSync — from the user's browser to GitHub and back.

```
┌─────────────────────────────────────────────────────────────────┐
│                        DevSync Platform                         │
│                                                                 │
│   ┌──────────────────────┐        ┌──────────────────────────┐  │
│   │    React Frontend    │◄──────►│     Node.js Backend      │  │
│   │                      │  REST  │      (Planned)           │  │
│   │  • Dashboard         │  API   │  • Express.js            │  │
│   │  • Sync              │        │  • JWT Auth              │  │
│   │  • Environments      │        │  • Analysis Engine       │  │
│   │  • Compare           │        │  • Config Generator      │  │
│   │  • Logs              │        │                          │  │
│   │  • Settings          │        └──────────┬───────────────┘  │
│   └──────────────────────┘                   │                  │
│                                              │                  │
│                              ┌───────────────┼──────────────┐   │
│                              │               │              │   │
│                       ┌──────▼──────┐ ┌──────▼──────┐      │   │
│                       │  MongoDB    │ │ GitHub API  │      │   │
│                       │  (Storage)  │ │ (Repos)     │      │   │
│                       └─────────────┘ └─────────────┘      │   │
│                                                             │   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Core Workflows

### 1. Repository Analysis Flow

```mermaid
flowchart TD
    A([👤 Developer]) --> B[Paste GitHub Repo URL]
    B --> C{Valid GitHub URL?}
    C -- No --> D[❌ Show URL Error]
    D --> B
    C -- Yes --> E[Fetch Repository Metadata]
    E --> F[Parse File Structure]
    F --> G{Detect Package Files}
    G --> G1[package.json]
    G --> G2[requirements.txt]
    G --> G3[Dockerfile]
    G --> G4[docker-compose.yml]
    G1 & G2 & G3 & G4 --> H[Extract Dependency List]
    H --> I{Detect Services}
    I --> I1[Node.js Version]
    I --> I2[MongoDB Config]
    I --> I3[Redis Config]
    I --> I4[Docker Settings]
    I1 & I2 & I3 & I4 --> J[Calculate Health Score]
    J --> K[Generate Environment Report]
    K --> L[Save to Activity Logs]
    L --> M([✅ Display Results on Dashboard])
```

---

### 2. Environment Health Check Flow

```mermaid
flowchart LR
    A[Start Health Check] --> B[Load Environment Config]
    B --> C{Node.js\nVersion Match?}
    C -- ✅ Pass --> D{MongoDB\nReachable?}
    C -- ❌ Fail --> C1[Flag: Version Mismatch\n-15 pts]
    C1 --> D
    D -- ✅ Pass --> E{Redis\nConfigured?}
    D -- ❌ Fail --> D1[Flag: DB Unavailable\n-20 pts]
    D1 --> E
    E -- ✅ Pass --> F{Env Variables\nPresent?}
    E -- ⚠️ Skip --> E1[Warn: Optional Service\n-5 pts]
    E1 --> F
    F -- ✅ Pass --> G{Docker\nValid?}
    F -- ❌ Fail --> F1[Flag: Missing .env\n-25 pts]
    F1 --> G
    G --> H[Compute Final Score]
    H --> I{Score?}
    I -- 90–100 --> J[🟢 Ready]
    I -- 70–89  --> K[🟡 Warnings]
    I -- 0–69   --> L[🔴 Critical Issues]
```

---

### 3. User Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React Frontend
    participant API as Express Backend
    participant DB as MongoDB
    participant GH as GitHub OAuth

    User->>UI: Click "Login with GitHub"
    UI->>GH: Redirect to GitHub OAuth
    GH-->>User: GitHub consent screen
    User->>GH: Approve access
    GH-->>UI: Return auth code
    UI->>API: POST /auth/github {code}
    API->>GH: Exchange code for access token
    GH-->>API: Return access_token
    API->>DB: Upsert user record
    DB-->>API: User object
    API-->>UI: Return JWT + user profile
    UI->>UI: Store JWT in memory
    UI-->>User: Redirect to Dashboard ✅
```

---

### 4. Environment Comparison Flow

```mermaid
flowchart TD
    A[Select Environment A] --> C[Load Configs]
    B[Select Environment B] --> C
    C --> D[Parse Both Configs]
    D --> E{Compare\nNode Versions}
    D --> F{Compare\nDependencies}
    D --> G{Compare\nServices}
    D --> H{Compare\nEnv Variables}
    E & F & G & H --> I[Generate Diff Report]
    I --> J{Conflicts\nFound?}
    J -- Yes --> K[🔴 Highlight Conflicts]
    J -- No --> L[🟢 Mark Compatible]
    K & L --> M[Display Side-by-Side Comparison]
    M --> N[Export Comparison Report]
```

---

## 📁 Project Structure

```
devsync-frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── routes/
│   │   └── AppRoutes.jsx          # Central route definitions
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx         # Shared shell with Sidebar
│   │
│   ├── components/
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   └── StatsCard.jsx          # Reusable metric card
│   │
│   ├── pages/
│   │   ├── Login.jsx              # GitHub OAuth entry point
│   │   ├── Dashboard.jsx          # Overview & health scores
│   │   ├── Sync.jsx               # Repo URL input & analysis
│   │   ├── Environments.jsx       # Detected env configurations
│   │   ├── Compare.jsx            # Side-by-side env diff
│   │   ├── Logs.jsx               # Scan history & reports
│   │   └── Settings.jsx           # Integrations & preferences
│   │
│   ├── hooks/                     # Custom React hooks (planned)
│   ├── utils/                     # Helper functions (planned)
│   │
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global styles (Tailwind)
│
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠 Tech Stack

### Frontend (Current)

| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI |
| **Vite** | Lightning-fast dev server & bundler |
| **Tailwind CSS** | Utility-first styling |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |

### Backend (Planned)

| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | REST API server |
| **MongoDB** | User data & scan history |
| **JWT** | Stateless authentication |
| **GitHub REST API** | Repository access & metadata |

### Infrastructure (Future)

| Technology | Purpose |
|---|---|
| **Redis** | Caching scan results |
| **Docker** | Containerized deployment |
| **AI/LLM** | Smart environment recommendations |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Riyaban583/Auto-Environment-Sync-Platform.git
cd devsync-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

```bash
cp .env.example .env
# Edit .env with your GitHub OAuth credentials
```

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🖥 Screens

| Screen | Description |
|---|---|
| **Login** | GitHub OAuth sign-in with clean landing UI |
| **Dashboard** | Overview of recent scans, health scores, and stats |
| **Repository Sync** | Paste a GitHub URL to trigger environment analysis |
| **Environments** | View all detected environment configurations |
| **Environment Comparison** | Side-by-side diff of two environments |
| **Activity Logs** | Full history of repository scans and reports |
| **Settings** | Manage GitHub integration and notification preferences |

---

## 🗺 Roadmap

```
Phase 1 — Foundation (Current)        Phase 2 — Backend Integration
──────────────────────────────         ──────────────────────────────
 ✅ React frontend scaffold             🔲 Node.js + Express API
 ✅ Routing & layout system             🔲 MongoDB data layer
 ✅ Dashboard UI                        🔲 GitHub OAuth
 ✅ Sync, Compare, Logs, Settings       🔲 Repository analysis engine
 ✅ Stats cards & sidebar               🔲 JWT authentication

Phase 3 — Intelligence                 Phase 4 — Scale & Collaboration
──────────────────────────────         ──────────────────────────────
 🔲 Redis caching layer                 🔲 Team collaboration features
 🔲 Docker Compose generation           🔲 Cloud deployment support
 🔲 AI-based recommendations           🔲 Real-time monitoring
 🔲 Auto env variable detection         🔲 Webhook integrations
 🔲 Repository auto-scan on push        🔲 VS Code extension
```


## 📄 License

This project is developed for **educational, academic, and hackathon** purposes.

---

<div align="center">

Made with ❤️ by the DevSync Team

*Stop configuring. Start coding.*

</div>
