# 🌍 CivicQuest  
### AI-Powered Community Engagement Platform

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
