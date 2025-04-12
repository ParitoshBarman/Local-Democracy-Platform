
# Local Democracy Engagement Platform

> **Hackathon Submission** by *Paritosh Barman* (Student at Masai School)

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
| **Frontend** | React.js, Chakra UI, Redux Toolkit, SCSS, React Router                     |
| **Backend**  | Node.js, Express.js, Socket.IO                                             |
| **State**    | Redux Toolkit                                                              |
| **Deployment** | Netlify (Frontend), Render (Backend)                                   |

---

## Folder Structure

```
local-democracy/
│
├── backend/
│   └── index.js                  # Express server with WebSocket support
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotificationComponent.jsx
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── VotingPage.jsx
│   │   │   ├── ImpactPage.jsx
│   │   │   ├── StoriesPage.jsx
│   │   │   ├── InitiativesPage.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── notificationsSlice.js
│   │   ├── App.jsx
│   │   ├── index.js
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

- **Frontend:** [local-democracy-platform.netlify.app](https://local-democracy-platform.netlify.app)
- **Backend (WebSocket):** [Render Deployment](https://local-democracy-platform.onrender.com)

---

## Author

**Paritosh Barman**  

