import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import LandingPage from './pages/landingPage';
import Dashboard from './pages/home/Dashboard';
import InterviewPrep from './pages/interviewPrep/interviewPrep';
import UserProvider from './context/UserProvider';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </Router>
      
      <Toaster toastOptions={{ className: '', style: { fontSize: '13px' } }} />
    </div>
    </UserProvider>
  );
};

export default App;
