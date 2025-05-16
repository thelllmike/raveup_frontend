import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RacingRegister'
import Navbar from './Navbar'
import Footer from './Footer'
import RacingLogin from './pages/RacingLogin'
import RacingHomepage from './pages/RacingHome'
import RacingProfile from './pages/RacingProfile'
import RacingDashboard from './pages/RacingDashboard'
import RacerRegistrationForm from './pages/RacingRegister'
import RacerManagement from './pages/RacerManagement'
import RaceManagement from './pages/RaceManagement'
import LeaderBoard from './pages/LeaderBoard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<RacingLogin />} />
        <Route path="/" element={<RacingHomepage />} />
        <Route path="/profile" element={<RacingProfile />} />
        <Route path="/dashboard" element={<RacingDashboard />} />
        <Route path="/racer" element={<RacerManagement />} />
        <Route path="/race" element={<RaceManagement />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        
      </Routes>
      <Footer  />
    </BrowserRouter>
  )
}

export default App
