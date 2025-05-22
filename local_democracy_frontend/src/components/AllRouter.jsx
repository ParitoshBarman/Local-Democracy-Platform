import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Laws from "../pages/Laws";
import Feedback from "../pages/Feedback";
import Impact from "../pages/Impact";
import Stories from "../pages/Stories";
import Initiatives from '../pages/Initiatives';
import VotingPage from '../pages/VotingPage';
import MainLayout from '../MainLayout';
import Test from './Test';
import Register from '../pages/RegisterPage';
import Login from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import UploadLaw from '../pages/UploadLaw';
import EditLaw from '../pages/EditLaw';
import RoleBaseProtectedRoute from './RoleBaseProtectedRoute';

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to={'/dashboard'} />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
        <Route path="/laws" element={<MainLayout><Laws /></MainLayout>} />
        <Route path="/feedback" element={<MainLayout><Feedback /></MainLayout>} />
        <Route path="/impact" element={<MainLayout><Impact /></MainLayout>} />
        <Route path="/stories" element={<MainLayout><Stories /></MainLayout>} />
        <Route path="/initiatives" element={<MainLayout><Initiatives /></MainLayout>} />
        <Route path="/voting" element={<MainLayout><VotingPage /></MainLayout>} />
        <Route path="/upload-law" element={<RoleBaseProtectedRoute role={['admin']}><MainLayout><UploadLaw /></MainLayout></RoleBaseProtectedRoute>} />
        <Route path="/edit-law/:id" element={<RoleBaseProtectedRoute role={['admin']}><MainLayout><EditLaw /></MainLayout></RoleBaseProtectedRoute>} />
        <Route path="/test" element={<MainLayout><Test /></MainLayout>} />
      </Route>
    </Routes>
  )
}

export default AllRouter
