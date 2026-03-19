export default function JustStartButton({ onPress }) {
  return (
    <button
      onClick={onPress}
      className="pixel-btn pixel-btn-primary w-full justify-center"
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', padding: '14px', letterSpacing: '1px', gap: '8px' }}
    >
      <span className="heartbeat inline-block">💖</span>
      <span>JUST START!</span>
      <span style={{ fontSize: '6px', opacity: 0.85 }}>5 MIN • NO THINKING</span>
    </button>
  )
}
