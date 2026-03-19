import { useNavigate } from 'react-router-dom'

export default function CouponBadge({ count }) {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate('/rewards')} className="pixel-btn relative" style={{ padding: '4px 10px' }}>
      <span style={{ fontSize: '16px' }}>🎀</span>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#880e4f' }}>{count}</span>
      {count > 0 && (
        <span className="blink" style={{
          position: 'absolute', top: '-4px', right: '-4px',
          width: '8px', height: '8px', background: '#e91e8c',
          display: 'block'
        }} />
      )}
    </button>
  )
}
