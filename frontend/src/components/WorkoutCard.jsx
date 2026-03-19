// Custom pixel art SVG icons per category
const PIXEL_ICONS = {
  legs: (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="0" width="3" height="2" fill="#ff69b4"/>
      <rect x="4" y="2" width="4" height="3" fill="#ff69b4"/>
      <rect x="4" y="5" width="2" height="4" fill="#ff69b4"/>
      <rect x="7" y="5" width="2" height="4" fill="#ff69b4"/>
      <rect x="3" y="9" width="3" height="2" fill="#ffb3d1"/>
      <rect x="7" y="9" width="3" height="2" fill="#ffb3d1"/>
      <rect x="2" y="11" width="3" height="3" fill="#ce93d8"/>
      <rect x="8" y="11" width="3" height="3" fill="#ce93d8"/>
    </svg>
  ),
  upper: (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="0" width="4" height="3" fill="#ffb3d1"/>
      <rect x="5" y="3" width="6" height="1" fill="#ff69b4"/>
      <rect x="2" y="4" width="12" height="4" fill="#ff69b4"/>
      <rect x="1" y="4" width="3" height="6" fill="#ce93d8"/>
      <rect x="12" y="4" width="3" height="6" fill="#ce93d8"/>
      <rect x="5" y="8" width="6" height="5" fill="#ff69b4"/>
      <rect x="0" y="5" width="2" height="3" fill="#ffb3d1"/>
      <rect x="14" y="5" width="2" height="3" fill="#ffb3d1"/>
    </svg>
  ),
  core: (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="1" width="6" height="2" fill="#ff69b4"/>
      <rect x="4" y="3" width="8" height="8" fill="#ff69b4"/>
      <rect x="6" y="5" width="1" height="4" fill="#fff0f7"/>
      <rect x="9" y="5" width="1" height="4" fill="#fff0f7"/>
      <rect x="7" y="6" width="2" height="1" fill="#fff0f7"/>
      <rect x="7" y="8" width="2" height="1" fill="#fff0f7"/>
      <rect x="5" y="11" width="6" height="2" fill="#ce93d8"/>
      <rect x="6" y="13" width="4" height="2" fill="#ce93d8"/>
      {/* fire */}
      <rect x="7" y="0" width="2" height="1" fill="#ffd700"/>
      <rect x="6" y="0" width="1" height="1" fill="#ff8c00"/>
    </svg>
  ),
  fullbody: (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="0" width="4" height="3" fill="#ffb3d1"/>
      <rect x="5" y="3" width="6" height="4" fill="#ff69b4"/>
      <rect x="3" y="4" width="3" height="5" fill="#ce93d8"/>
      <rect x="10" y="4" width="3" height="5" fill="#ce93d8"/>
      <rect x="5" y="7" width="3" height="6" fill="#ff69b4"/>
      <rect x="8" y="7" width="3" height="6" fill="#ff69b4"/>
      <rect x="4" y="13" width="3" height="3" fill="#ce93d8"/>
      <rect x="9" y="13" width="3" height="3" fill="#ce93d8"/>
      <rect x="1" y="8" width="3" height="2" fill="#ffb3d1"/>
      <rect x="12" y="8" width="3" height="2" fill="#ffb3d1"/>
    </svg>
  ),
  stretch: (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="0" width="4" height="3" fill="#ffb3d1"/>
      <rect x="5" y="3" width="6" height="3" fill="#ff69b4"/>
      <rect x="2" y="5" width="4" height="2" fill="#ce93d8"/>
      <rect x="10" y="5" width="4" height="2" fill="#ce93d8"/>
      <rect x="1" y="4" width="2" height="2" fill="#ce93d8"/>
      <rect x="13" y="4" width="2" height="2" fill="#ce93d8"/>
      <rect x="6" y="6" width="4" height="4" fill="#ff69b4"/>
      <rect x="5" y="10" width="3" height="4" fill="#ffb3d1"/>
      <rect x="8" y="10" width="3" height="4" fill="#ffb3d1"/>
      {/* stars */}
      <rect x="0" y="2" width="1" height="1" fill="#ffd700"/>
      <rect x="15" y="2" width="1" height="1" fill="#ffd700"/>
      <rect x="14" y="0" width="1" height="1" fill="#ffd700"/>
    </svg>
  ),
}

const CARD_GRADIENTS = {
  legs:     'linear-gradient(135deg, #ffd6e7, #ffb3d1)',
  upper:    'linear-gradient(135deg, #e8d5ff, #ce93d8)',
  core:     'linear-gradient(135deg, #fff3cd, #ffd6e7)',
  fullbody: 'linear-gradient(135deg, #d5f5e3, #a8d8ea)',
  stretch:  'linear-gradient(135deg, #fce4ec, #f8bbd0)',
}

const TITLEBAR_COLORS = {
  legs:     'linear-gradient(to right, #e91e8c, #ff69b4)',
  upper:    'linear-gradient(to right, #9c27b0, #ce93d8)',
  core:     'linear-gradient(to right, #ff8c00, #ffd700)',
  fullbody: 'linear-gradient(to right, #00897b, #4db6ac)',
  stretch:  'linear-gradient(to right, #e91e8c, #f48fb1)',
}

export default function WorkoutCard({ category, onClick }) {
  return (
    <button onClick={onClick} className="workout-card-pixel w-full text-left">
      {/* Mini titlebar */}
      <div style={{ background: TITLEBAR_COLORS[category.id], padding: '2px 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '5px', color: 'white', textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>
          {category.label}.exe
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {['_','□','✕'].map(s => (
            <div key={s} className="win95-titlebar-btn" style={{ width: '12px', height: '12px', fontSize: '7px' }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{
        background: CARD_GRADIENTS[category.id],
        padding: '14px 10px',
        minHeight: '110px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}>
        {/* Pixel art icon */}
        <div style={{ width: '48px', height: '48px', imageRendering: 'pixelated' }}>
          {PIXEL_ICONS[category.id]}
        </div>
        <span style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: '#880e4f',
          textAlign: 'center',
          lineHeight: '1.8',
          textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
        }}>
          {category.label}
        </span>
      </div>
    </button>
  )
}
