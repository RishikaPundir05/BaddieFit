import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReward } from '../context/RewardContext.jsx'
import { useWorkout } from '../context/WorkoutContext.jsx'
import { WORKOUT_CATEGORIES, getRandomCategory } from '../utils/workoutData.js'
import WorkoutCard from '../components/WorkoutCard.jsx'
import CouponBadge from '../components/CouponBadge.jsx'
import StreakTracker from '../components/StreakTracker.jsx'
import JustStartButton from '../components/JustStartButton.jsx'

const ADHD_QUOTES = [
  '★ JUST START IT WILL BE OVER BEFORE YOU KNOW IT ★',
  '★ 5 MINUTES IS ALL YOU NEED ★',
  '★ DONE IS BETTER THAN PERFECT ★',
  '★ YOUR FUTURE SELF SAYS THANK YOU ★',
  '★ ONE REP IS BETTER THAN ZERO ★',
  '★ YOU LITERALLY CANNOT FAIL THIS ★',
  '★ BODY BUILT DIFFERENT TODAY ★',
  '★ DOPAMINE LOADING... ★',
]

const RIGHT_QUOTES = [
  '★ BADDIES MOVE THEIR BODY ★',
  '★ THIS IS YOUR SIGN TO WORK OUT ★',
  '★ STRONG IS THE NEW EVERYTHING ★',
  '★ YOU CAME THIS FAR DON\'T STOP ★',
  '★ CHAOS ENERGY → GYM ENERGY ★',
  '★ ADHD SUPERPOWER ACTIVATED ★',
  '★ HYPERFOCUS ON THE GAINS ★',
]

export default function Home() {
  const navigate = useNavigate()
  const { unusedCoupons, streak } = useReward()
  const { startWorkout } = useWorkout()
  const [showManage, setShowManage] = useState(false)
  const [hiddenCategories, setHiddenCategories] = useState([])

  function handleSelect(category) {
    startWorkout(category.id)
    navigate(`/workout/${category.id}`)
  }

  function handleJustStart() {
    const available = WORKOUT_CATEGORIES.filter(c => !hiddenCategories.includes(c.id))
    const pool = available.length > 0 ? available : WORKOUT_CATEGORIES
    const random = pool[Math.floor(Math.random() * pool.length)]
    startWorkout(random.id)
    navigate(`/workout/${random.id}?mode=juststart`)
  }

  function toggleCategory(id) {
    setHiddenCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const visibleCategories = WORKOUT_CATEGORIES.filter(c => !hiddenCategories.includes(c.id))

  return (
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Left Quote Sidebar */}
      <div style={{
        width: '32px', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '20px', overflow: 'hidden', maxHeight: '100vh',
      }}>
        <div className="quote-sidebar">
          {[...ADHD_QUOTES, ...ADHD_QUOTES].join('   ')}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '16px 12px', maxWidth: '480px', margin: '0 auto' }}>

        {/* Desktop Window — Header */}
        <div className="win95-panel pixel-enter mb-4">
          <div className="win95-titlebar">
            <span>💜 BaddieFit.exe</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div className="win95-titlebar-btn">_</div>
              <div className="win95-titlebar-btn">□</div>
              <div className="win95-titlebar-btn">✕</div>
            </div>
          </div>
          <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', color: '#880e4f', marginBottom: '4px' }}>
                WELCOME BACK<span className="blink">_</span>
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#e91e8c' }}>
                Choose ur workout bestie 💜
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <StreakTracker count={streak.count} />
              <CouponBadge count={unusedCoupons.length} />
            </div>
          </div>
        </div>

        {/* Just Start Button */}
        <div className="mb-4">
          <JustStartButton onPress={handleJustStart} />
        </div>

        {/* Manage Workouts toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(173,20,87,0.7)' }}>
            SELECT WORKOUT:
          </div>
          <button
            onClick={() => setShowManage(v => !v)}
            className="pixel-btn"
            style={{ fontSize: '7px', padding: '4px 10px', fontFamily: "'Press Start 2P', monospace" }}
          >
            {showManage ? '✓ DONE' : '⚙ MANAGE'}
          </button>
        </div>

        {/* Manage panel */}
        {showManage && (
          <div className="win95-panel mb-4 pixel-enter">
            <div className="win95-titlebar">
              <span>⚙ Manage Workouts</span>
              <div className="win95-titlebar-btn" onClick={() => setShowManage(false)}>✕</div>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                Toggle workouts on/off:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {WORKOUT_CATEGORIES.map(cat => {
                  const isHidden = hiddenCategories.includes(cat.id)
                  return (
                    <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        className="win95-panel-inset"
                        style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                        onClick={() => toggleCategory(cat.id)}
                      >
                        {!isHidden && <span style={{ fontSize: '10px', lineHeight: 1 }}>✓</span>}
                      </div>
                      <span style={{ fontFamily: "'VT323', monospace", fontSize: '18px' }}>
                        {cat.emoji} {cat.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Workout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {visibleCategories.map(cat => (
            <WorkoutCard key={cat.id} category={cat} onClick={() => handleSelect(cat)} />
          ))}
          {visibleCategories.length === 0 && (
            <div className="win95-panel" style={{ gridColumn: 'span 2', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
                No workouts selected!<br /><br />
                <span style={{ fontSize: '7px', color: '#666' }}>Click MANAGE to add some back</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom pixel decoration */}
        <div style={{ textAlign: 'center', marginTop: '16px', fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: 'rgba(173,20,87,0.4)' }}>
          ♥ ♥ ♥ BADDIEFIT ♥ ♥ ♥
        </div>
      </div>

      {/* Right Quote Sidebar */}
      <div style={{
        width: '32px', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '20px', overflow: 'hidden', maxHeight: '100vh',
      }}>
        <div className="quote-sidebar" style={{ animationDirection: 'reverse' }}>
          {[...RIGHT_QUOTES, ...RIGHT_QUOTES].join('   ')}
        </div>
      </div>
    </div>
  )
}
