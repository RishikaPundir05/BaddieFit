import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',         emoji: '🏠', label: 'Home' },
  { to: '/progress', emoji: '📊', label: 'Stats' },
  { to: '/rewards',  emoji: '🎀', label: 'Rewards' },
]

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 taskbar">
      <div className="pixel-btn pixel-btn-primary text-[6px] h-[38px] mr-2 flex-shrink-0"
           style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px' }}>
        💖 BADDIE
      </div>
      <div style={{ width: '2px', height: '38px', background: '#ad1457', borderRight: '1px solid #ffd6e7', marginRight: '4px', flexShrink: 0 }} />
      {NAV.map(({ to, emoji, label }) => (
        <NavLink key={to} to={to} className="flex-1">
          {({ isActive }) => (
            <div className={`taskbar-btn ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '14px' }}>{emoji}</span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '5px' }}>{label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  )
}
