import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'
import Home from './pages/Home'
import TournamentPlay from './pages/TournamentPlay'
import PlayerVsPlayer from './pages/PlayerVsPlayer'
import Leaderboard from './pages/Leaderboard'
import RecentGames from './pages/RecentGames'

const App = () => {

  const PrivateRouter = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<PrivateRouter><Home /></PrivateRouter>} />
        <Route path='/start' element={<PrivateRouter><TournamentPlay /></PrivateRouter>} />
        <Route path='/player' element={<PrivateRouter><PlayerVsPlayer /></PrivateRouter>} />
        <Route path='/leaderboard' element={<PrivateRouter><Leaderboard /></PrivateRouter>} />
        <Route path='/recentgame' element={<PrivateRouter><RecentGames /></PrivateRouter>} />
      </Routes>
    </div>
  )
}

export default App