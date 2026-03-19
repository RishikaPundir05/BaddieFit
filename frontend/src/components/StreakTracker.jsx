export default function StreakTracker({ count }) {
  return (
    <div className="pixel-btn" style={{ padding: '4px 10px', cursor: 'default' }}>
      <span className={count > 0 ? 'heartbeat inline-block' : ''} style={{ fontSize: '16px' }}>
        {count > 0 ? '🔥' : '💤'}
      </span>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#880e4f' }}>{count}</span>
    </div>
  )
}
