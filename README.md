# 🌍 CivicQuest — Community Events Portal

CivicQuest (a hackathon prototype) helps employees and families discover, register for, and manage local volunteering and sustainability events. It also includes a small gamified learning module and basic admin tools.

Summary of what's included
- Node.js + Express backend with EJS views
- Sequelize models (User, Event, UsersEventsMapping)
- Static frontend in `Public/` (HTML/CSS/JS) and EJS templates in `views/`
- Utilities for GeoIP lookup and email integration (Azure Logic App)
- Sample seed data created at startup (see `index.js`)

## Quick start

Prerequisites
- Node.js 14+ and npm

Install dependencies

```bash
npm install
```

Start (development)

```bash
npm start
```

Start (production)

```bash
node index.js
```

Open http://localhost:7000

## Details

- Default port: `7000` (changeable in `index.js`)
- Default DB: in-memory SQLite (see `Utils/SqlDb.js`)
- Demo user: `reddygovardhan6826@gmail.com` is created by the seed block in `index.js`

## Configure a persistent DB

Edit `Utils/SqlDb.js` and replace the in-memory connection with file-based SQLite:

```javascript
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' });
module.exports = sequelize;
```

Or set `process.env.DATABASE_URL` and use a Postgres/MySQL connection string.

## Endpoints (examples)

- `GET /` — main page (public)
- `GET /game` — game page
- `GET /location` — geoip lookup (used by community pages)

User flows (EJS)
- `GET /UserLogin`, `POST /UserLogin`
- `GET /UserRegister`, `POST /UserRegister`
- `GET /UserHome` (protected)

Events API (JSON)
- `POST /events/register` — register a user for event (guest or logged-in)
- `GET /events/:id` — get event (add `?users=1` to include registrations)
- `GET /events?city=&status=` — filter events
- `POST /events` — create event (sends group email to subscribed users)
- `PUT /events` — edit event

## Email sending

`Utils/SendMail.js` calls an Azure Logic App endpoint. To use SMTP instead, replace its implementation with `nodemailer` and environment variables for SMTP credentials.

## Screenshots

Captured screenshots are included in `/screenshots` and displayed here:

![Home](/screenshots/home.png)

![Game](/screenshots/game.png)

![Community Home](/screenshots/communityHome.png)

![User Login](/screenshots/userLogin.png)

![User Register](/screenshots/userRegister.png)

## Notes & troubleshooting

- If push/pull or other GitHub operations require credentials, configure a GitHub Personal Access Token (PAT) and use it when prompted, or set up SSH keys.
- Do not run `node start` — use `npm start` or `node index.js`.
- If `sqlite3` is missing: `npm install sqlite3`.

## Contributing

Open issues or PRs for fixes and docs improvements.

## License

Add a LICENSE file if you wish to publish under a specific open-source license.

---
If you'd like, I can: add a `serve` script to `package.json`, update `index.js` to use `process.env.PORT`, or change `Utils/SqlDb.js` to use file-based SQLite — tell me which and I'll apply the change.

CivicQuest is a hackathon (Hexathon) prototype built to empower employees and families to contribute meaningfully to society.

Many individuals want to volunteer or participate in community initiatives but don’t know where to start. CivicQuest bridges that gap by:

- Discovering local volunteering events
- Enabling seamless event registration
- Gamifying sustainability education for children
- Providing AI-powered assistance via Azure Bot
- Offering an admin portal to manage community initiatives

This project combines community impact, gamification, and AI into one integrated platform.

---

## 🚀 Problem Statement

Employees often want to:
- Contribute to social causes
- Participate in local sustainability events
- Engage their children in meaningful learning

However, discovering reliable local opportunities and staying engaged is difficult.

CivicQuest solves this by centralizing community events and adding interactive, AI-driven engagement.

---

## ✨ Key Features

### 🗓️ Community Events Discovery
- Displays volunteering and sustainability events in the user's locality
- Filters events using GeoIP-based city lookup
- Shows detailed event information:
  - Date & time
  - Location
  - Categories
  - Maximum seats
  - Current registrations
- Allows users to register for open events

---

### 🛠️ Admin Dashboard (Event Management)
- Secure admin login
- Create new events
- Edit existing events
- Delete events
- Manage:
  - Event capacity
  - Status (open/closed)
  - City/state
  - Categories
  - Images

This enables organizations to easily manage and publish community initiatives.

---

### 🎮 Gamified Learning Mode (Eco Guardians)
- Mario-style side-scrolling experience
- “Did you know?” eco facts displayed during gameplay
- Makes sustainability learning engaging for children
- Encourages learning while playing

---

### 🤖 Eco Assistant (Azure Bot Integration)
- Embedded Azure Bot Framework WebChat
- AI assistant answers questions based on curated local resource data
- Helps users:
  - Find relevant events
  - Understand sustainability topics
  - Get guidance on participation

---

### 📍 Location-Aware Personalization
- Uses GeoIP lookup
- Automatically detects user locality
- Displays relevant local events

---

### ✉️ Email Integration (Optional)
- Azure Logic Apps integration
- Can trigger event-related email notifications
- Useful for confirmations and group communication

---

## 🧱 System Architecture
Frontend (HTML, CSS, JS, EJS)
├── Community Pages
├── Game Module
├── Chatbot Widget
↓
Node.js + Express Backend
├── Route Handling
├── GeoIP Location Detection
├── Event Registration Logic
├── Admin CRUD
├── Azure Bot Integration
└── Azure Logic App Email Trigger
↓
SQLite Database (Sequelize ORM)
├── Users
├── Events
└── User-Event Mapping

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- EJS
- Sequelize ORM
- SQLite

### Frontend
- HTML5
- CSS3
- Bootstrap
- Vanilla JavaScript

### Integrations
- Azure Bot Framework (WebChat)
- Azure Logic Apps (Email trigger)
- GeoIP Lookup

---

## 🗃️ Database Design

### Event Model
- Title
- Description
- Event Date & Time
- Location
- City / State
- Max Seats
- Current Participants
- Status (Open/Closed)
- Categories
- Images

### User Model
- Basic authentication fields
- Profile data

### UsersEventsMapping
- Many-to-many relationship
- Tracks event registrations

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install Dependencies

```bash
npm install

#Run the Application
npm start

# Default:
http://localhost:7000

```
👨‍💻 Author

Govardhan Reddy Narala
>>>>>>> origin/main
