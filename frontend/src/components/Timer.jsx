import { useState, useEffect } from 'react'
import { useTimer } from '../hooks/useTimer.js'

export default function Timer({ seconds, label, color = '#9d4edd', onComplete, autoStart = false }) {
  const [customSeconds, setCustomSeconds] = useState(seconds)
  const [editing, setEditing] = useState(false)
  const { display, progress, isRunning, isFinished, start, pause, reset } = useTimer(customSeconds)

  useEffect(() => { reset(customSeconds) }, [customSeconds])
  useEffect(() => { if (autoStart) start() }, [autoStart])
  useEffect(() => { if (isFinished && onComplete) onComplete() }, [isFinished])

  const circumference = 2 * Math.PI * 54
  const strokeDash = circumference * (1 - progress)

  function handleCustomTime(val) {
    const s = Math.max(5, Math.min(300, parseInt(val) || customSeconds))
    setCustomSeconds(s)
    setEditing(false)
  }

  return (
    <div className="win95-panel" style={{ padding: '12px', textAlign: 'center' }}>
      <div className="win95-titlebar" style={{ marginBottom: '10px' }}>
        <span>⏱ {label || 'TIMER'}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <div className="win95-titlebar-btn">_</div>
          <div className="win95-titlebar-btn">□</div>
        </div>
      </div>

      {/* Circular Timer */}
      <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 12px' }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#808080" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="8"
            strokeLinecap="square"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: 'stroke-dashoffset 1s steps(60)' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '20px', color: '#000' }}>{display}</span>
          {isRunning && <span style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: '#4a0080' }} className="blink">RUNNING</span>}
          {!isRunning && !isFinished && <span style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: '#666' }}>PAUSED</span>}
          {isFinished && <span style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: '#c2185b' }} className="blink">DONE!</span>}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '8px' }}>
        <button
          onClick={isRunning ? pause : start}
          className={`pixel-btn ${isRunning ? '' : 'pixel-btn-primary'}`}
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}
        >
          {isRunning ? '⏸ PAUSE' : '▶ START'}
        </button>
        <button
          onClick={() => reset(customSeconds)}
          className="pixel-btn"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}
        >
          ↺ RESET
        </button>
      </div>

      {/* Custom time editor */}
      <div style={{ borderTop: '1px solid #808080', paddingTop: '8px', marginTop: '4px' }}>
        {editing ? (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'VT323', monospace", fontSize: '16px' }}>Set seconds:</span>
            <input
              type="number"
              defaultValue={customSeconds}
              className="pixel-input"
              style={{ width: '70px', textAlign: 'center' }}
              onBlur={e => handleCustomTime(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCustomTime(e.target.value)}
              autoFocus
              min={5}
              max={300}
            />
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="pixel-btn"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', padding: '4px 10px' }}
          >
            ✏ {customSeconds}s
          </button>
        )}
      </div>
    </div>
  )
}
