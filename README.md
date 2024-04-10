# Event Management System APIs
Welcome to Your Ultimate Event Hub: Where Organizers Craft Unforgettable Experiences and Attendees Discover Thrilling Moments, All in One Dynamic Platform!

## Table of Contents
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [License](#license)

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Features

- Authentication and authorization using JSON Web Tokens (JWT)
- Implemented RBAC
- Attendees can view, search events
- CRUD operations for events for event organizers
- Attendees can register themselves on event
- Error handling and validation
- API documentation using Swagger

## Tech Stack

This project is built with the following technologies:

- **ExpressJS**: Fast, unopinionated, minimalist web framework for Node.js
- **TypeScript**: A statically typed superset of JavaScript
- **MongoDB**: A flexible database that stores information in JSON-like documents and scales easily for large applications.
- **Mongoose**: An elegant mongodb object modeling for node.js
- **npm**: Package manager
- **Prettier**: For code formatting
- **Swagger**: API documentation tool

## Project Structure

The project follows a structured layout:

```
📦src
 ┣ 📂controllers    # App controllers
 ┣ 📂docs           # Swagger doc file
 ┣ 📂Interfaces     # Types/interfaces 
 ┣ 📂middlewares    # App middlewares
 ┣ 📂models         # Database models
 ┣ 📂routes         # App routes
 ┣ 📂utils          # App utilities
 ┣ 📂validators     # Validation schemas
 ┗ 📜app.ts         # Entry point (Main file)
```

## Getting Started

To start using the project, ensure you have Node.js, npm, and MongoDB installed.

1. **Clone the repository:**

```bash
  git clone https://github.com/TresorRw/event-web-bn.git
  cd event-web-bn
```

2. **Install Dependencies:**

```bash
  npm install
```

3. **Configure Environment:**

  Copy .env.example variable into .env and replace them with your desired values 

4. **Start the App:**
Before starting the app you must make sure that MongoDB service is running

```bash
  npm run dev
```

Access the API at `http://localhost:${port}` and explore the endpoints in the Swagger documentation at `http://localhost:${port}/api/docs`.

## Deployment
This app is hosted on render and for cloud database it is using mongodb atlas
- **Deployed app url**: [https://event-mgmt-n70w.onrender.com](https://event-mgmt-n70w.onrender.com)

## License
This project is licensed under the MIT License.

---
[@TresorRw](https://github.com/TresorRw) <br />
[My Portfolio](https://catresor.vercel.app)