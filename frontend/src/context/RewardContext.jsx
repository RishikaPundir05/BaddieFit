import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import toast from 'react-hot-toast'

const RewardContext = createContext()

const COUPON_MESSAGES = [
  '🍕 Cheat meal unlocked!',
  '🍫 Chocolate break earned!',
  '🎮 30 min gaming reward!',
  '📺 Guilt-free Netflix time!',
  '🧁 Treat yourself — you earned it!',
]

export function RewardProvider({ children }) {
  const [coupons, setCoupons] = useLocalStorage('coupons', [])
  const [streak, setStreak] = useLocalStorage('streak', { count: 0, lastDate: null })
  const [rewardHistory, setRewardHistory] = useLocalStorage('rewardHistory', [])

  function earnCoupon() {
    const message = COUPON_MESSAGES[Math.floor(Math.random() * COUPON_MESSAGES.length)]
    const coupon = { id: Date.now(), message, earnedAt: new Date().toISOString(), used: false }
    setCoupons(prev => [coupon, ...prev])
    setRewardHistory(prev => [coupon, ...prev])
    toast.success(`🎟️ ${message}`, { duration: 4000 })
    updateStreak()
  }

  function useCoupon(id) {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, used: true } : c))
  }

  function updateStreak() {
    const today = new Date().toDateString()
    setStreak(prev => {
      if (prev.lastDate === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newCount = prev.lastDate === yesterday ? prev.count + 1 : 1
      if (newCount > 1) toast(`🔥 ${newCount} day streak!`, { icon: '🔥' })
      return { count: newCount, lastDate: today }
    })
  }

  const unusedCoupons = coupons.filter(c => !c.used)

  return (
    <RewardContext.Provider value={{ coupons, unusedCoupons, streak, rewardHistory, earnCoupon, useCoupon }}>
      {children}
    </RewardContext.Provider>
  )
}

export const useReward = () => useContext(RewardContext)
