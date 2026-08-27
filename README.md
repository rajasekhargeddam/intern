# Orbit

A simple social media web app built with React.

Users can create posts, connect with people, chat, like/save posts, and search.

> You also need the **backend API** running (default: `http://localhost:3000`).

---

## What you can do

- Sign up (with OTP) and log in
- Create, edit, and delete posts (images or video)
- Like, save, and comment on posts
- Discover people and send connection requests
- Chat in real time
- Search posts, people, and tags
- Edit your profile
- Admin users can manage accounts

---

## Tech used

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query
- Socket.io (chat)
- React Icons

---

## How to run

1. Make sure the backend is running on port `3000`
2. Install packages:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

---

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code with ESLint |

---

## Project folders (`src/`)

| Folder | What’s inside |
| --- | --- |
| `pages/` | Full screens (Login, Feed, Chat, etc.) |
| `components/` | Reusable UI pieces |
| `layouts/` | Page layouts (main, profile, chat, admin) |
| `services/` | API calls to the backend |
| `hooks/` | Custom React hooks |
| `context/` | Shared app state (user, scroll) |
| `shimmer/` | Loading skeletons |

---

## Main pages

| Path | Page |
| --- | --- |
| `/auth/login` | Login |
| `/auth/signup` | Sign up |
| `/` | Home feed (posts) |
| `/discover` | Discover people |
| `/search` | Search |
| `/profile` | Your profile |
| `/chat` | Messages |
| `/notifications` | Connection requests |
| `/admin` | Admin panel (admins only) |
