<div align="center">

<img src="https://res.cloudinary.com/dgmk3fhuz/image/upload/v1772253701/driveaway_k2zbak.png" alt="DRIVEAWAY" width="280" />

# DRIVEAWAY

### A Production-Grade Car Rental Marketplace

*Full-stack platform with multi-role access, integrated payments, automated booking lifecycle, and containerized deployment*

&nbsp;

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-driveaway--jhee.onrender.com-1E3A8A?style=for-the-badge)](https://driveaway.charantejadev.com)

&nbsp;

<table>
<tr>
<td align="center"><strong>Backend</strong></td>
<td align="center"><strong>Frontend</strong></td>
<td align="center"><strong>Database & Cache</strong></td>
<td align="center"><strong>DevOps</strong></td>
</tr>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white" alt="Java 21" /><br/>
<img src="https://img.shields.io/badge/Spring_Boot-4.0.2-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot" /><br/>
<img src="https://img.shields.io/badge/Spring_Security-7.3.1-6DB33F?logo=springsecurity&logoColor=white" alt="Spring Security" /><br/>
<img src="https://img.shields.io/badge/Razorpay-1.4.8-0C2451?logo=razorpay&logoColor=white" alt="Razorpay" />
</td>
<td align="center">
<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" /><br/>
<img src="https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white" alt="Vite" /><br/>
<img src="https://img.shields.io/badge/MUI-7.3-007FFF?logo=mui&logoColor=white" alt="MUI" /><br/>
<img src="https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
</td>
<td align="center">
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" /><br/>
<img src="https://img.shields.io/badge/Redis-Cache-DC382D?logo=redis&logoColor=white" alt="Redis" /><br/>
<img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" /><br/>
<img src="https://img.shields.io/badge/Brevo-Email-0B996E?logo=sendinblue&logoColor=white" alt="Brevo" />
</td>
<td align="center">
<img src="https://img.shields.io/badge/Docker-Multi--Platform-2496ED?logo=docker&logoColor=white" alt="Docker" /><br/>
<img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white" alt="CI/CD" /><br/>
<img src="https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?logo=nginx&logoColor=white" alt="Nginx" /><br/>
<img src="https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=white" alt="Render" />
</td>
</tr>
</table>

</div>

---

## 📑 Table of Contents

- [Why DRIVEAWAY](#-why-driveaway)
- [System Architecture](#-system-architecture)
- [Features at a Glance](#-features-at-a-glance)
- [Tech Stack Deep Dive](#-tech-stack-deep-dive)
- [Booking Lifecycle](#-booking-lifecycle)
- [API Reference](#-api-reference)
- [Database Design](#-database-design)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [CI/CD & Deployment](#-cicd--deployment)
- [Technical Highlights](#-technical-highlights)
- [Author](#-author)

---

## 🎯 Why DRIVEAWAY

DRIVEAWAY is not just another CRUD app — it's a **production-ready marketplace** that solves real-world problems with enterprise-grade patterns:

| Challenge | Solution |
|-----------|----------|
| **Multi-tenant access** | Three-role RBAC system (Customer, Dealer, Admin) with method-level `@PreAuthorize` guards |
| **Secure payments** | End-to-end Razorpay integration with server-side order creation and HMAC SHA-256 signature verification |
| **Stale booking cleanup** | Cron-based scheduler auto-expires unanswered bookings and transitions statuses at midnight |
| **Scalable deployment** | Multi-stage Docker builds, Docker Compose orchestration, CI/CD to Docker Hub + Render |
| **Performance** | Redis caching (30s TTL) for car listings, MongoDB compound indexes, Nginx static file serving |
| **Cross-origin auth** | Dual JWT extraction (HttpOnly cookies + Bearer header), dynamic SameSite policy |

---

## 🏗 System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│  CLIENT LAYER                                                            │
│  React 19 SPA · Vite · MUI 7 + Tailwind CSS 4 · Axios                   │
│  Port 3000 (dev) / 80 (prod via Nginx)                                   │
└──────────────────────────┬───────────────────────────────────────────────┘
                           │  REST / JSON
                           │  JWT (HttpOnly Cookie + Bearer Header)
                           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER                                                       │
│  Spring Boot 4.0.2 · Java 21 · Spring Security 7.3                      │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Controllers │→│   Services   │→│ Repositories  │→│  MongoDB Atlas │  │
│  │ (4 REST)   │  │ (12+ impls)  │  │ (7 + custom) │  │  (7 collections│  │
│  └────────────┘  └──────┬───────┘  └──────────────┘  └───────────────┘  │
│                         │                                                │
│  ┌──────────────────────┼──────────────────────────────────────────────┐ │
│  │  INTEGRATIONS        │                                              │ │
│  │  ◆ Razorpay ─ Payment orders + signature verification              │ │
│  │  ◆ Redis ─ Car listing cache (30s TTL, auto-eviction)              │ │
│  │  ◆ Cloudinary ─ Car images & profile avatars                       │ │
│  │  ◆ Brevo SMTP ─ Booking notification emails (Thymeleaf templates)  │ │
│  │  ◆ BookingScheduler ─ Cron: expire pending / activate / complete   │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│  Port 2006                                                               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features at a Glance

<table>
<tr>
<td width="33%" valign="top">

### 👤 Customer
- Browse cars from verified dealers
- Book with flexible date ranges
- Pay securely via **Razorpay** checkout
- Track booking status in real-time
- Cancel approved bookings
- Submit car **reviews & star ratings**
- Apply to become a dealer
- Stats dashboard (total, upcoming, completed, cancelled)

</td>
<td width="33%" valign="top">

### 🏪 Dealer
- Apply with GST & business details
- Add cars with images (Cloudinary upload)
- Select from **51 supported brands** with logos
- Set daily rental prices
- Approve / reject booking requests
- Manage vehicle inventory
- Analytics dashboard (cars, bookings, revenue, pending)

</td>
<td width="33%" valign="top">

### 🛡️ Admin
- Approve or reject dealer applications
- Monitor platform-wide stats (users, dealers, vehicles, applications)
- Manage all users (filterable table)
- Oversee booking transactions
- Role-change authority (Customer → Dealer)

</td>
</tr>
</table>

---

## 🛠 Tech Stack Deep Dive

### Backend

| Layer | Technology | Details |
|-------|-----------|---------|
| **Runtime** | Java 21 + Spring Boot 4.0.2 | Latest LTS with virtual threads support |
| **Security** | Spring Security 7.3 + JJWT 0.13 | Custom `JwtFilter` with cookie & header extraction, `@PreAuthorize` RBAC |
| **Database** | MongoDB Atlas + Spring Data | 7 collections, compound indexes, `$lookup` aggregation pipelines |
| **Cache** | Redis (Lettuce) | 30s TTL car listing cache with `@Cacheable` / `@CacheEvict` |
| **Payments** | Razorpay Java SDK 1.4.8 | Server-side order creation, HMAC SHA-256 signature verification |
| **Storage** | Cloudinary 1.39 | Car images (`cars/{carId}/`) and profile avatars (`avatars/`) |
| **Email** | Brevo API + Thymeleaf | HTML booking notification templates via SMTP REST |
| **Scheduler** | `@Scheduled` cron | Pending expiry (every 5 min), lifecycle transitions (midnight) |
| **API Docs** | Springdoc OpenAPI 3.0.1 | Swagger UI (dev mode) |

### Frontend

| Layer | Technology | Details |
|-------|-----------|---------|
| **Framework** | React 19.2 + Vite 7.3 | Fast HMR, optimized production builds |
| **Styling** | MUI 7.3 + Tailwind CSS 4.2 + Emotion | Custom theme (Manrope + Source Sans 3 typography), responsive breakpoints |
| **Routing** | React Router 7.13 | Nested layouts, `ProtectedRoute` guards |
| **State** | Context API + localStorage | `AuthProvider` with role, email, userId, token |
| **HTTP** | Axios with interceptors | Auto 401 redirect, `withCredentials` for cookies |
| **UI Components** | Radix UI, Embla Carousel, Lucide Icons, Sonner | Accessible dialogs, image carousels, toast notifications |
| **Date Handling** | Day.js + MUI X DatePickers 8.27 | Booking date range selection |

### Infrastructure

| Layer | Technology | Details |
|-------|-----------|---------|
| **Containers** | Docker (multi-stage builds) | Backend: `eclipse-temurin:21-jdk` → slim runtime · Frontend: `node:22-alpine` → `nginx:alpine` |
| **Orchestration** | Docker Compose | Bridge network, service dependencies, port mapping |
| **CI/CD** | GitHub Actions | Multi-platform builds (`linux/amd64` + `linux/arm64`), push to Docker Hub, deploy to Render |
| **Dependency Updates** | Dependabot | Weekly automated PRs for npm + Maven |
| **Hosting** | Render | Continuous deployment via Render API hooks |

---

## 🔄 Booking Lifecycle

```
Customer books a car
        │
        ▼
    ┌────────┐   5 min timeout    ┌─────────┐
    │PENDING │──────────────────→ │ EXPIRED  │  (car unlocked)
    └───┬────┘                    └──────────┘
        │
   Dealer decides
   ┌────┴─────┐
   ▼          ▼
┌────────┐  ┌──────────┐
│APPROVED│  │ REJECTED │  (car unlocked)
└───┬────┘  └──────────┘
    │
    │  Customer cancels ──→ CANCELLED (car unlocked)
    │
    ▼
 Razorpay Payment
    │
    ▼
┌────────┐   start date    ┌────────┐   end date    ┌───────────┐
│  PAID  │────────────────→│ ACTIVE │──────────────→│ COMPLETED │
└────────┘  (midnight cron) └────────┘ (midnight cron)└─────┬─────┘
                                                           │
                                                    Customer review
                                                           │
                                                           ▼
                                                     ┌──────────┐
                                                     │ REVIEWED │
                                                     └──────────┘
```

> **Automated transitions**: A `@Scheduled` cron job runs every 5 minutes to expire stale `PENDING` bookings, and at midnight to activate/complete bookings based on their dates.

---

## 📡 API Reference

All protected endpoints require a valid JWT (sent as an `HttpOnly` cookie or `Authorization: Bearer` header).

<details>
<summary><strong>🔓 Authentication — <code>/api/user</code></strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login → JWT set as HttpOnly cookie |
| `GET` | `/awake` | Health check / keep-alive |

**Login Response:**
```json
{
  "token": "eyJhbGciOi...",
  "loginDTO": {
    "email": "user@example.com",
    "role": "CUSTOMER",
    "userId": "64abc123..."
  }
}
```
</details>

<details>
<summary><strong>👤 Customer — <code>/api/customer</code> &nbsp; <code>@PreAuthorize("hasRole('CUSTOMER')")</code></strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/{email}` | Get user profile |
| `GET` | `/get/cars` | List available cars *(cached)* |
| `POST` | `/add/booking` | Create a booking |
| `GET` | `/bookings` | Get customer's bookings (enriched with dealer/car info) |
| `POST` | `/cancel/booking?bookingId={id}` | Cancel an approved booking |
| `POST` | `/create/order` | Create Razorpay payment order |
| `POST` | `/verify` | Verify Razorpay payment (HMAC SHA-256) |
| `POST` | `/add` | Submit dealer application |
| `GET` | `/status/{id}` | Check dealer application status |
| `POST` | `/profile` | Update profile (multipart: image upload) |
| `POST` | `/review` | Submit car review & star rating |
| `GET` | `/reviews/{carId}` | Get reviews for a car |

</details>

<details>
<summary><strong>🏪 Dealer — <code>/api/dealer</code> &nbsp; <code>@PreAuthorize("hasRole('DEALER')")</code></strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/add/car` | Add new car (multipart: JSON + images) |
| `GET` | `/cars/{dealerId}` | Get dealer's car inventory |
| `PUT` | `/update/car` | Update car details (multipart) |
| `PUT` | `/update/car-images?carId={id}` | Replace car images |
| `GET` | `/get/bookings?dealerId={id}` | Get dealer's bookings |
| `PUT` | `/approve/booking/{bookingId}?approval={bool}` | Approve or reject a booking |

</details>

<details>
<summary><strong>🛡️ Admin — <code>/api/admin</code> &nbsp; <code>@PreAuthorize("hasRole('ADMIN')")</code></strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/all` | List all users (excludes admins) |
| `GET` | `/applications` | Get all dealer applications |
| `POST` | `/approve/{id}?approval={bool}` | Approve or reject dealer application |

</details>

---

## 🗃 Database Design

**7 MongoDB collections** with strategic indexing for query performance:

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  users   │──1:1─→│ dealers  │──1:N─→│   cars   │
│          │       │          │       │          │
│ email ⚡ │       │ gstIn ⚡ │       │ dealerId⚡│
│ role     │       │ status   │       │ status   │
└──────┬───┘       └──────────┘       └────┬─────┘
       │                                    │
       │ 1:N                           1:N  │
       ▼                                    ▼
┌──────────────────┐              ┌──────────────┐
│    bookings      │──────1:1────→│   orders     │
│                  │              │ (Razorpay)   │
│ carId+status ⚡  │              │              │
│ customerId    ⚡  │              └──────────────┘
└──────┬───────────┘
       │ 1:1
       ▼
┌──────────────┐         ┌─────────────────────┐
│   reviews    │         │ dealer_applications  │
│              │         │                      │
│ bookingId    │         │ userId ⚡ (unique)    │
│ starRating   │         │ approvalStatus       │
└──────────────┘         └─────────────────────┘

⚡ = indexed field
```

<details>
<summary><strong>View collection schemas</strong></summary>

**users** — `userEmail` (unique), `password` (encrypted), `role` (CUSTOMER / DEALER / ADMIN), `profileUrl`, `createdAt`

**dealers** — `userId`, `dealershipName`, `gstIn` (unique), `location`, `approvalStatus`, `createdAt`

**cars** — `dealerId` (indexed), `brand`, `model`, `year`, `pricePerDay`, `carImages[]` (Cloudinary URLs), `carStatus`, `rating`, `createdAt`

**bookings** — `carId` + `status` (compound unique), `customerId` + `createdAt` (compound), `totalAmount`, `startDate`, `endDate`, `approvedAt`

**orders** — `_id` (Razorpay order ID), `amount` (paise), `customer_id`, `booking_id`, `status`

**reviews** — `bookingId`, `carId`, `customerId`, `review`, `starRating`, `createdAt`

**dealer_applications** — `userId` (unique), `dealerShipName`, `gstIn`, `approvalStatus` (PENDING / APPROVED / REJECTED)

</details>

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Java | 21+ |
| Node.js | 18+ |
| Docker & Docker Compose | Latest |
| MongoDB Atlas | Free tier works |

### 1. Clone & Configure

```bash
git clone https://github.com/CharanTeja-6825/DRIVEAWAY.git
cd DRIVEAWAY
```

**Backend** — set environment variables or edit `DRIVEAWAY-BACKEND/src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=${DB_URL}
spring.data.mongodb.database=${DB_NAME}
jwt.secret=${JWT_SECRET}
razorpay.keyId=${RZP_KEY}
razorpay.secret=${RZP_SECRET}
spring.data.redis.url=${REDIS_URL}
cloudinary.cloud=${CLOUDINARY_CLOUD}
cloudinary.key=${CLOUDINARY_KEY}
cloudinary.secret=${CLOUDINARY_SECRET}
spring.brevo.api=${BREVO_API}
spring.client=${CLIENT_API}
```

**Frontend** — create `DRIVEAWAY-FRONTEND/.env`:

```env
VITE_API_URL=http://localhost:2006
VITE_RAZORPAY_KEY=rzp_test_xxxxx
```

### 2. Run Locally

```bash
# Backend (terminal 1)
cd DRIVEAWAY-BACKEND
./mvnw clean install -DskipTests
./mvnw spring-boot:run            # → http://localhost:2006

# Frontend (terminal 2)
cd DRIVEAWAY-FRONTEND
npm install --legacy-peer-deps
npm run dev                        # → http://localhost:3000
```

### 3. Or Use Docker

```bash
docker-compose up -d
# Frontend → http://localhost:3000
# Backend  → http://localhost:2025
```

---

## 📁 Project Structure

```
DRIVEAWAY/
│
├─ DRIVEAWAY-BACKEND/                       # Spring Boot REST API
│  ├─ src/main/java/com/driveaway/
│  │  ├─ controller/                        # 4 REST controllers (User, Customer, Dealer, Admin)
│  │  ├─ service/                           # 12+ service interfaces & implementations
│  │  ├─ repository/                        # 7 repos + custom impls with MongoTemplate
│  │  ├─ entity/                            # 7 MongoDB document models
│  │  ├─ dto/                               # Java Records for API data transfer
│  │  ├─ enumerations/                      # Roles, BookingStatus, Approval
│  │  ├─ config/                            # Security, JWT, Redis, Razorpay, Cloudinary, Swagger
│  │  ├─ scheduler/                         # BookingScheduler (cron-based lifecycle)
│  │  ├─ events/ & listeners/               # Spring event-driven email notifications
│  │  └─ exceptions/                        # Custom exception classes
│  ├─ src/main/resources/
│  │  ├─ application.properties             # Environment-driven config
│  │  └─ templates/booking-creation.html    # Thymeleaf email template
│  ├─ backend.Dockerfile                    # Multi-stage: JDK 21 build → JDK 21 runtime
│  └─ pom.xml
│
├─ DRIVEAWAY-FRONTEND/                      # React 19 SPA
│  ├─ src/
│  │  ├─ features/                          # Feature-based modules
│  │  │  ├─ auth/                           # Login & Registration
│  │  │  ├─ customer/                       # Dashboard, Cars, Bookings, Payment, Reviews
│  │  │  ├─ dealer/                         # Dashboard, AddCar, CarManagement, Bookings
│  │  │  ├─ admin/                          # Dashboard, UserManagement, DealerApprovals
│  │  │  ├─ cars/ & bookings/               # Shared service layers
│  │  ├─ app/                               # Navbar, Home, ProtectedRoute
│  │  ├─ shared/                            # Hooks (AuthProvider, useLogout), constants, utils
│  │  ├─ theme/                             # MUI theme (colors, typography, component overrides)
│  │  ├─ api/axios.js                       # Axios instance + 401 interceptor
│  │  └─ components/ui/                     # Radix-based UI primitives
│  ├─ nginx.conf                            # SPA routing (try_files → index.html)
│  ├─ frontend.Dockerfile                   # Multi-stage: Node 22 build → Nginx Alpine
│  └─ package.json
│
├─ .github/
│  ├─ workflows/docker-publish.yml          # CI/CD: build, push, deploy
│  └─ dependabot.yml                        # Weekly npm + Maven updates
├─ docker-compose.yml                       # Multi-container orchestration
└─ LICENSE
```

---

## ⚙ CI/CD & Deployment

```
 Push to main / Manual trigger
          │
          ▼
 ┌─ GitHub Actions ──────────────────────────────────┐
 │  1. Checkout code                                  │
 │  2. Set up Docker Buildx (multi-platform)          │
 │  3. Login to Docker Hub                            │
 │  4. Build & push backend image                     │
 │     → eclipse-temurin:21-jdk · linux/amd64+arm64   │
 │     → Tagged: latest + commit SHA                  │
 │  5. Build & push frontend image                    │
 │     → node:22-alpine → nginx:alpine                │
 │     → Build args: VITE_API_URL, VITE_RAZORPAY_KEY  │
 │  6. Deploy to Render (API hook trigger)            │
 └────────────────────────────────────────────────────┘
          │
          ▼
 ┌─ Production (Render) ─┐
 │  Backend  → Port 2006  │
 │  Frontend → Port 80    │
 └────────────────────────┘
```

**Dependabot** runs weekly to keep npm and Maven dependencies updated with automated PRs.

---

## 🧠 Technical Highlights

> A summary of the engineering decisions and patterns that power DRIVEAWAY.

### Backend Engineering

| Pattern | Implementation |
|---------|----------------|
| **Clean Architecture** | Controller → Service → Repository with DTOs (Java Records) for decoupled data transfer |
| **JWT Authentication** | Custom `JwtFilter` extracts tokens from HttpOnly cookies *or* `Authorization` header; `@PreAuthorize` enforces RBAC |
| **MongoDB Aggregation** | `$lookup` pipelines join bookings with dealer + car data; `BookingRepositoryCustom` uses `MongoTemplate` for atomic bulk updates |
| **Payment Security** | Full Razorpay lifecycle: server-side order creation → client overlay → HMAC SHA-256 signature verification → atomic status update |
| **Event-Driven Emails** | `BookingCreatedEvent` → `BookingCreatedListener` → Thymeleaf HTML template → Brevo SMTP API |
| **Scheduled Automation** | Cron-based `BookingScheduler`: expire pending (every 5 min), activate on start date, complete on end date (midnight) |
| **Cache Strategy** | Redis `@Cacheable` on car listings (30s TTL), `@CacheEvict` on add/update/delete; custom `Instant` serialization for ISO-8601 |
| **Custom Repositories** | `CarRepositoryCustom` + `BookingRepositoryCustom` with `MongoTemplate` for complex queries beyond Spring Data defaults |

### Frontend Engineering

| Pattern | Implementation |
|---------|----------------|
| **Feature-Based Modules** | `features/{auth,customer,dealer,admin}` — each with pages, components, and service layers |
| **Role-Based UI** | `ProtectedRoute` HOC with role validation; dynamic `Navbar` menu items; role-specific dashboards |
| **Custom MUI Theme** | Branded palette (`#1E3A8A` primary, `#D97706` accent), Manrope + Source Sans 3 typography, 12px border radius |
| **Payment UX** | Seamless Razorpay overlay: create order → open modal → verify signature → update UI |
| **Inline Validation** | On-blur validation with real-time error clearing; form-wide validation before submit |
| **Responsive Design** | MUI Grid breakpoints (`xs`/`sm`/`md`) + Tailwind utilities; mobile hamburger navigation |
| **Auth State** | `AuthProvider` Context + localStorage persistence; Axios interceptor auto-redirects on 401 |

### DevOps & Security

| Practice | Implementation |
|----------|----------------|
| **Multi-Stage Builds** | Separate build and runtime stages minimize image size and attack surface |
| **Multi-Platform Images** | `linux/amd64` + `linux/arm64` for broad deployment compatibility |
| **Environment Isolation** | All secrets via environment variables; zero hardcoded credentials |
| **Automated Dependencies** | Dependabot weekly PRs for both npm and Maven ecosystems |
| **Cookie Security** | `HttpOnly`, `Secure` (HTTPS), `SameSite=None` (cross-origin); 1-hour expiry |
| **Password Encryption** | Spring Security `BCryptPasswordEncoder` |
| **CORS Policy** | Whitelisted origins with credentials support |

---

## 👨‍💻 Author

<table>
<tr>
<td align="center">
<strong>Rathikindi Charan Teja</strong><br/>
<a href="https://github.com/CharanTeja-6825">
<img src="https://img.shields.io/badge/GitHub-CharanTeja--6825-181717?logo=github&logoColor=white&style=for-the-badge" alt="GitHub" />
</a>
</td>
</tr>
</table>

---

## 📄 License

This project is under the **Rathikindi Charan Teja Proprietary License 1.0** — view-only permission. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with** &nbsp; ☕ Java 21 &nbsp;·&nbsp; ⚛️ React 19 &nbsp;·&nbsp; 🍃 MongoDB &nbsp;·&nbsp; 🐳 Docker &nbsp;·&nbsp; 💙 Passion

*If you found this project interesting, consider giving it a* ⭐

</div>
