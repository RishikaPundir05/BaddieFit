import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { Routine } from '../models/index.js'

const router = Router()
router.use(protect)

// GET /api/routines
router.get('/', async (req, res, next) => {
  try {
    const routines = await Routine.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(routines)
  } catch (err) { next(err) }
})

// POST /api/routines
router.post('/', async (req, res, next) => {
  try {
    const { name, category, exercises } = req.body
    if (!name || !category || !exercises?.length)
      return res.status(400).json({ message: 'name, category and exercises required' })

    const routine = await Routine.create({ user: req.user.id, name, category, exercises })
    res.status(201).json(routine)
  } catch (err) { next(err) }
})

// PUT /api/routines/:id
router.put('/:id', async (req, res, next) => {
  try {
    const routine = await Routine.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!routine) return res.status(404).json({ message: 'Routine not found' })
    res.json(routine)
  } catch (err) { next(err) }
})

// DELETE /api/routines/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const routine = await Routine.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!routine) return res.status(404).json({ message: 'Routine not found' })
    res.json({ message: 'Deleted' })
  } catch (err) { next(err) }
})

export default router
