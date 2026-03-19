import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { WorkoutLog } from '../models/index.js'

const router = Router()
router.use(protect)

// GET /api/progress/streak
router.get('/streak', async (req, res, next) => {
  try {
    const logs = await WorkoutLog
      .find({ user: req.user.id })
      .sort({ completedAt: -1 })
      .select('completedAt')

    if (!logs.length) return res.json({ streak: 0, lastWorkout: null })

    // Build a set of unique day strings
    const days = [...new Set(
      logs.map(l => new Date(l.completedAt).toDateString())
    )]

    // Count consecutive days back from today
    let streak = 0
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    // Only count streak if worked out today or yesterday
    if (days[0] !== today && days[0] !== yesterday) {
      return res.json({ streak: 0, lastWorkout: logs[0].completedAt })
    }

    let cursor = new Date()
    for (const day of days) {
      const cursorStr = cursor.toDateString()
      if (day === cursorStr) {
        streak++
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }

    res.json({ streak, lastWorkout: logs[0].completedAt })
  } catch (err) { next(err) }
})

// GET /api/progress  — full stats
router.get('/', async (req, res, next) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.id }).sort({ completedAt: -1 })

    const total = logs.length
    const byCategory = logs.reduce((acc, l) => {
      acc[l.category] = (acc[l.category] || 0) + 1
      return acc
    }, {})

    const totalMinutes = logs.reduce((sum, l) => sum + (l.duration || 0), 0)

    res.json({ total, byCategory, totalMinutes, recentLogs: logs.slice(0, 10) })
  } catch (err) { next(err) }
})

export default router
