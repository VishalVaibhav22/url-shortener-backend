# URL Shortener Backend

A scalable URL shortener backend built with **Node.js**, **Express**, **MongoDB**, and **Redis**, designed using a clean **service-oriented architecture**. The system optimizes redirection performance using Redis caching and is structured for horizontal scalability.

---

## Key Features

- URL shortening and redirection
- MongoDB as persistent storage (source of truth)
- Redis as an in-memory cache for fast redirects
- Clean separation of concerns (Routes → Controllers → Services → Repositories)
- Environment-based configuration
- REST API testing and validation using Postman

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- Postman
- dotenv

---

## High-Level Architecture

```
Client
  ↓
Load Balancer
  ↓
Backend Instances
  ├─ URL Generation Service
  └─ Redirection Service
      ↓
  Redis Cache
      ↓
  MongoDB
```

- Redis serves repeated redirect requests to reduce database load
- MongoDB acts as the persistent data store
- Stateless backend instances enable horizontal scaling

---

## API Endpoints

### Create Short URL

**POST** `/api/url/shorten`

```json
{
  "originalUrl": "https://example.com"
}
```

### Redirect to Original URL

**GET** `/api/url/:shortCode`

- Cache hit → served from Redis
- Cache miss → fetched from MongoDB and cached

---

## Local Setup

```bash
git clone https://github.com/<username>/url-shortener-backend.git
cd url-shortener-backend
npm install
```

---

## Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/url_shortener
REDIS_URL=redis://127.0.0.1:6379
```

---

## Run services and start server:

```bash
mongod
redis-server
npm run dev
```

---

## Testing

- APIs tested using Postman
- Redirect behavior verified via browser
- Redis caching validated using redis-cli

---

## Future Enhancements

- Docker & Docker Compose for containerized deployment
- URL expiration and TTL support
- Click analytics and usage metrics
- Rate limiting and abuse prevention
- Authentication and API keys
- Cloud deployment (AWS / GCP / Azure)
- Automated unit and integration testing
- Monitoring and logging

---

## Design Notes

- Redis is used as a cache layer to minimize database reads
- Database is accessed only on cache misses
- Architecture follows real-world production patterns

---

## License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this project for personal and commercial purposes.

See the [LICENSE](LICENSE) file for details.