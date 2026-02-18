# 🚗 DRIVEAWAY - Car Rental Marketplace Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-blue.svg)](https://razorpay.com/)
[![Docker](https://img.shields.io/badge/Docker-Multi--Platform-2496ED.svg)](https://www.docker.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF.svg)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

DRIVEAWAY is a comprehensive full-stack car rental marketplace platform that connects customers seeking rental vehicles with dealers offering cars. The platform features role-based access control, integrated Razorpay payments, automated booking lifecycle management with scheduled tasks, and a modern, responsive user interface — all deployed via a CI/CD pipeline with multi-platform Docker support.

## 🌐 Live Demo

**🚀 Application URL:** [https://driveaway-jhee.onrender.com/](https://driveaway-jhee.onrender.com/)

### 🎨 Landing Page Preview

The DRIVEAWAY application features a modern, intuitive landing page where users can:
- **Browse** the car rental marketplace
- **Sign up** as a customer or apply to become a dealer
- **Login** to access role-specific dashboards
- **Explore** available vehicles from verified dealers

**Key Landing Page Features:**
- 🎯 Clean, responsive Material-UI design
- 🔐 Secure authentication interface
- 🚗 Quick access to car browsing
- 📱 Mobile-friendly navigation
- ⚡ Fast loading with Vite optimization

Visit the live application to see the landing page in action!

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [User Roles & Capabilities](#-user-roles--capabilities)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [CI/CD & Automation](#-cicd--automation)
- [Deployment](#-deployment)
- [Technical Highlights & Developer Competencies](#-technical-highlights--developer-competencies)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role System**: Distinct interfaces and capabilities for Customers, Dealers, and Admins
- **JWT Authentication**: Secure, stateless authentication with role-based access control (HttpOnly cookies + Bearer tokens)
- **Car Listing Management**: Dealers can add, update, and manage their vehicle inventory
- **Booking System**: Customers can browse and book cars with date range selection
- **Razorpay Payment Integration**: Secure online payments with order creation, checkout overlay, and server-side signature verification
- **Approval Workflows**: Multi-stage approval process for dealer applications and bookings
- **Automated Booking Lifecycle**: Scheduled tasks handle pending booking expiration (5-minute timeout), activation on start date, and completion on end date
- **Real-time Status Tracking**: Monitor booking status across the full lifecycle (Pending → Approved → Paid → Active → Completed)
- **Responsive Design**: Modern UI built with Material-UI and Tailwind CSS

### 👤 Customer Features
- Browse available cars from verified dealers
- Filter and search car listings
- Book cars with flexible date ranges via DatePicker
- Make secure online payments through Razorpay
- Cancel approved bookings
- View and manage booking history with stats dashboard
- Track booking status (Pending → Approved → Paid → Active → Completed / Expired / Cancelled)
- Apply to become a dealer directly from the profile page
- View dealer application status
- Responsive dashboard with total, upcoming, completed, and cancelled booking counts

### 🏪 Dealer Features
- Apply to become a verified dealer (with GST and business details)
- Manage dealership information (name, location, GST)
- Add and update car listings with brand selection (51 supported brands with logos)
- Set daily rental prices
- Approve or reject customer booking requests
- View and manage all bookings for their vehicles
- Dashboard with analytics (total cars, bookings, revenue, pending approvals)

### 👨‍💼 Admin Features
- Approve or reject dealer applications
- Monitor platform activity with stats dashboard (total users, dealers, applications, vehicles)
- Manage all users in the system (filterable table, excludes admin accounts)
- Oversee booking transactions
- System administration and configuration

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI Framework |
| **Vite** | 7.3.1 | Build Tool & Dev Server |
| **React Router** | 7.13.0 | Client-side Routing |
| **Material-UI (MUI)** | 7.3.6 | Component Library |
| **MUI X Date Pickers** | 8.27.0 | Date Range Selection |
| **Tailwind CSS** | 4.1.13 | Utility-first Styling |
| **Axios** | 1.13.5 | HTTP Client |
| **Day.js** | 1.11.19 | Date Manipulation |
| **Emotion** | 11.14.0 | CSS-in-JS Styling |
| **Sonner** | 2.0.3 | Toast Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 4.0.2 | Application Framework |
| **Java** | 21 | Programming Language |
| **MongoDB** | Atlas | NoSQL Database |
| **Spring Security** | 7.3.1 | Security Framework |
| **JWT (JJWT)** | 0.13.0 | Token-based Authentication |
| **Razorpay Java** | 1.4.8 | Payment Gateway Integration |
| **Springdoc OpenAPI** | 3.0.1 | API Documentation |
| **Maven** | Latest | Build & Dependency Management |

### DevOps & Tools
- **Docker & Docker Compose**: Containerization and orchestration
- **GitHub Actions**: CI/CD pipeline with multi-platform Docker builds (linux/amd64, linux/arm64)
- **Dependabot**: Automated weekly dependency updates for npm and Maven
- **Nginx**: Frontend web server in production with SPA routing support
- **Docker Hub**: Container registry for image distribution
- **Render**: Cloud deployment platform
- **Git**: Version control
- **ESLint**: Code quality for frontend

## 🏗️ Architecture

DRIVEAWAY follows a **modern full-stack architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                   Client Layer                       │
│  React SPA (Vite) - Material-UI + Tailwind CSS     │
│              Port: 3000 (Dev) / 80 (Prod)          │
└─────────────────┬───────────────────────────────────┘
                  │ REST API (JSON)
                  │ JWT Authentication (HttpOnly Cookie)
                  ▼
┌─────────────────────────────────────────────────────┐
│                Application Layer                     │
│       Spring Boot REST Controllers                   │
│     JWT Filter → Security → Business Logic          │
│     Scheduled Tasks (Booking Expiry & Lifecycle)    │
│              Port: 2006 (Internal)                  │
└─────────┬───────────────────────────────┬───────────┘
          │ Spring Data MongoDB           │ Razorpay API
          ▼                               ▼
┌──────────────────────────┐  ┌────────────────────────┐
│       Data Layer          │  │   Payment Gateway       │
│  MongoDB Atlas Cloud DB   │  │   Razorpay (Orders +    │
│  Collections: users,      │  │   Signature Verify)     │
│  cars, bookings, dealers, │  └────────────────────────┘
│  dealer_applications,     │
│  orders                   │
└──────────────────────────┘
```

### Architecture Highlights

#### **Monolithic REST API Design**
- Frontend communicates with backend via RESTful endpoints
- Stateless authentication using JWT tokens (HttpOnly cookies + Bearer header support)
- Role-based authorization at method level using `@PreAuthorize`

#### **Security Architecture**
- Custom JWT authentication filter with dual token extraction (cookies and Authorization header)
- Password encryption with Spring Security
- CORS configured for specific origins with credentials support
- Dynamic SameSite cookie policy (None for HTTPS, Lax for HTTP)
- Public endpoints: `/api/user/login`, `/api/user/register`, `/api/user/awake`
- Protected endpoints require valid JWT token with role verification

#### **Payment Architecture**
- **Razorpay Integration**: Server-side order creation with amount conversion to paise
- **Secure Verification**: HMAC SHA256 signature validation for payment authenticity
- **Atomic Updates**: Payment verification atomically updates Order and Booking statuses

#### **Scheduled Task Architecture**
- **Pending Booking Expiration**: Runs every 5 minutes — expires unanswered bookings and unlocks cars
- **Daily Lifecycle Updates**: Runs at midnight — activates bookings on start date, completes bookings on end date, updates car availability

#### **Database Design**
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Document-based**: Flexible schema for entities
- **Indexed fields**: Email (users), compound indexes for bookings, GST (dealers)
- **Relationships**: Referenced via IDs (users → dealers → cars → bookings → orders)
- **Aggregation Pipelines**: Complex `$lookup` joins for enriched booking queries with dealer and car details

#### **Containerization**
- **Docker Compose** orchestrates multi-container deployment
- **Backend container**: Spring Boot application
- **Frontend container**: Nginx serving React build
- **Bridge network**: Inter-service communication

## 🚀 Getting Started

### Prerequisites
- **Java 21** or higher
- **Node.js 18+** and npm
- **Docker & Docker Compose** (for containerized deployment)
- **MongoDB Atlas account** (or local MongoDB instance)

### Environment Setup

#### Backend Configuration
Create `application.properties` in `DRIVEAWAY-BACKEND/src/main/resources/`:

```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
spring.data.mongodb.database=driveaway_db
server.port=2006

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Swagger Configuration
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

#### Frontend Configuration
Create `.env` in `DRIVEAWAY-FRONTEND/`:

```env
VITE_API_URL=http://localhost:2025
```

### Local Development

#### 1. Backend Setup
```bash
cd DRIVEAWAY-BACKEND
mvn clean install
mvn spring-boot:run
```
Backend will start at `http://localhost:2006`

#### 2. Frontend Setup
```bash
cd DRIVEAWAY-FRONTEND
npm install
npm run dev
```
Frontend will start at `http://localhost:3000`

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

**Access Points:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:2025`
- Swagger UI: `http://localhost:2025/swagger-ui.html`

## 📁 Project Structure

```
DRIVEAWAY/
├── DRIVEAWAY-FRONTEND/           # React Frontend Application
│   ├── public/                    # Static assets & brand logos
│   ├── src/
│   │   ├── api/                   # Axios configuration & interceptors
│   │   │   └── axios.js           # Base URL, credentials, 401 handler
│   │   ├── app/                   # App-level components
│   │   │   ├── Navbar.jsx         # Role-aware responsive navigation
│   │   │   ├── Home.jsx           # Landing page with hero & features
│   │   │   └── ProtectedRoute.jsx # Route guards (auth + role check)
│   │   ├── features/              # Feature-based organization
│   │   │   ├── auth/              # Login & Registration pages
│   │   │   ├── customer/          # Customer dashboard, cars, bookings, payment
│   │   │   ├── dealer/            # Dealer dashboard, car management, bookings
│   │   │   ├── admin/             # Admin dashboard, users, dealer approvals
│   │   │   ├── bookings/          # Shared booking services
│   │   │   └── cars/              # Shared car services
│   │   ├── shared/                # Reusable components, hooks, constants
│   │   │   ├── components/        # InlineAlert, PageNotFound
│   │   │   ├── hooks/             # AuthProvider (context), useLogout
│   │   │   ├── constants/         # 51 car brands with logos
│   │   │   └── utils/             # Response utilities
│   │   ├── theme/                 # MUI theme customization
│   │   ├── App.jsx                # Root routing component
│   │   └── main.jsx               # Entry point with providers
│   ├── nginx.conf                 # SPA routing for production
│   ├── frontend.Dockerfile        # Multi-stage: Node 22 → Nginx Alpine
│   ├── package.json               # Dependencies
│   └── vite.config.js             # Vite + Tailwind CSS config
│
├── DRIVEAWAY-BACKEND/             # Spring Boot Backend
│   ├── src/main/java/com/driveaway/
│   │   ├── controller/            # REST API Controllers
│   │   │   ├── UserController.java      # Auth & keep-alive endpoints
│   │   │   ├── CustomerController.java  # Cars, bookings, payments, dealer apps
│   │   │   ├── DealerController.java    # Car CRUD, booking approval
│   │   │   └── AdminController.java     # User management, dealer approvals
│   │   ├── service/               # Business Logic (interfaces + impls)
│   │   │   ├── UserService.java         # Auth, registration
│   │   │   ├── CarService.java          # Car inventory
│   │   │   ├── BookingService.java      # Booking lifecycle
│   │   │   ├── DealerApplicationService.java  # Dealer workflow
│   │   │   ├── OrderService.java        # Razorpay orders & verification
│   │   │   ├── CustomerService.java     # Customer queries
│   │   │   ├── AdminService.java        # Admin queries
│   │   │   └── JWTService.java          # Token generation & validation
│   │   ├── repository/            # Data Access Layer
│   │   │   ├── UserRepository.java
│   │   │   ├── CarRepository.java       # + CarRepositoryCustom
│   │   │   ├── BookingRepository.java   # + BookingRepositoryCustom + aggregation
│   │   │   ├── DealerRepository.java
│   │   │   ├── DealerApplicationRepository.java
│   │   │   └── OrderRepository.java
│   │   ├── entity/                # MongoDB Document Models
│   │   │   ├── User.java
│   │   │   ├── Car.java
│   │   │   ├── Booking.java
│   │   │   ├── Dealer.java
│   │   │   ├── DealerApplications.java
│   │   │   └── Order.java
│   │   ├── dto/                   # Data Transfer Objects (Java Records)
│   │   ├── enums/                 # Roles, Approval, BookingStatus
│   │   ├── config/                # Configuration Classes
│   │   │   ├── SecurityConfig.java      # CORS, CSRF, session, filters
│   │   │   ├── JwtFilter.java           # Cookie + header JWT extraction
│   │   │   ├── JwtUtil.java             # Token creation & parsing
│   │   │   ├── SwaggerConfig.java       # OpenAPI docs config
│   │   │   └── RazorpayConfig.java      # Payment gateway setup
│   │   ├── scheduler/             # Scheduled Tasks
│   │   │   └── BookingScheduler.java    # Expiration & lifecycle crons
│   │   └── exceptions/            # Custom exceptions
│   ├── src/main/resources/
│   │   └── application.properties # Environment-driven configuration
│   ├── backend.Dockerfile         # Multi-stage: JDK 21 build → JDK 21 runtime
│   └── pom.xml                    # Maven dependencies
│
├── .github/
│   ├── workflows/
│   │   └── docker-publish.yml     # CI/CD: Build & push to Docker Hub
│   └── dependabot.yml             # Weekly npm + Maven updates
├── docker-compose.yml             # Multi-container orchestration
├── .gitignore                     # Git ignore rules
├── LICENSE                        # MIT License
└── README.md                      # This file
```

## 🧾 Workspace Snapshot (Auto-Updated Weekly)

<!-- workspace-snapshot:start -->
```text
DRIVEAWAY/
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       ├── docker-publish.yml
│       └── weekly-readme-workspace-sync.yml
├── .gitignore
├── DRIVEAWAY-BACKEND/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .mvn/
│   │   └── wrapper
│   ├── backend.Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main
│       └── test
├── DRIVEAWAY-FRONTEND/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── frontend.Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── car-white.svg
│   │   └── images
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── api
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   ├── index.css
│   │   ├── lib
│   │   ├── main.jsx
│   │   ├── shared
│   │   └── theme
│   └── vite.config.js
├── LICENSE
├── README.md
└── docker-compose.yml
```
<!-- workspace-snapshot:end -->

## 📚 API Documentation

### Swagger UI
Interactive API documentation available at: `http://localhost:2025/swagger-ui.html`

### Main API Endpoints

#### Authentication (`/api/user`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/register` | Register new user | Public |
| POST | `/api/user/login` | User login (returns JWT in HttpOnly cookie) | Public |
| GET | `/api/user/awake` | Keep-alive health check | Public |

#### Customer Operations (`/api/customer`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/customer/{email}` | Get user profile by email | Required |
| GET | `/api/customer/get/cars` | List available cars | Required |
| POST | `/api/customer/add/booking` | Create booking | Required |
| GET | `/api/customer/bookings` | View customer bookings (enriched with dealer/car info) | Required |
| POST | `/api/customer/cancel/booking` | Cancel an approved booking | Required |
| POST | `/api/customer/add` | Submit dealer application | Required |
| GET | `/api/customer/status/{id}` | Check dealer application status | Required |
| POST | `/api/customer/create/order` | Create Razorpay payment order | Required |
| POST | `/api/customer/verify` | Verify Razorpay payment signature | Required |

#### Dealer Operations (`/api/dealer`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/dealer/add/car` | Add car listing | Required |
| GET | `/api/dealer/cars/{dealerId}` | View dealer cars | Required |
| PUT | `/api/dealer/update/car` | Update car details | Required |
| GET | `/api/dealer/get/bookings` | View pending bookings (with customer details) | Required |
| PUT | `/api/dealer/approve/booking/{id}` | Approve/Reject booking | Required |

#### Admin Operations (`/api/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/all` | List all users (excludes admins) | Required |
| GET | `/api/admin/applications` | Get pending dealer applications | Required |
| POST | `/api/admin/approve/{id}` | Approve/Reject dealer application | Required |

### Request/Response Examples

#### User Login
```json
// POST /api/user/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response (JWT set as HttpOnly cookie)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "loginDTO": {
    "email": "user@example.com",
    "role": "CUSTOMER",
    "userId": "64abc123..."
  }
}
```

#### Book a Car
```json
// POST /api/customer/add/booking
{
  "carId": "64abc123...",
  "startDate": "2024-03-01T00:00:00Z",
  "endDate": "2024-03-05T00:00:00Z"
}

// Response
"Booking Successful !"
```

#### Create Payment Order
```json
// POST /api/customer/create/order
{
  "amount": 2000,
  "customer_id": "64abc123...",
  "booking_id": "64def456..."
}

// Response
{
  "order_id": "order_RZP123...",
  "amount": 2000,
  "status": "created"
}
```

## 👥 User Roles & Capabilities

### Role Hierarchy
```
Admin (Highest Privilege)
  ├─ Full system access
  ├─ User management (view all, filter)
  └─ Dealer approval authority
      │
Dealer (Medium Privilege)
  ├─ Car inventory management (add, update)
  ├─ Booking approval/rejection
  └─ Revenue and analytics dashboard
      │
Customer (Standard Privilege)
  ├─ Browse and book cars
  ├─ Online payments via Razorpay
  ├─ Cancel bookings
  └─ Apply for dealer role upgrade
```

### Booking Lifecycle
```
Customer books car → PENDING (5-min auto-expiry if unanswered)
  → Dealer approves → APPROVED
    → Customer pays via Razorpay → PAID
      → Start date reached (midnight cron) → ACTIVE (car status: ACTIVE)
        → End date reached (midnight cron) → COMPLETED (car status: AVAILABLE)
  → Dealer rejects → REJECTED (car unlocked)
  → Timeout → EXPIRED (car unlocked)
  → Customer cancels → CANCELLED (car unlocked)
```

### Access Control
- **Authentication**: JWT token required for all protected endpoints
- **Authorization**: Method-level security with `@PreAuthorize` annotations
- **Role Validation**: Each endpoint validates user role before processing

## 🗄️ Database Schema

### Collections

#### `users`
```javascript
{
  _id: ObjectId,
  userName: String,
  userEmail: String,     // Unique indexed
  password: String,      // Encrypted
  userPhone: String,
  userAge: Number,
  role: String,          // CUSTOMER, DEALER, ADMIN
  createdAt: Instant
}
```

#### `dealers`
```javascript
{
  _id: ObjectId,
  userId: String,        // Reference to users
  dealershipName: String,
  ownerName: String,
  gstIn: String,         // Unique indexed
  phone: String,
  location: String,
  createdAt: Instant,
  approvalStatus: String
}
```

#### `dealer_applications`
```javascript
{
  _id: ObjectId,
  userId: String,        // Unique indexed
  dealerShipName: String,
  ownerName: String,
  gstIn: String,
  phone: String,
  location: String,
  approvalStatus: String, // PENDING, APPROVED, REJECTED
  createdAt: Instant
}
```

#### `cars`
```javascript
{
  _id: ObjectId,
  dealerId: String,      // Indexed, reference to dealers
  dealerShipName: String,
  brand: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  carStatus: String,     // AVAILABLE, PENDING, BOOKED, ACTIVE, COMPLETED
  createdAt: Instant
}
```

#### `bookings`
```javascript
{
  _id: ObjectId,
  carId: String,         // Indexed, reference to cars
  dealerId: String,      // Indexed, reference to dealers
  customerId: String,    // Indexed, reference to users
  startDate: Instant,
  endDate: Instant,
  totalAmount: Number,
  status: String,        // PENDING, APPROVED, PAID, ACTIVE, COMPLETED, EXPIRED, CANCELLED, REJECTED
  createdAt: Instant,
  approvedAt: Instant
}
```

#### `orders`
```javascript
{
  _id: ObjectId,         // Razorpay order ID
  amount: Number,
  customer_id: String,   // Reference to users
  booking_id: String,    // Reference to bookings
  status: String
}
```

### Indexes
- **users.userEmail**: Unique index for fast lookup and login
- **bookings**: Compound indexes — `unique_active_booking_per_car` (carId + status), `customer_bookings_idx` (customerId + createdAt)
- **cars.dealerId**: Index for dealer car queries
- **dealers.gstIn**: Unique index for GST verification
- **dealer_applications.userId**: Unique index to prevent duplicate applications

## 💻 Development

### Code Style & Linting

#### Frontend
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

#### Backend
```bash
# Maven compile (includes checkstyle if configured)
mvn clean compile

# Run tests
mvn test
```

### Building for Production

#### Frontend
```bash
npm run build
# Output: dist/ folder with optimized build
```

#### Backend
```bash
mvn clean package
# Output: target/DRIVEAWAY-BACKEND-0.0.1-SNAPSHOT.jar
```

### Testing
```bash
# Frontend tests (if configured)
npm test

# Backend tests
mvn test

# Integration tests
mvn verify
```

## 🔄 CI/CD & Automation

### GitHub Actions Pipeline
The project uses a **Docker Build & Publish** workflow (`.github/workflows/docker-publish.yml`) triggered on every push to `main` or via manual dispatch:

1. **Checkout** — Pulls repository code
2. **Docker Buildx Setup** — Enables multi-platform builds
3. **Docker Hub Login** — Authenticates using GitHub Secrets
4. **Backend Build & Push** — Multi-stage Docker build (`eclipse-temurin:21-jdk`), tagged `latest` + git SHA, platforms: `linux/amd64`, `linux/arm64`
5. **Frontend Build & Push** — Multi-stage Docker build (`node:22-alpine` → `nginx:alpine`), injects `VITE_API_URL` and `VITE_RAZORPAY_KEY` as build args, tagged `latest` + git SHA

### Dependabot
Automated weekly dependency updates configured for both:
- **npm** (frontend — `/DRIVEAWAY-FRONTEND`)
- **Maven** (backend — `/DRIVEAWAY-BACKEND`)

## 🐳 Deployment

### Production Deployment
The application is deployed on **Render** and accessible at:
**🌐 [https://driveaway-jhee.onrender.com/](https://driveaway-jhee.onrender.com/)**

### Docker Deployment
The application is containerized for easy deployment:

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f

# Scale services (if needed)
docker-compose up -d --scale backend=3
```

### Environment Variables
Configure these in your deployment environment:

**Backend:**
- `DB_URL`: MongoDB connection string
- `DB_NAME`: MongoDB database name
- `JWT_SECRET`: Secret key for JWT signing
- `RZP_KEY`: Razorpay API key
- `RZP_SECRET`: Razorpay API secret
- `CLIENT_API`: Frontend URL for CORS

**Frontend:**
- `VITE_API_URL`: Backend API URL
- `VITE_RAZORPAY_KEY`: Razorpay public key

### Cloud Deployment Options
- **Render** ✅ (Currently deployed)
- **AWS**: EC2 with Docker, or ECS for container orchestration
- **Azure**: Azure Container Instances or App Service
- **Google Cloud**: Cloud Run or GKE
- **Heroku**: Container deployment with MongoDB Atlas

## 🧠 Technical Highlights & Developer Competencies

This project demonstrates proficiency across a wide range of full-stack development skills:

### Backend Engineering
| Competency | Implementation |
|------------|----------------|
| **RESTful API Design** | Clean controller-service-repository architecture with DTOs for decoupled data transfer |
| **Spring Security & JWT** | Custom `JwtFilter` with dual token extraction (HttpOnly cookies + Bearer headers), `@PreAuthorize` method-level authorization |
| **MongoDB Aggregation** | Complex `$lookup` pipelines to join bookings with dealer and car data, custom repository implementations |
| **Payment Gateway Integration** | Full Razorpay lifecycle — server-side order creation, client checkout overlay, HMAC SHA256 signature verification |
| **Scheduled Task Automation** | Cron-based schedulers for booking expiration (every 5 min) and lifecycle transitions (daily at midnight) |
| **Multi-Stage Docker Builds** | Optimized images using `eclipse-temurin:21-jdk` builder and slim runtime stages |
| **Custom Repository Pattern** | `BookingRepositoryCustom` / `CarRepositoryCustom` with `MongoTemplate` for atomic bulk updates |

### Frontend Engineering
| Competency | Implementation |
|------------|----------------|
| **Modern React (v19)** | Functional components, hooks, context API for global state management |
| **Role-Based UI** | Dynamic navigation, route guards (`ProtectedRoute`), and role-specific dashboards |
| **Material-UI Theming** | Custom theme with branded colors, typography (Manrope + Source Sans 3), and component overrides |
| **Payment UX** | Seamless Razorpay checkout overlay integration with order creation and verification flow |
| **Form Validation** | Comprehensive inline validation on blur, real-time error clearing, and form-wide validation |
| **Responsive Design** | MUI Grid with breakpoints + Tailwind CSS utilities, mobile-friendly hamburger navigation |
| **State & Status Management** | Centralized status color mapping and label system across all booking/car states |

### DevOps & Architecture
| Competency | Implementation |
|------------|----------------|
| **CI/CD Pipeline** | GitHub Actions workflow for automated multi-platform Docker builds and pushes to Docker Hub |
| **Containerization** | Docker Compose orchestration with bridge networking, Nginx SPA routing, and multi-stage builds |
| **Dependency Management** | Dependabot for automated weekly security and version updates (npm + Maven) |
| **Cloud Deployment** | Production deployment on Render with environment-based configuration |
| **Security Best Practices** | Password encryption, CORS configuration, HttpOnly cookies, stateless JWT sessions, HMAC signature verification |

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

**CharanTeja-6825**
- GitHub: [@CharanTeja-6825](https://github.com/CharanTeja-6825)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React community for the powerful UI library
- MongoDB Atlas for reliable cloud database hosting
- Razorpay for seamless payment gateway integration
- Render for seamless cloud deployment
- All contributors who help improve this project

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact the maintainers
- Check the [API Documentation](http://localhost:2025/swagger-ui.html) for API-related questions

---

**Made with ❤️ for the car rental community**
