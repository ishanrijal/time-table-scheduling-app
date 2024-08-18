import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import HomePage from './Homepage';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Event from './Event';
import Profile from './Profile';
import CalendarView from './CalendarView';
import AddLecture from './AddLecture';
import ViewClassRoom from './ViewClassRoom';
import AddClassRoom from './AddClassRoom';
import ViewModules from './ViewModules';
import AddModule from './services/AddModule';
import ViewConflicts from './ViewConflict';
import AddConflict from './AddConflict';
import ProtectedRoute from './ProtectedRoute';
import RedirectIfLoggedIn from './RedirectIfLoggedIn';
import DashboardInformation from './DashboardInformation';
import ViewLectures from './ViewLectures';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
        <Route path="/signup" element={<RedirectIfLoggedIn element={<Signup />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="information" element={<ProtectedRoute element={<DashboardInformation />} />} />
          <Route path="add-event" element={<ProtectedRoute element={<Event />} />} />
          <Route path="user-profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="calendar" element={<ProtectedRoute element={<CalendarView />} />} />
          <Route path="add-lecture" element={<ProtectedRoute element={<AddLecture />} />} />
          <Route path="view-lecture" element={<ProtectedRoute element={<ViewLectures />} />} />
          <Route path="view-classrooms" element={<ProtectedRoute element={<ViewClassRoom />} />} />
          <Route path="add-classrooms" element={<ProtectedRoute element={<AddClassRoom />} />} />
          <Route path="view-modules" element={<ProtectedRoute element={<ViewModules />} />} />
          <Route path="add-modules" element={<ProtectedRoute element={<AddModule />} />} />
          <Route path="view-conflicts" element={<ProtectedRoute element={<ViewConflicts />} />} />
          <Route path="add-conflicts" element={<ProtectedRoute element={<AddConflict />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;