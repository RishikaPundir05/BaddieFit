import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

// Attach auth token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ---- Routines ----
export const getRoutines   = ()         => api.get('/routines')
export const createRoutine = (data)     => api.post('/routines', data)
export const deleteRoutine = (id)       => api.delete(`/routines/${id}`)

// ---- Workout Logs ----
export const logWorkout    = (data)     => api.post('/workouts', data)
export const getHistory    = ()         => api.get('/workouts')

// ---- Rewards ----
export const getRewards    = ()         => api.get('/rewards')
export const addReward     = (data)     => api.post('/rewards', data)

// ---- Favorite Videos ----
export const getFavorites  = ()         => api.get('/videos/favorites')
export const saveFavorite  = (data)     => api.post('/videos/favorites', data)
export const deleteFavorite = (id)      => api.delete(`/videos/favorites/${id}`)

// ---- Progress ----
export const getStreak     = ()         => api.get('/progress/streak')
export const getProgress   = ()         => api.get('/progress')

export default api
