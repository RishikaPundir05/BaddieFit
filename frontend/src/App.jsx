import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WorkoutSession from './pages/WorkoutSession.jsx'
import Progress from './pages/Progress.jsx'
import Rewards from './pages/Rewards.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  return (
    <div className="min-h-screen pb-24">
      <Routes>
        <Route path="/"                       element={<Home />} />
        <Route path="/workout/:category"      element={<WorkoutSession />} />
        <Route path="/progress"              element={<Progress />} />
        <Route path="/rewards"               element={<Rewards />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
