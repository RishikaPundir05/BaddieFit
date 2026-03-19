import { useReward } from '../context/RewardContext.jsx'
import toast from 'react-hot-toast'

export default function Rewards() {
  const { coupons, unusedCoupons, useCoupon } = useReward()

  function handleRedeem(coupon) {
    useCoupon(coupon.id)
    toast.success('Coupon redeemed! Enjoy ur treat 🎉')
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '16px', paddingBottom: '70px', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <div className="win95-panel pixel-enter" style={{ marginBottom: '10px' }}>
        <div className="win95-titlebar">
          <span>🎟️ Rewards.exe</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div className="win95-titlebar-btn">_</div>
            <div className="win95-titlebar-btn">□</div>
            <div className="win95-titlebar-btn">✕</div>
          </div>
        </div>
        <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
            YOUR REWARDS<span className="blink">_</span>
          </span>
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#4a0080' }}>
            {unusedCoupons.length} unused
          </span>
        </div>
      </div>

      {coupons.length === 0 ? (
        <div className="win95-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎁</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', lineHeight: '2' }}>
            No rewards yet!<br />
            <span style={{ fontSize: '7px', color: '#666' }}>Complete a workout to earn your first coupon</span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {coupons.map(coupon => (
            <div
              key={coupon.id}
              className="win95-panel"
              style={{ opacity: coupon.used ? 0.5 : 1 }}
            >
              {/* Coupon titlebar */}
              <div style={{
                background: coupon.used
                  ? 'linear-gradient(to right, #808080, #a0a0a0)'
                  : 'linear-gradient(to right, #ffd700, #ff8c00)',
                padding: '3px 6px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: coupon.used ? '#fff' : '#000' }}>
                  {coupon.used ? 'USED' : 'REWARD COUPON'}
                </span>
                <span style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: coupon.used ? '#ddd' : '#000' }}>
                  {new Date(coupon.earnedAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>{coupon.used ? '✅' : '🎟️'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'VT323', monospace", fontSize: '20px' }}>{coupon.message}</div>
                </div>
                {!coupon.used && (
                  <button
                    onClick={() => handleRedeem(coupon)}
                    className="pixel-btn pixel-btn-yellow"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', flexShrink: 0 }}
                  >
                    USE IT!
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
