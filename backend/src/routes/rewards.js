import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { Reward } from '../models/index.js'

const router = Router()
router.use(protect)

const COUPON_MESSAGES = [
  '🍕 Cheat meal unlocked!',
  '🍫 Chocolate break earned!',
  '🎮 30 min gaming reward!',
  '📺 Guilt-free Netflix time!',
  '🧁 Treat yourself — you earned it!',
  '🛁 Long bath, no guilt!',
  '☕ Extra coffee today!',
]

// GET /api/rewards
router.get('/', async (req, res, next) => {
  try {
    const rewards = await Reward.find({ user: req.user.id }).sort({ earnedAt: -1 })
    res.json(rewards)
  } catch (err) { next(err) }
})

// POST /api/rewards  — earn a coupon after workout
router.post('/', async (req, res, next) => {
  try {
    const message = COUPON_MESSAGES[Math.floor(Math.random() * COUPON_MESSAGES.length)]
    const reward  = await Reward.create({ user: req.user.id, message })
    res.status(201).json(reward)
  } catch (err) { next(err) }
})

// PATCH /api/rewards/:id/redeem
router.patch('/:id/redeem', async (req, res, next) => {
  try {
    const reward = await Reward.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, used: false },
      { used: true },
      { new: true }
    )
    if (!reward) return res.status(404).json({ message: 'Reward not found or already used' })
    res.json(reward)
  } catch (err) { next(err) }
})

export default router
