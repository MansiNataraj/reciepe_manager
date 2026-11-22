# Recipe Book (Recipe Manager)

A MERN-stack single-page app for storing, searching and organising cooking recipes.

## Stack
- Front end: React 18, React Router 6, CSS (Vite)
- Back end: Node.js, Express (REST API)
- Database: MongoDB with Mongoose

## Setup
Requires Node 18+ and a local MongoDB running on `mongodb://localhost:27017`.

```bash
# 1. API
cd server
npm install
npm run seed     # optional: load 3 sample recipes
npm run dev      # http://localhost:5000

# 2. Front end (new terminal)
cd client
npm install
npm run dev      # http://localhost:5173
```

Configuration lives in `server/.env` (see `server/.env.example`).

## API
| Method | Route | Description |
|---|---|---|
| GET | `/api/recipes?search=&category=&favourite=true` | List / search / filter |
| GET | `/api/recipes/:id` | Single recipe |
| POST | `/api/recipes` | Create |
| PUT | `/api/recipes/:id` | Update |
| PATCH | `/api/recipes/:id/favourite` | Toggle favourite |
| DELETE | `/api/recipes/:id` | Delete |
| GET | `/api/categories` | Category list |

## Features
Add / edit / delete recipes, card and list views, search by name or ingredient, category filter, favourites page.

## Photo credits
Sample and banner photos are hotlinked from Wikimedia Commons (free licences; see each file page for author and licence):
Omelette.JPG, Masala Dosa (Bengaluru).JPG, Pancakes (Unsplash CKipn7XSyEU).jpg, Greek Salad from Thessaloniki.jpg,
Hyderabadi Chicken Biryani.jpg, Hyderabadi Vegetable Biryani.jpg, Paneer Butter Masala.jpg, Bowl of Gulab Jamun.JPG,
Samosa 1.jpg, Masala Chai.JPG.
