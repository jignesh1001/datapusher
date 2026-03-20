A scalable backend service that receives event data and securely forwards it to configured external destinations via webhooks. Designed with reliability, extensibility, and performance in mind.

---

## 📌 Overview

Data Pusher enables systems to send event-driven data to multiple third-party endpoints asynchronously. It ensures secure ingestion, efficient processing, and reliable delivery using a decoupled architecture.

---

## ✨ Features

* 🔐 **Authentication & Authorization**

  * Secure user registration and login
  * Role-based access control (Admin & User)

* 🏢 **Account Management**

  * Create and manage multiple accounts
  * Each account has a unique secret token for secure communication

* 🌐 **Destination Management**

  * Configure multiple webhook endpoints per account
  * Support for custom HTTP methods and headers

* 📥 **Event Ingestion API**

  * Accepts JSON payloads via a dedicated endpoint
  * Validates and authenticates incoming requests

* ⚡ **Asynchronous Processing**

  * Events are processed in the background
  * Ensures high throughput and reliability

* 📊 **Logging & Monitoring**

  * Track every event with status (success/failed)
  * Store request payload and timestamps

* 🔎 **Search & Filtering**

  * Query accounts, destinations, and logs efficiently

* 🚦 **Rate Limiting**

  * Prevent abuse by limiting incoming requests per account

* ⚡ **Caching & Performance Optimization**

  * Frequently accessed data is optimized for fast retrieval

* 🧪 **Testing Ready**

  * Structured for unit and integration testing

---

## 🏗️ System Design (High Level)

```
Client → API Endpoint → Authentication → Queue → Worker → Webhook Destinations
                                ↓
                              Logs
```

* Incoming requests are validated and authenticated
* Events are queued for asynchronous processing
* Workers deliver data to configured destinations
* Logs are maintained for observability

---

## 📡 API Overview

### 🔑 Authentication

* `POST /auth/signup`
* `POST /auth/login`

---

### 🏢 Accounts

* Create, update, delete, and fetch accounts
* Each account is associated with users and roles

---

### 🌐 Destinations

* Add and manage webhook endpoints per account
* Define HTTP method and headers

---

### 👥 Account Members

* Invite users and assign roles
* Manage access to accounts

---

### 📥 Incoming Data Endpoint

`POST /server/incoming_data`

#### Headers:

* `CL-X-TOKEN`: Account secret token
* `CL-X-EVENT-ID`: Unique event identifier

#### Body:

```json
{
  "key": "value"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Data Received"
}
```

---

### 📊 Logs

* Retrieve logs by account or destination
* Filter by status, time range, etc.

---

## 🔐 Roles & Permissions

### Admin

* Full access to accounts, destinations, members
* Can invite users
* Can view logs

### Normal User

* Limited access (read/update)
* Can view logs and members

---

## ⚙️ Key Concepts

### 🔁 Event Flow

1. Client sends event data with headers
2. System validates and authenticates request
3. Event is queued for processing
4. Worker sends data to all configured destinations
5. Logs are created for each attempt

---

### 📦 Data Integrity

* Input validation enforced
* Consistent response format
* Cascading deletion handled for related entities

---

### 🚀 Performance Considerations

* Optimized querying strategies
* Indexed data fields
* Controlled request throughput

---

## 🧪 Testing

The project supports:

* Unit testing
* API integration testing
* Edge case validation

---

## 📄 Documentation

API documentation is available via:

* Swagger 

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Start the server
npm start
```

---

## 📌 Environment Variables

Create a `.env` file and configure:

```
PORT=
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
```

---

## 📤 Deployment

* Can be deployed on any cloud platform
* Ensure database and caching services are configured
* Set environment variables securely

---

## 📎 Deliverables Covered

✔ Authentication & Authorization
✔ Account & Destination Management
✔ Async Event Processing
✔ Logging System
✔ Rate Limiting & Validation
✔ Filtering & Querying
✔ Scalable Architecture

---

## 🤝 Contributing

Feel free to fork the repository and submit pull requests for improvements.

---

## 📧 Contact

For any queries or collaboration, feel free to reach out.

---

If you want, I can also:

* Make a **more recruiter-impressive version** (for GitHub visibility)
* Add **architecture diagram (image)**
* Tailor it specifically for **SDE interviews / hiring managers**
