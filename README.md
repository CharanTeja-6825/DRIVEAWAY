# 🚗 DRIVEAWAY - Car Rental Marketplace Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

DRIVEAWAY is a comprehensive full-stack car rental marketplace platform that connects customers seeking rental vehicles with dealers offering cars. The platform features role-based access control, automated booking workflows, and a modern, responsive user interface.

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
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role System**: Distinct interfaces and capabilities for Customers, Dealers, and Admins
- **JWT Authentication**: Secure, stateless authentication with role-based access control
- **Car Listing Management**: Dealers can add, update, and manage their vehicle inventory
- **Booking System**: Customers can browse and book cars with date range selection
- **Approval Workflows**: Multi-stage approval process for dealer applications and bookings
- **Real-time Status Tracking**: Monitor booking status from request to completion
- **Responsive Design**: Modern UI built with Material-UI and Tailwind CSS

### 👤 Customer Features
- Browse available cars from verified dealers
- Filter and search car listings
- Book cars with flexible date ranges
- View and manage booking history
- Track booking status (Pending/Approved/Rejected)
- View user profile and account details

### 🏪 Dealer Features
- Apply to become a verified dealer
- Manage dealership information (name, location, GST)
- Add and update car listings
- Set daily rental prices
- Approve or reject customer booking requests
- View and manage all bookings for their vehicles
- Dashboard for business analytics

### 👨‍💼 Admin Features
- Approve or reject dealer applications
- Monitor platform activity
- Manage all users in the system
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
| **Tailwind CSS** | 4.1.13 | Utility-first Styling |
| **Axios** | 1.13.3 | HTTP Client |
| **Day.js** | 1.11.19 | Date Manipulation |
| **Emotion** | 11.14.0 | CSS-in-JS Styling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 4.0.2 | Application Framework |
| **Java** | 21 | Programming Language |
| **MongoDB** | Atlas | NoSQL Database |
| **Spring Security** | 7.3.1 | Security Framework |
| **JWT (JJWT)** | 0.13.0 | Token-based Authentication |
| **Springdoc OpenAPI** | 2.8.4 | API Documentation |
| **Maven** | Latest | Build & Dependency Management |

### DevOps & Tools
- **Docker & Docker Compose**: Containerization and orchestration
- **Nginx**: Frontend web server in production
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
                  │ JWT Authentication
                  ▼
┌─────────────────────────────────────────────────────┐
│                Application Layer                     │
│       Spring Boot REST Controllers                   │
│     JWT Filter → Security → Business Logic          │
│              Port: 2006 (Internal)                  │
└─────────────────┬───────────────────────────────────┘
                  │ Spring Data MongoDB
                  ▼
┌─────────────────────────────────────────────────────┐
│                  Data Layer                          │
│          MongoDB Atlas Cloud Database                │
│          Collections: users, cars, bookings,         │
│            dealers, dealer_applications              │
└─────────────────────────────────────────────────────┘
```

### Architecture Highlights

#### **Monolithic REST API Design**
- Frontend communicates with backend via RESTful endpoints
- Stateless authentication using JWT tokens
- Role-based authorization at method level

#### **Security Architecture**
- Custom JWT authentication filter
- Password encryption with Spring Security
- CORS enabled for cross-origin requests
- Public endpoints: `/api/user/login`, `/api/user/register`, Swagger docs
- Protected endpoints require valid JWT token

#### **Database Design**
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Document-based**: Flexible schema for entities
- **Indexed fields**: Email (users), compound indexes for bookings
- **Relationships**: Referenced via IDs (users → dealers → cars → bookings)

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
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── api/                   # Axios configuration & API calls
│   │   ├── app/                   # App-level components
│   │   │   ├── Navbar.jsx         # Navigation component
│   │   │   ├── ProtectedRoute.jsx # Route guards
│   │   │   └── Routing.jsx        # Route definitions
│   │   ├── features/              # Feature-based organization
│   │   │   ├── auth/              # Authentication pages
│   │   │   ├── customer/          # Customer features
│   │   │   ├── dealer/            # Dealer features
│   │   │   ├── admin/             # Admin features
│   │   │   ├── bookings/          # Booking components
│   │   │   └── cars/              # Car listing components
│   │   ├── App.jsx                # Root component
│   │   └── main.jsx               # Entry point
│   ├── frontend.Dockerfile        # Frontend container config
│   ├── package.json               # Dependencies
│   ├── vite.config.js             # Vite configuration
│   └── tailwind.config.js         # Tailwind CSS config
│
├── DRIVEAWAY-BACKEND/             # Spring Boot Backend
│   ├── src/main/java/com/driveaway/
│   │   ├── controller/            # REST API Controllers
│   │   │   ├── UserController.java      # Auth endpoints
│   │   │   ├── CustomerController.java  # Customer operations
│   │   │   ├── DealerController.java    # Dealer operations
│   │   │   └── AdminController.java     # Admin operations
│   │   ├── service/               # Business Logic Layer
│   │   │   ├── UserService.java
│   │   │   ├── CarService.java
│   │   │   ├── BookingService.java
│   │   │   └── DealerService.java
│   │   ├── repository/            # Data Access Layer
│   │   │   ├── UserRepository.java
│   │   │   ├── CarRepository.java
│   │   │   ├── BookingRepository.java
│   │   │   └── DealerRepository.java
│   │   ├── entity/                # MongoDB Documents
│   │   │   ├── User.java
│   │   │   ├── Car.java
│   │   │   ├── Booking.java
│   │   │   ├── Dealer.java
│   │   │   └── DealerApplication.java
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── config/                # Configuration Classes
│   │   │   ├── SecurityConfig.java      # Security setup
│   │   │   ├── JwtFilter.java           # JWT validation
│   │   │   ├── JwtUtil.java             # JWT utilities
│   │   │   └── SwaggerConfig.java       # API docs config
│   │   └── scheduler/             # Scheduled Tasks
│   │       └── BookingScheduler.java    # Booking automation
│   ├── src/main/resources/
│   │   └── application.properties # Application configuration
│   ├── backend.Dockerfile         # Backend container config
│   └── pom.xml                    # Maven dependencies
│
├── docker-compose.yml             # Multi-container orchestration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 📚 API Documentation

### Swagger UI
Interactive API documentation available at: `http://localhost:2025/swagger-ui.html`

### Main API Endpoints

#### Authentication (`/api/user`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/register` | Register new user | Public |
| POST | `/api/user/login` | User login | Public |
| GET | `/api/user/profile` | Get user profile | Required |

#### Customer Operations (`/api/customer`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/customer/cars` | List available cars | Required |
| POST | `/api/customer/book` | Create booking | Required |
| GET | `/api/customer/bookings` | View user bookings | Required |

#### Dealer Operations (`/api/dealer`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/dealer/apply` | Apply as dealer | Required |
| POST | `/api/dealer/cars` | Add car listing | Required |
| GET | `/api/dealer/cars` | View dealer cars | Required |
| PUT | `/api/dealer/cars/{id}` | Update car | Required |
| GET | `/api/dealer/bookings` | View bookings | Required |
| PUT | `/api/dealer/bookings/{id}` | Approve/Reject booking | Required |

#### Admin Operations (`/api/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | List all users | Required |
| GET | `/api/admin/dealers/pending` | Pending dealer applications | Required |
| PUT | `/api/admin/dealers/{id}/approve` | Approve dealer | Required |
| PUT | `/api/admin/dealers/{id}/reject` | Reject dealer | Required |

### Request/Response Examples

#### User Login
```json
// POST /api/user/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "CUSTOMER",
  "email": "user@example.com"
}
```

#### Book a Car
```json
// POST /api/customer/book
{
  "carId": "64abc123...",
  "startDate": "2024-03-01",
  "endDate": "2024-03-05"
}

// Response
{
  "id": "64def456...",
  "status": "PENDING",
  "totalAmount": 2000.00,
  "car": { ... },
  "customer": { ... }
}
```

## 👥 User Roles & Capabilities

### Role Hierarchy
```
Admin (Highest Privilege)
  ├─ Full system access
  ├─ User management
  └─ Dealer approval authority
      │
Dealer (Medium Privilege)
  ├─ Car inventory management
  ├─ Booking approval
  └─ View dealer analytics
      │
Customer (Standard Privilege)
  ├─ Browse cars
  ├─ Create bookings
  └─ View own bookings
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
  name: String,
  email: String,        // Indexed
  password: String,     // Encrypted
  phoneNumber: String,
  role: String,         // CUSTOMER, DEALER, ADMIN
  createdAt: Date,
  updatedAt: Date
}
```

#### `dealers`
```javascript
{
  _id: ObjectId,
  userId: String,       // Reference to users
  dealershipName: String,
  gstNumber: String,
  location: String,
  status: String,       // PENDING, APPROVED, REJECTED
  appliedDate: Date,
  approvedDate: Date
}
```

#### `cars`
```javascript
{
  _id: ObjectId,
  dealerId: String,     // Reference to dealers
  brand: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  description: String,
  imageUrl: String,
  status: String,       // AVAILABLE, BOOKED, MAINTENANCE
  features: [String],
  createdAt: Date
}
```

#### `bookings`
```javascript
{
  _id: ObjectId,
  carId: String,        // Reference to cars
  customerId: String,   // Reference to users
  startDate: Date,
  endDate: Date,
  totalAmount: Number,
  status: String,       // PENDING, APPROVED, REJECTED, COMPLETED
  bookingDate: Date,
  approvedDate: Date
}
```

### Indexes
- **users.email**: Unique index for fast lookup
- **bookings**: Compound index on (carId, startDate, endDate) for availability checks
- **cars.dealerId**: Index for dealer car queries

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

## 🐳 Deployment

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
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRATION`: Token expiration time (ms)

**Frontend:**
- `VITE_API_URL`: Backend API URL

### Cloud Deployment Options
- **AWS**: EC2 with Docker, or ECS for container orchestration
- **Azure**: Azure Container Instances or App Service
- **Google Cloud**: Cloud Run or GKE
- **Heroku**: Container deployment with MongoDB Atlas

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
- All contributors who help improve this project

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact the maintainers
- Check the [API Documentation](http://localhost:2025/swagger-ui.html) for API-related questions

---

**Made with ❤️ for the car rental community**
