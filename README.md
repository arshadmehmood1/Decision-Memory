# 🧠 Decision Memory

Strategic decision tracking for high-velocity teams. This repository contains the full stack for the Decision Memory platform.

## 🏗️ Project Structure

- **[/frontend](file:///d:/Decision-Memory/frontend)**: Next.js 15 application with Cinematic UI/UX.
- **[/backend](file:///d:/Decision-Memory/backend)**: Express.js API with Prisma ORM and Neural risk analysis logic.

## 🚀 Quick Start (Local Development)

> [!NOTE]
> These commands are for local development. For production (Vercel/Render), see the [Deployment](#-deployment) section.

1. **Setup Backend**:
   ```bash
   cd backend && npm install && cp .env.example .env && npx prisma migrate dev && npm run dev
   ```

2. **Setup Frontend**:
   ```bash
   cd frontend && npm install && cp .env.example .env.local && npm run dev
   ```

## 🛰️ Deployment

### Vercel (Frontend)
1. **Root Directory**: Set to `frontend`.
2. **Environment Variables**: Add your `NEXT_PUBLIC_API_URL` and Clerk keys in the Vercel Dashboard.
3. **Build Command**: Use default (`npm run build`). Do **not** use `npm run dev` or `cp` in the build command.

### Render / Railway (Backend)
1. **Root Directory**: Set to `backend`.
2. **Build Command**: `npm install && npm run build`.
3. **Start Command**: `npm run start`.

For full details, environment registries, and infrastructure recommendations, refer to the **[Neural Deployment Plan](file:///C:/Users/Arshad/.gemini/antigravity/brain/2f55b5bf-00ca-4448-a346-ae358c64a4af/deployment_plan.md)**.

## 🛡️ Identity & Access
The platform uses **Clerk** for authentication and RBAC. Ensure your `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are synchronized across both tiers.

---
*Created by Antigravity - Advanced Agentic Coding*
