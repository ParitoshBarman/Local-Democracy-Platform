
# Local Democracy Engagement Platform

> **Hackathon Submission** by *Paritosh Barman* (Student at Masai)

A solo-built full-stack web application designed to **strengthen civic engagement** by making local government accessible, interactive, and impactful for citizens.

---

## Problem Statement

Local civic engagement is declining due to lack of transparency, accessibility, and real-time interaction between the government and citizens. This platform addresses that gap by offering:

- Real-time alerts on local issues
- Easy-to-understand summaries of local policies
- Direct public feedback channels to representatives
- Community-based voting on civic concerns
- Visualization of the policy impact on neighborhoods
- Tools to start and track community initiatives

---

## Solution Overview

This application directly addresses each point in the problem statement through the following modules:

### ✅ Real-time Notifications  
Citizens receive automatic alerts (every 5 seconds for demo) about local issues like water cuts, electricity outages, community events, etc., via WebSockets.

- **Tech Used:** `Socket.IO`, `Node.js`, `React`, `Redux`
- **Example Notifications:** Road repairs, vaccination drives, community meetings, etc.

### ✅ Plain Language Legislation Summaries (Stories Page)  
Civic legislation is broken down into easy-to-read “story cards” to help users understand what's being proposed in their area.

- **UI Elements:** Chakra UI cards, categorized by type (infrastructure, public safety, etc.)

### ✅ Feedback System  
Users can submit suggestions, complaints, or feedback for local representatives, simulating a public communication loop.

- **Planned Extension:** Admin portal for reps to publicly respond and track resolutions.

### ✅ Community Voting  
Voting interface where citizens can express opinions on current proposals or local decisions. Results can be viewed in real-time.

- **Aggregate system:** Votes stored and visualized on a results page.

### ✅ Policy Impact Visualization  
Dedicated section to highlight how passed policies have affected the community — currently shows static data, future updates will support dynamic impact charts.

### ✅ Initiatives  
Citizens can view or start local initiatives like cleanliness drives, awareness events, and street maintenance efforts.

---

## Technology Stack

| Layer        | Tools Used                                                                 |
|--------------|----------------------------------------------------------------------------|
| **Frontend** | React.js, Chakra UI, Redux Toolkit, React Router                     |
| **Backend**  | Node.js, Express.js, Socket.IO                                             |
| **State**    | Redux Toolkit                                                              |
| **Deployment** | Netlify (Frontend), Render (Backend)                                   |

---

## Folder Structure

```
Local-Democracy-Platform/
│
├── local_democracy_backend/
│   └── index.js                  # Express server with WebSocket support
│
├── local_democracy_frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotificationComponent.jsx
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── VotingPage.jsx
│   │   │   ├── ImpactPage.jsx
│   │   │   ├── StoriesPage.jsx
│   │   │   ├── InitiativesPage.jsx
|   |   ├── pages/
|   |   |   ├── Dashboard.jsx
|   |   |   ├── Feedback.jsx
|   |   |   ├── Impact.jsx
|   |   |   ├── Initiatives.jsx
|   |   |   ├── Laws.jsx
|   |   |   ├── Notifications.jsx
|   |   |   ├── Stories.jsx
|   |   |   ├── Voting.jsx
|   |   |   ├── VotingPage.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── notificationsReducer.js
│   │   ├── MainLayout.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│
├── public/
│   └── index.html
```

---

## Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/ParitoshBarman/Local-Democracy-Platform.git

```

2. **Start the Backend**

```bash
cd local_democracy_backend
npm install
node index.js
npm run dev
```

3. **Start the Frontend**

```bash
cd local_democracy_frontend
npm install
npm start
npm run dev
```

Allow CORS and correctly.

---

## Live Demo

- **Frontend:** [Netlify Deployment](https://local-democracy-platform.netlify.app)
- **Backend (WebSocket):** [Render Deployment](https://local-democracy-platform.onrender.com)

---

## 📸 Screenshots

### 🏠 Dashboard
<img src="screenshots\Screenshot (116).png" alt="Dashboard Screenshot">

### 🔔 Notifications
<img src="screenshots\Screenshot (117).png" alt="Notifications Screenshot">

### 📜 Laws
<img src="screenshots\Screenshot (118).png" alt="Laws Screenshot">

### 🗳️ Voting
<img src="screenshots\Screenshot (119).png" alt="Voting Screenshot">

### 💬 Feedback
<img src="screenshots\Screenshot (120).png" alt="Feedback Screenshot"

### 📊 Impact
<img src="screenshots\Screenshot (121).png" alt="Impact Screenshot">

### 🧑‍🤝‍🧑 Stories
<img src="screenshots\Screenshot (122).png" alt="Stories Screenshot">

### 🌱 Initiatives
<img src="screenshots\Screenshot (123).png" alt="Initiatives Screenshot">

### 🗂️ Voting Results
<img src="screenshots\Screenshot (124).png" alt="Voting Results Screenshot">


---

## Author

**Paritosh Barman**  

