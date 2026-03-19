import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { WorkoutLog } from '../models/index.js'

const router = Router()
router.use(protect)

// GET /api/workouts  — history
router.get('/', async (req, res, next) => {
  try {
    const logs = await WorkoutLog
      .find({ user: req.user.id })
      .sort({ completedAt: -1 })
      .limit(50)
    res.json(logs)
  } catch (err) { next(err) }
})

// POST /api/workouts  — log a completed session
router.post('/', async (req, res, next) => {
  try {
    const { category, mode, duration } = req.body
    if (!category) return res.status(400).json({ message: 'category required' })

    const log = await WorkoutLog.create({ user: req.user.id, category, mode, duration })
    res.status(201).json(log)
  } catch (err) { next(err) }
})

export default router
