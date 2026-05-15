# NexusBuy 🛒

A professional, high-performance, full-stack e-commerce application built with a modern **React** frontend and powered by a completely containerized local backend ecosystem running on **Docker**.

This project operates completely independent of public cloud dependencies by deploying an isolated sandbox environment using an open-source API gateway (**FreeAPI/ApiHub**), backed by **MongoDB** for persistent storage and **Redis** for caching, running natively on **Debian 13 (Trixie)**.

---

## 🏗️ Architecture & Technical Stack

### Frontend Architecture

- **Framework:** React (Vite-powered for fast-refresh and optimized bundling)
- **UI Architecture:** Styled using **Tailwind CSS** combined with atomic components from **shadcn/ui** (built on Radix UI primitives)
- **Icons:** Highly consistent typography and vector assets using **Lucide React**
- **State Management & Routing:** Native context and client hooks fetching from isolated local environment configurations

### Backend & Infrastructure (Containerized via Docker Compose)

- **API Engine:** FreeAPI / ApiHub (Node.js & Express-based production-grade mock/real application endpoint cluster)
- **Primary Database:** MongoDB
- **Caching Layer:** Redis
- **Operations & Management:** Portainer CE (Visual container orchestrated monitoring interface)

---

## 🔄 Core Application Workflow

The application leverages a deterministic four-stage lifecycle designed to simulate enterprise e-commerce pipelines:

[ Exploration ] ──( Browse Products )──> Guest Phase
│
[ Identification ] ──( Login / Get JWT )──> Secured Session Established
│
[ Selection ] ──( Cart Operations )──> Token Attached to Request Headers
│
[ Conversion ] ──( Checkout/Orders )──> Cart Cleared / Transaction Logged

```

1. **Stage 1: Exploration (Guest Phase):** Completely public context. Users fetch unstructured catalogs (`GET /ecommerce/categories`) and full product grids (`GET /ecommerce/products`) without permissions.
2. **Stage 2: Identification (Authentication Pivot):** Users register or log in. The backend issues a persistent JSON Web Token (JWT). The frontend captures this and injects it into every downstream request inside the headers (`Authorization: Bearer <Token>`).
3. **Stage 3: Selection (State-Locked Cart):** Token authentication separates shared public catalogs into user-specific sessions. Adding components (`POST /ecommerce/cart/{productId}`) isolates data pipelines per unique authentication token.
4. **Stage 4: Conversion (The Order Transition):** Moving transactional cart payloads into immutable ledger arrays (`POST /ecommerce/orders`).

```

### Deploying the Backend Cluster

1. Clone the core API architecture engine repository:
   ```bash
   git clone [https://github.com/hiteshchoudhary/apihub.git](https://github.com/hiteshchoudhary/apihub.git)
   cd apihub
   ```
2. Initialize default application parameters:
   ```bash
   cp .env.sample .env
   ```
3. Update the `docker-compose.yml` configurations to ensure automatic infrastructure recovery during computer boot sequences by adding persistent restart flags:
   ```yaml
   services:
     apihub:
       restart: unless-stopped
       ports:
         - "8080:8080"
     mongodb:
       restart: unless-stopped
       ports:
         - "27017:27017"
     redis:
       restart: unless-stopped
   ```
4. Fire up the backend stack globally in detached mode:
   ```bash
   docker compose up -d
   ```

---

## 🧬 Database Hydration & Seeding

By default, the deployed MongoDB instance will be empty. To prevent running individual manual definitions, execute the API's specialized seeding engine to instantly populate structural data definitions (Categories, Products, Stocks, Base Image URIs):

```bash
curl -X POST http://localhost:8080/api/v1/seed/ecommerce
```

_Note: Unlike the public shared instance, your local database architecture persists. Data will survive `docker stop`, system crashes, and reboots because configurations are saved directly to local storage disks through mounted Docker volumes. Data is only wiped if explicitly commanded using `docker compose down -v`._

---

### API Logging & Execution Audit

Track standard API routes hitting the infrastructure directly inside your terminal workspace:

```bash
docker compose logs -f apihub
```

---

## ⚙️ Frontend Integration & Design Best Practices

### Linking React to Local Hostings

In your frontend `.env` configuration file, redirect the application framework to route calls locally instead of hitting public cloud clusters:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

### Learning OutComes

1. Always Plan and create bluprint of app and its schema

2. Data Binding = Always bind your context api to your storage in one place

3. Know to workflow or data flow of app

4. Use Layouts efficently

5. Follow DRY principle

6. Donot use useEffect hook unessary it cause component to re-render

7. Learned about component render and lifecycle
8. use hooks if there are too many states
9. Learned about -- Context API, React Router, custom hooks, layouts, State Management, How react render the component, how useEffect works, Controlled and Uncontrolled form, How to use docker, About REST API, CORS.
