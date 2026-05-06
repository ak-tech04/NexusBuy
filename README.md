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

````
```text?code_stdout&code_event_index=2
README.md generated successfully.

````

[ Exploration ] ──( Browse Products )──> Guest Phase
│
[ Identification ] ──( Login / Get JWT )──> Secured Session Established
│
[ Selection ] ──( Cart Operations )──> Token Attached to Request Headers
│
[ Conversion ] ──( Checkout/Orders )──> Cart Cleared / Transaction Logged

````

1. **Stage 1: Exploration (Guest Phase):** Completely public context. Users fetch unstructured catalogs (`GET /ecommerce/categories`) and full product grids (`GET /ecommerce/products`) without permissions.
2. **Stage 2: Identification (Authentication Pivot):** Users register or log in. The backend issues a persistent JSON Web Token (JWT). The frontend captures this and injects it into every downstream request inside the headers (`Authorization: Bearer <Token>`).
3. **Stage 3: Selection (State-Locked Cart):** Token authentication separates shared public catalogs into user-specific sessions. Adding components (`POST /ecommerce/cart/{productId}`) isolates data pipelines per unique authentication token.
4. **Stage 4: Conversion (The Order Transition):** Moving transactional cart payloads into immutable ledger arrays (`POST /ecommerce/orders`).

---




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

## 🖥️ Operational Dashboards & Real-Time Tracking

To ensure explicit monitoring of operational requests, visual mapping, and storage validation, link these tools to your local instance loops:

### 1. Unified Visual Container Manager (Portainer CE)

Spin up Portainer to monitor resource telemetry (RAM/CPU spikes) and extract instant backend container stack stdout traces without standard CLI logging syntax:

```bash
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

Access via HTTPS: `https://localhost:9443` (Pass standard self-signed security alerts).

### 2. Direct Database Records Inspections

- **Tooling Option A (Standalone GUI):** Download and install **MongoDB Compass** via `.deb` packages, mapping the base connection address string directly to: `mongodb://localhost:27017`
- **Tooling Option B (IDE Integration):** Install the official **MongoDB for VS Code** application extension directly to track active database schemas side-by-side with your React development environment.

### 3. API Logging & Execution Audit

Track standard API routes hitting the infrastructure directly inside your terminal workspace:

```bash
docker compose logs -f apihub
```

---

## ⚙️ Frontend Integration & Design Best Practices

### Linking React to Local Hostings

In your frontend `.env` configuration file, redirect the application framework to route calls locally instead of hitting public cloud clusters:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Component Design Strategies (shadcn/ui Customizations)

When dealing with pre-downloaded shacdn UI components requiring functional changes (e.g., embedding fixed Lucide button action icons cleanly), prioritize the **Direct Modification/Ownership Pattern** over loose component wrappers to enforce rigorous global design systems consistency:

```tsx
// Modifying @/components/ui/button.tsx directly to create architectural consistency
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, leftIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn("inline-flex items-center...", className)}
      >
        {leftIcon && (
          <span className="mr-2 inline-block alignment-slot">{leftIcon}</span>
        )}
        {children}
      </button>
    );
  },
);
```

---

