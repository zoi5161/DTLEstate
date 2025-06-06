import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Manage from './pages/Manage/Manage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import PrivateRoute from './components/PrivateRoute';
import Estate from './pages/Estate/Estate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Login />} />
        <Route
          path="/Manage"
          element={
            <PrivateRoute>
              <Manage />
            </PrivateRoute>
          }
        />
        <Route path="/Estate/:id" element={<Estate />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
