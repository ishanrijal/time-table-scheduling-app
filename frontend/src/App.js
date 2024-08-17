import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import HomePage from './Homepage';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Event from './Event';
import EventForm from './EventForm';
import Profile from './Profile';
import CalendarView from './CalendarView';
import LectureView from './LectureView';
import ViewClassRoom from './ViewClassRoom';
import AddClassRoom from './AddClassRoom';
import ViewModules from './viewModules';
import AddModule from './services/AddModule';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-event" element={<Event />} />
            <Route path="view-events" element={<EventForm />} />
            <Route path="user-profile" element={<Profile />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="add-lecture" element={<LectureView />} />
            <Route path="view-classrooms" element={<ViewClassRoom />} />
            <Route path="add-classrooms" element={<AddClassRoom />} />
            <Route path="view-modules" element={<ViewModules />} />
            <Route path="add-modules" element={<AddModule />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;