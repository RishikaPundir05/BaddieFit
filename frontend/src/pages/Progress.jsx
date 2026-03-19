import { useWorkout } from '../context/WorkoutContext.jsx'
import { useReward } from '../context/RewardContext.jsx'
import { WORKOUT_CATEGORIES } from '../utils/workoutData.js'

export default function Progress() {
  const { workoutHistory } = useWorkout()
  const { streak, rewardHistory } = useReward()

  const totalWorkouts = workoutHistory.length
  const totalCoupons  = rewardHistory.length

  const categoryCounts = WORKOUT_CATEGORIES.map(cat => ({
    ...cat,
    count: workoutHistory.filter(w => w.category === cat.id).length,
  }))
  const maxCount = Math.max(...categoryCounts.map(c => c.count), 1)

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '16px', paddingBottom: '70px', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <div className="win95-panel pixel-enter" style={{ marginBottom: '10px' }}>
        <div className="win95-titlebar">
          <span>📊 Stats.exe</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div className="win95-titlebar-btn">_</div>
            <div className="win95-titlebar-btn">□</div>
            <div className="win95-titlebar-btn">✕</div>
          </div>
        </div>
        <div style={{ padding: '8px 12px', fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
          YOUR PROGRESS<span className="blink">_</span>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
        {[
          { label: 'WORKOUTS', value: totalWorkouts, emoji: '🏋️' },
          { label: 'STREAK', value: streak.count, emoji: '🔥' },
          { label: 'COUPONS', value: totalCoupons, emoji: '🎟️' },
        ].map(stat => (
          <div key={stat.label} className="win95-panel" style={{ padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.emoji}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '16px', color: '#4a0080', marginBottom: '2px' }}>{stat.value}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="win95-panel" style={{ marginBottom: '10px' }}>
        <div className="win95-titlebar"><span>📈 Workouts by Type</span></div>
        <div style={{ padding: '10px' }}>
          {categoryCounts.map(cat => (
            <div key={cat.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'VT323', monospace", fontSize: '18px', marginBottom: '4px' }}>
                <span>{cat.emoji} {cat.label}</span>
                <span style={{ color: '#4a0080' }}>{cat.count}</span>
              </div>
              <div className="pixel-progress">
                <div
                  className="pixel-progress-fill"
                  style={{ width: `${(cat.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div className="win95-panel">
        <div className="win95-titlebar"><span>🕐 Recent Workouts</span></div>
        <div style={{ padding: '10px' }}>
          {workoutHistory.length === 0 ? (
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', textAlign: 'center', padding: '16px', color: '#666' }}>
              No workouts yet!<br /><br />
              <span style={{ fontSize: '7px' }}>Go crush one! 💪</span>
            </div>
          ) : (
            <div className="win95-panel-inset" style={{ maxHeight: '240px', overflowY: 'auto' }}>
              {workoutHistory.slice(0, 20).map(log => {
                const cat = WORKOUT_CATEGORIES.find(c => c.id === log.category)
                return (
                  <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderBottom: '1px solid #c0c0c0' }}>
                    <span style={{ fontSize: '20px' }}>{cat?.emoji || '🏋️'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{cat?.label || log.category}</div>
                      <div style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: '#666' }}>
                        {new Date(log.completedAt).toLocaleDateString()} · {log.duration || '?'} min
                      </div>
                    </div>
                    <span style={{ color: '#4a0080', fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>✓</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
