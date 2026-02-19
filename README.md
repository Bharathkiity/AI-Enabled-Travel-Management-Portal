<img width="1895" height="875" alt="image" src="https://github.com/user-attachments/assets/12555338-37d0-47cd-ace5-73ba880f6821" /># AI-Enabled-Travel-Management-Portal
Production-ready Travel Management System with JWT security, expense tracking, dashboard analytics, and AI-powered travel recommendations.
A full-stack AI-powered Travel Management System built using Spring Boot 3.2 + React + MySQL + JWT Authentication.
TripEase allows users to plan trips, track expenses, view dashboard analytics, and receive AI-based travel recommendations.


 🚀 Features

 🔐 Authentication & Security

* User Registration & Login
* JWT-based authentication
* Role-based access (USER / ADMIN)
* BCrypt password encryption
* Stateless session management

 ✈️ Trip Management

* Create, update, delete trips
* View trips by logged-in user
* Budget management
* Trip date validation

 💰 Expense Tracking

* Add expenses to trips
* Category-based tracking
* Automatic budget calculation
* Delete expenses

 📊 Dashboard Analytics

* Total trips count
* Total expenses summary
* Budget overview
* Upcoming trips tracking

 🤖 AI Travel Recommendations

* Generate personalized travel suggestions
* Destination-based AI advice
* Budget & preference-aware recommendations
* Gemini API integration (with fallback logic)

---

 🛠️ Tech Stack

 Backend

* Java 21
* Spring Boot 3.2
* Spring Security 6
* JWT (jjwt)
* Spring Data JPA
* Hibernate
* MySQL 8
* WebClient (for AI integration)
* Lombok
* Maven

 Frontend

* React 18
* Vite
* Tailwind CSS
* Axios
* React Router
* React Icons
* Context API

---

 📁 Project Structure

```
TripEase/
 ├── backend/ (Spring Boot Application)
 ├── frontend/ (React Application)
 ├── screenshots/
 └── README.md
```

---

 ⚙️ Backend Setup

 1️⃣ Navigate to backend folder

 3️⃣ Run Backend

```
mvn clean install
mvn spring-boot:run
``

Backend runs at:

```
http://localhost:8080
```

---

 💻 Frontend Setup

 1️⃣ Navigate to frontend folder

```
cd frontend
```

 2️⃣ Install dependencies

```
npm install
```

 3️⃣ Run frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

 🔐 API Endpoints

 Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

 Trips

```
POST   /api/trips
GET    /api/trips
PUT    /api/trips/{id}
DELETE /api/trips/{id}
```

 Expenses

```
POST   /api/expenses
GET    /api/expenses/{tripId}
DELETE /api/expenses/{id}
```

 Dashboard

```
GET    /api/dashboard
```

 AI Recommendations

```
POST   /api/ai/recommendation
GET    /api/ai/recommendation
```

---

 📸 Screenshots

Add your screenshots inside:

```
screenshots/
```

 🧪 Testing

* Backend API tested using Postman
* Frontend tested for:

  * Authentication
  * Protected routes
  * Expense calculations
  * AI generation
* Security tests performed (SQL Injection, XSS, JWT tampering)

---

 🔒 Security Features

* JWT token validation filter
* Role-based authorization
* Password hashing with BCrypt
* CORS configuration
* Input validation with Jakarta Validation
* Global Exception Handling

---

 📈 Performance

* Optimized JPA queries
* Efficient dashboard aggregation
* AI fallback handling
* Stateless architecture for scalability

---

 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software.

---

 👨‍💻 Author

Bharath Kumar Racharla
Full Stack Java Developer
Email:bharathkitty9009@gmail.com





