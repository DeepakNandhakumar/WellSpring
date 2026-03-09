# 🌿 WellSpring – Preventive Health Intelligence Platform

A comprehensive, enterprise-grade preventive healthcare web application built with Spring Boot and React. This platform combines modern healthcare knowledge with ancient Ayurvedic wisdom to empower individuals in their journey towards better health.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Public Features
- 🏠 **Landing Page** - Animated hero section with stats and features
- 🔍 **Disease Information** - Comprehensive database of diseases with symptoms, causes, and prevention
- 🌿 **Medicinal Plants** - Ayurvedic plant database with uses and benefits
- 📖 **About Page** - Platform information and team details
- 📧 **Contact Page** - Support message system
- 🔒 **Privacy Policy & Terms** - Legal documentation

### User Dashboard Features
- 🍽️ **Nutro Diet Plans** - Personalized diet recommendations
- ✨ **Ayurvedic Solutions** - Traditional remedies and lifestyle changes
- 📊 **BMI Calculator** - Body Mass Index calculation with health categories
- 😴 **Sleep Checker** - Sleep quality analysis
- 🧘 **Yoga & Exercise** - Disease-specific yoga routines with video tutorials
- 🤖 **AI Symptom Checker** - Chat-based symptom analysis
- ✅ **Health Todo Tracker** - Daily health task management

### Admin Features
- 📊 **Admin Dashboard** - Analytics and overview
- 📝 **CRUD Operations** - Manage diseases, plants, diet plans, and ayurvedic solutions
- 💬 **Support Messages** - View and manage user inquiries

### Security Features
- 🔐 JWT-based authentication
- 👥 Role-based access control (USER/ADMIN)
- 🔒 BCrypt password hashing
- 🛡️ Protected routes
- ✅ Input validation
- 🌐 CORS configuration

## 🛠️ Technology Stack

### Backend
- **Java 17+**
- **Spring Boot 3.2.0**
- **Spring Security** - JWT authentication
- **Spring Data JPA** - Database operations
- **Hibernate** - ORM
- **MySQL** - Database
- **Maven** - Build tool

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Context API** - State management

### Database Schema
- Users (id, name, email, password, role, created_at)
- Diseases (id, name, description, symptoms, causes, prevention)
- MedicinalPlants (id, plant_name, scientific_name, uses, image_url)
- DietPlans (id, disease_id, age_group, type, breakfast, lunch, dinner, avoid_food)
- AyurvedicSolutions (id, disease_id, herbs, home_remedy, lifestyle_changes)
- SupportMessages (id, name, email, message, created_at)

## 🏗️ Architecture

### Backend Architecture (Layered Pattern)
```
com.wellspring/
├── config/         # Configuration classes
├── controller/     # REST API controllers
├── dto/            # Data Transfer Objects
├── entity/         # JPA entities
├── exception/      # Exception handlers
├── repository/     # Spring Data JPA repositories
├── security/       # JWT and security configuration
└── service/        # Business logic layer
```

### Frontend Architecture
```
src/
├── components/     # Reusable components
├── context/        # React Context (Auth)
├── pages/          # Page components
│   ├── admin/      # Admin pages
│   ├── auth/       # Authentication pages
│   ├── dashboard/  # User dashboard pages
│   └── public/     # Public pages
├── services/       # API services
└── utils/          # Utility functions
```

## 📋 Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Node.js 18 or higher
- Maven 3.6 or higher

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- Create database
CREATE DATABASE wellspring_db;

-- Or let JPA create it automatically
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd wellspring-backend

# Update application.properties with your database credentials
# src/main/resources/application.properties

# Build and run
./mvnw clean install
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd app

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- API Health Check: http://localhost:8080/api/health

## 📚 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/auth/me | Get current user |

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/diseases | Get all diseases |
| GET | /api/diseases/{id} | Get disease by ID |
| GET | /api/diseases/search | Search diseases |
| GET | /api/plants | Get all plants |
| GET | /api/plants/{id} | Get plant by ID |
| GET | /api/plants/search | Search plants |
| POST | /api/support | Send support message |

### Protected Endpoints (Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/diet-plans/{id} | Get diet plan |
| GET | /api/diet-plans/disease/{id} | Get diet plans by disease |
| GET | /api/diet-plans/filter | Filter diet plans |
| GET | /api/ayurvedic/{id} | Get ayurvedic solution |
| GET | /api/ayurvedic/disease/{id} | Get solution by disease |

### Admin Endpoints (Admin Role Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/diseases | Create disease |
| PUT | /api/diseases/{id} | Update disease |
| DELETE | /api/diseases/{id} | Delete disease |
| POST | /api/plants | Create plant |
| PUT | /api/plants/{id} | Update plant |
| DELETE | /api/plants/{id} | Delete plant |
| GET | /api/diet-plans | Get all diet plans |
| POST | /api/diet-plans | Create diet plan |
| PUT | /api/diet-plans/{id} | Update diet plan |
| DELETE | /api/diet-plans/{id} | Delete diet plan |
| GET | /api/ayurvedic | Get all solutions |
| POST | /api/ayurvedic | Create solution |
| PUT | /api/ayurvedic/{id} | Update solution |
| DELETE | /api/ayurvedic/{id} | Delete solution |
| GET | /api/support | Get all messages |
| DELETE | /api/support/{id} | Delete message |

## 🔑 Demo Credentials

### Admin Account
- **Email:** admin@wellspring.com
- **Password:** admin123

### User Account
- **Email:** user@wellspring.com
- **Password:** user123

## 🎨 UI/UX Design

### Color Scheme
- **Primary Blue:** #1e88e5
- **Green Accent:** #43a047
- **Orange Accent:** #fb8c00
- **Font:** Poppins

### Design Features
- Glass morphism navbar
- Smooth transitions and animations
- Card hover effects
- Responsive design (Mobile, Tablet, Desktop)
- Modern SaaS appearance

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (Single column)
- **Tablet:** 640px - 1024px (Two columns)
- **Desktop:** > 1024px (Three to four columns)

## 🔒 Security Features

1. **JWT Authentication** - Stateless token-based authentication
2. **BCrypt Password Hashing** - Secure password storage
3. **Role-based Access Control** - USER and ADMIN roles
4. **Input Validation** - Server-side validation with annotations
5. **CORS Configuration** - Cross-origin resource sharing
6. **Global Exception Handling** - Proper error responses

## 🧪 Testing

### Backend Tests
```bash
cd wellspring-backend
./mvnw test
```

### Frontend Build
```bash
cd app
npm run build
```

## 🚀 Deployment

### Backend Deployment
```bash
cd wellspring-backend
./mvnw clean package
java -jar target/wellspring-backend-1.0.0.jar
```

### Frontend Deployment
```bash
cd app
npm run build
# Deploy dist/ folder to your hosting provider
```

## 📝 Environment Variables

### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/wellspring_db
spring.datasource.username=root
spring.datasource.password=your_password

# JWT
jwt.secret=your_secret_key
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the frontend library
- shadcn/ui for the beautiful UI components
- All contributors and testers

## 📧 Contact

For support or inquiries, please contact:
- Email: support@wellspring.com
- Website: https://wellspring.com

---

**Note:** This is a demonstration project for educational purposes. Always consult healthcare professionals for medical advice.

Made with ❤️ for better health awareness
