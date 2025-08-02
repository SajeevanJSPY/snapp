# 🚀 Snapp – Real-Time Chat App

**Snapp** is a blazing-fast, modern real-time chat application built with **Next.js**, **PostgreSQL**, and **WebSockets**. Designed to be lightweight, scalable, and developer-friendly, Snapp delivers seamless messaging with instant updates and a clean, responsive UI.

---

## 🌟 Features

- ✅ Real-time messaging (WebSocket-powered)
- 💬 One-on-one and group conversations
- 🕓 Chat history stored in PostgreSQL
- 🧑‍🤝‍🧑 Online/offline presence indicators
- 🌓 Light/dark mode support
- 📱 Responsive design (mobile-first)
- 🛠️ Built with modern tools and best practices

---

## 🧱 Tech Stack

| Layer       | Tech                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Frontend    | [Next.js](https://nextjs.org) (App Router)                                                         |
| Styling     | [Tailwind CSS](https://tailwindcss.com) + [Framer Motion](https://www.framer.com/motion/)          |
| Realtime    | [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)                      |
| Backend API | [Next.js API routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) |
| Auth        | [Auth.js](https://authjs.dev) with JWT sessions                                                    |
| Database    | [PostgreSQL](https://www.postgresql.org)                                                           |
| ORM         | [Prisma](https://www.prisma.io)                                                                    |

---

# Running Locally

### 🐘 Step 1: Start the PostgreSQL Database with Docker

We use PostgreSQL via Docker. To start the database container, run:

```bash
    docker-compose up -d
```

This will spin up a detached container defined in the docker-compose.yml.

### ⚙️ Step 2: Set Up the .env File

Create a **.env** file in the root of the project:

```bash
    cp .env.example .env
```

### 🚀 Step 3: Start the Next.js Application

Now, install dependencies and start the development server:

```bash
    pnpm install
    pnpm dev
```
