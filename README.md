# Buhari Hotel – Waiter Ordering System

A simple, professional ordering app for restaurant staff. Built with Next.js 14 and TypeScript.

## Quick Start

```bash
# 1) Clone
git clone https://github.com/rgayashan/buhari-hotel.git
cd buhari-hotel

# 2) Install (Node 18+)
npm install

# 3) Run in dev
npm run dev
# Open http://localhost:3000

# 4) Build and start (production)
npm run build
npm start
```

## Demo Login
- Email: `demo@buhari.com`
- Password: `demo123`

## How It Works
- Take Order tab: select one main dish, one or more side dishes, desserts optional.
- You must also enter a table number.
- Click Place Order to save. Orders and Reports update instantly.

## Project Structure (high level)
- `app/` Next.js app router pages and layout
- `components/` UI, Order flow, Reports, Layout
- `hooks/useOrders.ts` order state, validations, storage
- `utils/` calculations, storage, simple demo auth
- `public/images/` logo and images

## Scripts
- `npm run dev`: start dev server
- `npm run build`: build for production
- `npm start`: run production server
- `npm run lint`: lint code
- `npm run type-check`: TypeScript check

## Best Practices (short)
- Keep components small and focused; use clear names.
- Avoid deep nesting; use early returns.
- Type everything; avoid `any`.
- Do not catch errors silently; handle meaningfully.
- Match existing formatting; do not reformat unrelated code.
- Use localStorage only for demo auth; never for real secrets.

## Troubleshooting
- Node 18+ required (see `package.json` engines).
- If port is busy, run with another port: `PORT=3001 npm run dev`.
- Clear demo data: clear browser localStorage.


