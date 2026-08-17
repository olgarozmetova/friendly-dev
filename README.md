# The Friendly Dev

Personal website and portfolio built with React Router 8 in framework mode, with server-side rendering, TypeScript and Tailwind CSS.

## Stack

- **React Router 8** (framework mode) with SSR and layout routes
- **React 19**
- **TypeScript**, with `~/` aliased to `app/`
- **Tailwind CSS 4** via the Vite plugin, dark theme by default
- **Vite 8** as bundler and dev server
- **react-icons** for icons
- **json-server** to mock a REST API from `data/db.json` during development

## Requirements

- Node.js 22.12 or newer

## Getting started

Install the dependencies:

```bash
npm install
```

This project needs **two processes running in parallel** during development. In one terminal, start the mock API:

```bash
npm run json-server
```

It serves on `http://localhost:8000`, with the projects available at `http://localhost:8000/projects`.

In another terminal, start the app with hot module replacement:

```bash
npm run dev
```

It serves on `http://localhost:5173`.

> Without `json-server` running, the projects page fails to load, since its `loader` fetches the data from that API.

## Scripts

- `npm run dev` — dev server with HMR
- `npm run json-server` — mock REST API on port 8000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run typecheck` — generate route types and run the TypeScript check

## Pages

The site has five pages: the home page with the hero and its call-to-action links, an about page, a projects page showing a grid of cards loaded from the API, plus a blog and a contact page that are still placeholders.

Routes are grouped into two layouts. The home layout renders the hero above the page content, while every other page shares only the centered container.

## Data

Projects live in `data/db.json` and are fetched in the route `loader`, which means on the server:

```ts
export async function loader(): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects')
  const data = await res.json()
  return { projects: data }
}
```

Each project follows the `Project` type defined in `app/types.ts`, with a title, description, image, URL, date, category and a featured flag.

## Styling

Tailwind CSS 4 is configured directly in `app/app.css`, with no `tailwind.config.js` file. The dark theme is always on through a `dark` class on the `<html>` element, and the `dark:` variant uses the class strategy instead of the system preference, so adding a light/dark toggle later only means toggling that class.

## Deployment

The project ships with a ready-to-use `Dockerfile`:

```bash
docker build -t friendly-dev .
docker run -p 3000:3000 friendly-dev
```

You can also deploy the output of `npm run build` to any platform that runs Node.
