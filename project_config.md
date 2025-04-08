# Project Configuration (LTM)

*This file contains the stable, long-term context for the project.*
*It should be updated infrequently, primarily when core goals, tech, or patterns change.*

---

## Core Goal

To create a web-based code editor application where users can write, select the language for, and execute code snippets in multiple programming languages (initially JavaScript and C#, expanding later), viewing the output directly in the browser.

---

## Tech Stack

* **Frontend:**
    * Language: JavaScript (potentially TypeScript later)
    * Framework/Library: React (preferred) or Vue.js
    * Editor Component: CodeMirror (initially), Monaco Editor (potential enhancement)
    * Styling: CSS/SCSS or UI Library (e.g., Tailwind CSS, Material UI)
* **Backend:**
    * Language: C#
    * Framework: ASP.NET Core
    * API: REST (initially), SignalR/WebSockets (potential enhancement for real-time output)
    * Code Execution: **Docker Containers** (for security/sandboxing - HIGH PRIORITY). Initial unsafe prototyping *may* use `System.Diagnostics.Process` with extreme caution and only in development.
* **Database (Future):** PostgreSQL, SQL Server, or NoSQL option for user accounts/saved snippets.
* **Infrastructure (Future):** Cloud Provider (e.g., Azure, AWS), Docker, CI/CD pipeline.

---

## Critical Patterns & Conventions

* **Security First:** Code execution MUST be securely sandboxed using containerization (Docker) before any public exposure or use with untrusted code. Resource limits (CPU, memory, time) are mandatory.
* **Phased Development:** Follow the defined project phases, starting with an MVP and iteratively adding features and security.
* **API Design:** Start with RESTful principles for frontend-backend communication.
* **Modularity:** Design backend execution logic to be extensible for adding new languages.

---

## Project Phases (High-Level)

* **Phase 1: MVP - The Basics:** Basic editor UI (React/CodeMirror), language selection (JS/C#), backend API (ASP.NET Core), *unsafe* direct execution (`Process.Start` - dev only) for JS & C#, display output.
* **Phase 2: Enhancements & Core Improvements:** Better editor features, basic error handling, local storage saves, add 1-2 languages (e.g., Python), basic timeouts.
* **Phase 3: Security Implementation (CRITICAL):** Integrate **Docker** for secure, sandboxed code execution via ASP.NET Core backend. Implement resource limits.
* **Phase 4: Advanced Features & Polish:** User accounts, database persistence, stdin support, potential WebSocket integration, file management, more languages.
* **Phase 5: Deployment & Scalability:** Cloud deployment, scaling strategies, monitoring.

---

## Key Constraints

* **Security:** Secure execution sandboxing (via Docker) is non-negotiable for any deployment beyond local development testing.
* **User Familiarity:** Leverage user's existing knowledge of JavaScript and C#.
* **Phased Rollout:** Features and security improvements will be implemented iteratively according to the defined phases. Do not implement advanced features before the security foundation (Docker) is in place.