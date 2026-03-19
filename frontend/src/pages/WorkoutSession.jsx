import { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useWorkout } from '../context/WorkoutContext.jsx'
import { useReward } from '../context/RewardContext.jsx'
import { WORKOUT_CATEGORIES, DEFAULT_ROUTINES, JUST_START_ROUTINE } from '../utils/workoutData.js'
import YouTubePlayer from '../components/YouTubePlayer.jsx'
import CustomRoutine from '../components/CustomRoutine.jsx'
import Confetti from 'react-confetti'

export default function WorkoutSession() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { completeWorkout } = useWorkout()
  const { earnCoupon } = useReward()
  const isJustStart = searchParams.get('mode') === 'juststart'

  const [mode, setMode] = useState(isJustStart ? 'routine' : null)
  const [done, setDone] = useState(false)

  const cat = WORKOUT_CATEGORIES.find(c => c.id === category)
  const routine = isJustStart ? JUST_START_ROUTINE : (DEFAULT_ROUTINES[category] || [])

  function handleComplete() {
    completeWorkout({ mode })
    earnCoupon()
    setDone(true)
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 1 }}>
        <Confetti recycle={false} numberOfPieces={250} colors={['#9d4edd', '#ff69b4', '#ffd700', '#ffffff', '#c77dff']} />
        <div className="win95-panel pixel-enter" style={{ maxWidth: '360px', width: '100%' }}>
          <div className="win95-titlebar">
            <span>🎉 WORKOUT COMPLETE!</span>
            <div className="win95-titlebar-btn">✕</div>
          </div>
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '8px' }} className="heartbeat">🏆</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', marginBottom: '8px', color: '#4a0080' }}>
              YOU CRUSHED IT!
            </div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color: '#666', marginBottom: '16px' }}>
              A reward coupon has been added 🎟️
            </div>
            <button
              className="pixel-btn pixel-btn-primary"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', width: '100%', justifyContent: 'center', padding: '12px' }}
              onClick={() => navigate('/')}
            >
              ← BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '16px', paddingBottom: '70px', position: 'relative', zIndex: 1 }}>
      {/* Header window */}
      <div className="win95-panel pixel-enter" style={{ marginBottom: '12px' }}>
        <div className="win95-titlebar">
          <span>{cat?.emoji} {cat?.label?.toUpperCase()}</span>
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {isJustStart && (
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', background: '#ffd700', color: '#000', padding: '2px 4px', marginRight: '4px' }}>
                ⚡ JUST START
              </span>
            )}
            <div className="win95-titlebar-btn" onClick={() => navigate('/')}>✕</div>
          </div>
        </div>
        <div style={{ padding: '6px 10px' }}>
          <button onClick={() => navigate('/')} style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#000080', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Back to menu
          </button>
        </div>
      </div>

      {/* Mode Selection */}
      {!isJustStart && !mode && (
        <div className="win95-panel pixel-enter">
          <div className="win95-titlebar"><span>SELECT MODE</span></div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#333', marginBottom: '4px' }}>
              How do you want to work out?
            </div>
            <button className="workout-card-pixel w-full text-left" onClick={() => setMode('video')} style={{ padding: 0 }}>
              <div style={{ background: 'linear-gradient(135deg, #000080, #1084d0)', padding: '3px 6px' }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'white' }}>option_a.exe</span>
              </div>
              <div style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '32px' }}>📹</span>
                <div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginBottom: '4px' }}>HOME WORKOUT</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#555' }}>Follow a YouTube video — stay in app</div>
                </div>
              </div>
            </button>
            <button className="workout-card-pixel w-full text-left" onClick={() => setMode('routine')} style={{ padding: 0 }}>
              <div style={{ background: 'linear-gradient(135deg, #4a0080, #9d4edd)', padding: '3px 6px' }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'white' }}>option_b.exe</span>
              </div>
              <div style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '32px' }}>📋</span>
                <div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginBottom: '4px' }}>CUSTOM ROUTINE</div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#555' }}>Step-by-step with timers + sets</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {mode === 'video' && <YouTubePlayer defaultVideoId={cat?.defaultVideoId} onComplete={handleComplete} />}
      {mode === 'routine' && <CustomRoutine exercises={routine} onComplete={handleComplete} />}
    </div>
  )
}
