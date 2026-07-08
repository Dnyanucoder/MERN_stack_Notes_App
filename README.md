# MERN Notes App

This is a small notes app I made while learning the MERN stack (MongoDB, Express, React, Node.js). You can register, log in, and then add/edit/delete your own notes.

I built this mainly to practice connecting a React frontend to a Node/Express backend, using a real database instead of just hardcoded data, and figuring out how login/auth actually works with JWT.

## Features

- Register a new account
- Log in / log out
- Add a note
- Edit a note
- Delete a note
- Each user can only see their own notes (not everyone else's)

## Tech I used

- **Frontend:** React (made with Vite), React Router for pages, Axios to call the backend
- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Token) + bcrypt for hashing passwords

## Folder structure

```
mern-notes-app/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── db/
│       │   ├── db.js
│       │   └── models/       (user.model.js, note.model.js)
│       ├── middleware/       (checks if user is logged in)
│       ├── controllers/      (main logic for auth + notes)
│       └── routes/           (API endpoints)
└── frontend/
    └── src/
        ├── App.jsx
        ├── api.js
        └── pages/
            ├── Register.jsx
            ├── Login.jsx
            └── Notes.jsx      (add/edit/delete notes here)
```

## How to run this on your own computer

You'll need Node.js installed, and a MongoDB database (I used the free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder (copy `.env.example` and rename it) and add:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_random_long_string
PORT=3000
CLIENT_URL=http://localhost:5173
```

Then start it:

```bash
npm start
```

If it worked, you'll see:
```
Database connected
Server is running on port 3000
```

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

It'll give you a link, usually `http://localhost:5173`. Open that in your browser.

You should be able to register an account and start adding notes.

## API endpoints

| Method | Route | Needs login? | What it does |
|---|---|---|---|
| POST | /api/auth/register | No | Create a new account |
| POST | /api/auth/login | No | Log in |
| POST | /api/auth/logout | No | Log out |
| GET | /api/auth/me | Yes | Check who's logged in |
| GET | /api/notes | Yes | Get all your notes |
| POST | /api/notes | Yes | Add a note |
| PATCH | /api/notes/:id | Yes | Update a note |
| DELETE | /api/notes/:id | Yes | Delete a note |

## Things I learned while building this

- How JWT works — the server creates a token when you log in, and that token is checked on every request after that to know who you are
- Why passwords should never be saved as plain text (used bcrypt to hash them before saving)
- What CORS is and why the frontend couldn't talk to the backend until I added it
- The difference between PATCH (update part of something) and PUT/DELETE
- Keeping `.env` out of GitHub so passwords/secrets don't get exposed

## Still learning / things to improve

- No error messages are very detailed yet, could make them more user-friendly
- No pagination — if someone has 100+ notes the list will get long
- No tests written yet
- Styling is very basic, want to improve it later

## Note

This project doesn't come with a database — you need to add your own MongoDB connection string in the `.env` file for it to work.
