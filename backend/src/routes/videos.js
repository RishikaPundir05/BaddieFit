import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { FavoriteVideo } from '../models/index.js'

const router = Router()
router.use(protect)

// GET /api/videos/favorites
router.get('/favorites', async (req, res, next) => {
  try {
    const videos = await FavoriteVideo
      .find({ user: req.user.id })
      .sort({ savedAt: -1 })
    res.json(videos)
  } catch (err) { next(err) }
})

// POST /api/videos/favorites
router.post('/favorites', async (req, res, next) => {
  try {
    const { videoId } = req.body
    if (!videoId) return res.status(400).json({ message: 'videoId required' })

    // Prevent duplicates per user
    const existing = await FavoriteVideo.findOne({ user: req.user.id, videoId })
    if (existing) return res.status(200).json(existing)

    const video = await FavoriteVideo.create({ user: req.user.id, videoId })
    res.status(201).json(video)
  } catch (err) { next(err) }
})

// DELETE /api/videos/favorites/:id
router.delete('/favorites/:id', async (req, res, next) => {
  try {
    const video = await FavoriteVideo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })
    if (!video) return res.status(404).json({ message: 'Video not found' })
    res.json({ message: 'Removed from favorites' })
  } catch (err) { next(err) }
})

export default router
