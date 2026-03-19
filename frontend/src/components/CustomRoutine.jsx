import { useState } from 'react'
import Timer from './Timer.jsx'

export default function CustomRoutine({ exercises: initialExercises, onComplete }) {
  const [exercises, setExercises] = useState(initialExercises || [])
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState('exercise')
  const [currentSet, setCurrentSet] = useState(1)
  const [started, setStarted] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEx, setNewEx] = useState({ exercise: '', reps: '', duration: '', sets: '3', rest: '30' })

  if (exercises.length === 0) {
    return (
      <div className="win95-panel">
        <div className="win95-titlebar"><span>📋 Routine</span></div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', marginBottom: '12px' }}>
            No exercises yet!
          </div>
          <button onClick={() => setShowAddForm(true)} className="pixel-btn pixel-btn-primary"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
            + ADD EXERCISE
          </button>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="win95-panel pixel-enter">
        <div className="win95-titlebar"><span>📋 Routine Preview</span></div>
        <div style={{ padding: '12px' }}>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px', marginBottom: '10px', color: '#333' }}>
            Today's routine ({exercises.length} exercises):
          </div>

          {/* Exercise list */}
          <div className="win95-panel-inset" style={{ padding: '8px', marginBottom: '10px', maxHeight: '240px', overflowY: 'auto' }}>
            {exercises.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: i < exercises.length - 1 ? '1px solid #c0c0c0' : 'none' }}>
                <span style={{ fontFamily: "'VT323', monospace", fontSize: '18px' }}>
                  {ex.exercise}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#4a0080' }}>
                    {ex.sets ? `${ex.sets}×` : ''}{ex.reps ? `${ex.reps}r` : ''}{ex.duration ? `${ex.duration}s` : ''}
                  </span>
                  <button
                    onClick={() => setExercises(prev => prev.filter((_, idx) => idx !== i))}
                    style={{ fontFamily: "'VT323', monospace", fontSize: '14px', background: '#c0c0c0', border: '1px solid #808080', cursor: 'pointer', padding: '0 4px', color: '#c00' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add exercise form */}
          {showAddForm ? (
            <div className="win95-panel" style={{ padding: '8px', marginBottom: '10px' }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', marginBottom: '8px' }}>ADD EXERCISE:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <input className="pixel-input" placeholder="Exercise name" value={newEx.exercise}
                  onChange={e => setNewEx(p => ({ ...p, exercise: e.target.value }))} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <input className="pixel-input" placeholder="Reps (e.g. 12)" value={newEx.reps}
                    onChange={e => setNewEx(p => ({ ...p, reps: e.target.value }))} type="number" min="1" />
                  <input className="pixel-input" placeholder="Duration (secs)" value={newEx.duration}
                    onChange={e => setNewEx(p => ({ ...p, duration: e.target.value }))} type="number" min="5" />
                  <input className="pixel-input" placeholder="Sets (e.g. 3)" value={newEx.sets}
                    onChange={e => setNewEx(p => ({ ...p, sets: e.target.value }))} type="number" min="1" />
                  <input className="pixel-input" placeholder="Rest (secs)" value={newEx.rest}
                    onChange={e => setNewEx(p => ({ ...p, rest: e.target.value }))} type="number" min="0" />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="pixel-btn pixel-btn-primary" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', flex: 1 }}
                    onClick={() => {
                      if (!newEx.exercise) return
                      setExercises(prev => [...prev, {
                        exercise: newEx.exercise,
                        reps: newEx.reps ? parseInt(newEx.reps) : undefined,
                        duration: newEx.duration ? parseInt(newEx.duration) : undefined,
                        sets: parseInt(newEx.sets) || 1,
                        rest: parseInt(newEx.rest) || 30,
                      }])
                      setNewEx({ exercise: '', reps: '', duration: '', sets: '3', rest: '30' })
                      setShowAddForm(false)
                    }}>
                    ✓ ADD
                  </button>
                  <button className="pixel-btn" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}
                    onClick={() => setShowAddForm(false)}>
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddForm(true)} className="pixel-btn"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', marginBottom: '10px', width: '100%', justifyContent: 'center' }}>
              + ADD EXERCISE
            </button>
          )}

          <button onClick={() => setStarted(true)} className="pixel-btn pixel-btn-primary"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', width: '100%', justifyContent: 'center', padding: '12px' }}>
            ▶ START WORKOUT
          </button>
        </div>
      </div>
    )
  }

  const current = exercises[step]
  const totalSets = current.sets || 1
  const isLastSet = currentSet >= totalSets
  const isLastStep = step === exercises.length - 1
  const progressPct = Math.round(((step + (phase === 'rest' ? 0.5 : 0)) / exercises.length) * 100)

  function handleExerciseDone() {
    if (!isLastSet) {
      setCurrentSet(s => s + 1)
      if (current.rest > 0) setPhase('rest')
    } else if (current.rest > 0) {
      setPhase('rest')
    } else {
      advance()
    }
  }

  function handleRestDone() {
    if (!isLastSet && phase === 'rest' && currentSet < totalSets) {
      setPhase('exercise')
    } else {
      advance()
    }
  }

  function advance() {
    if (isLastStep) {
      onComplete()
    } else {
      setStep(s => s + 1)
      setPhase('exercise')
      setCurrentSet(1)
    }
  }

  return (
    <div className="pixel-enter">
      {/* Progress bar */}
      <div className="win95-panel" style={{ padding: '8px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Press Start 2P', monospace", fontSize: '7px', marginBottom: '6px' }}>
          <span>Exercise {step + 1}/{exercises.length}</span>
          <span>{progressPct}%</span>
        </div>
        <div className="pixel-progress">
          <div className="pixel-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Exercise chips */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', marginBottom: '8px', paddingBottom: '4px' }}>
        {exercises.map((ex, i) => (
          <div key={i} style={{
            flexShrink: 0,
            padding: '3px 8px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '6px',
            background: i < step ? '#9d4edd' : i === step ? '#ffd700' : '#c0c0c0',
            color: i < step ? '#fff' : i === step ? '#000' : '#666',
            border: i === step ? '2px solid #ff8c00' : '2px solid #808080',
          }}>
            {i < step ? '✓' : ex.exercise.slice(0, 6)}
          </div>
        ))}
      </div>

      {/* Current Exercise */}
      <div className="win95-panel">
        <div className="win95-titlebar">
          <span>{phase === 'rest' ? '😮‍💨 REST TIME' : `💪 ${current.exercise.toUpperCase()}`}</span>
          {totalSets > 1 && (
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>
              SET {currentSet}/{totalSets}
            </span>
          )}
        </div>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          {phase === 'rest' ? (
            <>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '20px', marginBottom: '8px', color: '#333' }}>
                Next: {isLastSet ? (exercises[step + 1]?.exercise || 'Done!') : `${current.exercise} set ${currentSet + 1}`}
              </div>
              <Timer
                key={`rest-${step}-${currentSet}`}
                seconds={current.rest || 30}
                label="REST"
                color="#ff69b4"
                onComplete={handleRestDone}
              />
              <button onClick={handleRestDone} className="pixel-btn"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', marginTop: '8px' }}>
                SKIP REST →
              </button>
            </>
          ) : (
            <>
              {current.duration ? (
                <Timer
                  key={`ex-${step}-${currentSet}`}
                  seconds={current.duration}
                  label={current.exercise}
                  color="#9d4edd"
                  onComplete={handleExerciseDone}
                />
              ) : (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '40px', color: '#4a0080' }}>
                    {current.reps}
                  </div>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color: '#666' }}>REPS</div>
                </div>
              )}
              <button onClick={handleExerciseDone}
                className="pixel-btn pixel-btn-primary"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginTop: '12px', width: '100%', justifyContent: 'center', padding: '12px' }}>
                ✓ DONE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
