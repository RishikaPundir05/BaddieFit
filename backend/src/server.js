import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import routinesRouter  from './routes/routines.js'
import workoutsRouter  from './routes/workouts.js'
import rewardsRouter   from './routes/rewards.js'
import videosRouter    from './routes/videos.js'
import progressRouter  from './routes/progress.js'
import authRouter      from './routes/auth.js'
import { errorHandler } from './middleware/errorHandler.js'

const app  = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
app.use(express.json())

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date() }))

// Routes
app.use('/api/auth',     authRouter)
app.use('/api/routines', routinesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/rewards',  rewardsRouter)
app.use('/api/videos',   videosRouter)
app.use('/api/progress', progressRouter)

// Error handler (must be last)
app.use(errorHandler)

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
})
