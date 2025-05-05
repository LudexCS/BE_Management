

# 🎮 Ludex Game Management Service

This repository manages the backend service responsible for managing game metadata within the Ludex platform.

---

## 🔧 Responsibilities

- Provides CRUD APIs for game metadata (title, thumbnail, popularity, etc.)
- Retrieves lists of original games and variant (derived) games
- Supports sorting by latest, popularity, or download count
- Applies pagination for scalable list retrieval
- Ensures type-safe validations with DTOs and decorators

---

## 📦 Managed Resources

- Game information (title, thumbnail URL, popularity score, etc.)
- Metadata relationships (origin/variant linkage)

---

## 🛠 Folder Structure

```
src/
  ├── controller/       # API controllers
  ├── service/           # Business logic
  ├── repository/       # Database queries
  ├── entity/           # TypeORM entities
  └── dto/               # Data Transfer Objects
.github/
  └── workflows/          # (Optional) GitHub Actions (if CI/CD applied)
```

---

## 🔐 Security

- Database credentials and sensitive configuration are loaded via environment variables.
- No secrets are hardcoded in the source code.

---

## 📣 How it works

The service exposes RESTful APIs that allow the platform to:
- List games with dynamic sort options
- Fetch original games related to a specific variant
- Fetch variant games based on an original game
- Manage all metadata through authorized endpoints

All operations are structured for scalability, reliability, and ease of integration with other Ludex platform components.

---

© 2025 Ludex. All rights reserved.