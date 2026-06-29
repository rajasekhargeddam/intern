# My App

A React + TypeScript + Vite application for discovering posts. It pairs a searchable, paginated posts feed (backed by the JSONPlaceholder API) with a cookie-based authentication flow (login, signup, profile, and logout) served by a separate backend.

## Overview

The app has two areas:

- **Auth** (`/auth/login`, `/auth/signup`) — sign in or create an account. Auth requests are sent with credentials so the server can set a session cookie.
- **Posts** (`/`) — a protected route that fetches the current user's profile before rendering. If no authenticated user is found, the visitor is redirected to the login page. Once in, users can search posts, browse paginated results, and log out.

## Features

- Cookie-based authentication: login, signup (with password confirmation and show/hide toggle), and logout
- Protected home route guarded by a profile loader that redirects unauthenticated users
- Full-text search over post title and body
- Pagination with numbered page buttons plus previous/next controls
- Shimmer skeleton UI while posts load
- Dedicated empty-state and error-state views
- Responsive post cards styled with Tailwind CSS

## Technology stack

- React 19
- TypeScript
- Vite
- React Router (data router with route loaders)
- Tailwind CSS
- JSONPlaceholder API (posts data)

## Project structure

```
src/
├── App.tsx                     # Router configuration (routes, layouts, loader)
├── main.tsx                    # App entry point
├── layouts/
│   ├── AuthLayout.tsx          # Layout for the /auth routes
│   └── MainLayout.tsx          # Protected layout: header + auth guard
├── pages/
│   ├── Home.tsx                # Posts feed: search, pagination, state handling
│   ├── Login.tsx               # Login form
│   └── SignUp.tsx              # Signup form
├── components/
│   ├── Header.tsx              # Top bar with username and logout
│   ├── Card.tsx                # Single post card
│   ├── CardList.tsx            # Grid of post cards
│   ├── NoPostsView.tsx         # Empty-state view
│   └── FailedView.tsx          # Error-state view
├── shimmerUi/
│   ├── ShimmerPosts.tsx        # Loading skeleton container
│   └── ShimmerCard.tsx         # Skeleton card
├── services/
│   └── profile.ts              # Route loader that fetches the logged-in user
├── constants/
│   ├── api.ts                  # API endpoints and pagination size
│   └── const-data.ts           # Loading/success/failed status values
└── types/
    ├── auth.ts                 # Auth request/response interfaces
    └── post.ts                 # Post interface
```

## API endpoints

Endpoints are defined in [src/constants/api.ts](src/constants/api.ts):

- Posts: `https://jsonplaceholder.typicode.com/posts`
- Auth (expects a backend at `http://localhost:3000`):
  - `POST /login`
  - `POST /signup`
  - `POST /logout`
  - `GET /profile`

The auth features require a backend running at `http://localhost:3000` that handles these routes and sets a session cookie. The posts feed works on its own without a backend.

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build the production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
