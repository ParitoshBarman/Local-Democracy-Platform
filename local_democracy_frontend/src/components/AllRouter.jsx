import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Laws from "../pages/Laws";
import Voting from "../pages/Voting";
import Feedback from "../pages/Feedback";
import Impact from "../pages/Impact";
import Stories from "../pages/Stories";

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/laws" element={<Laws />} />
      <Route path="/voting" element={<Voting />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/initiatives" element={<Stories />} />
    </Routes>    
  )
}

export default AllRouter
