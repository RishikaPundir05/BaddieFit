import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const WorkoutContext = createContext()

export function WorkoutProvider({ children }) {
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', [])
  const [savedRoutines, setSavedRoutines] = useLocalStorage('savedRoutines', [])
  const [favoriteVideos, setFavoriteVideos] = useLocalStorage('favoriteVideos', [])

  function startWorkout(category) {
    setCurrentWorkout({ category, startTime: Date.now() })
  }

  function completeWorkout(details) {
    const log = {
      id: Date.now(),
      category: currentWorkout?.category,
      completedAt: new Date().toISOString(),
      duration: Math.round((Date.now() - currentWorkout?.startTime) / 1000 / 60),
      ...details,
    }
    setWorkoutHistory(prev => [log, ...prev])
    setCurrentWorkout(null)
    return log
  }

  function saveRoutine(routine) {
    setSavedRoutines(prev => [{ id: Date.now(), ...routine }, ...prev])
  }

  function saveFavoriteVideo(video) {
    setFavoriteVideos(prev => {
      if (prev.find(v => v.videoId === video.videoId)) return prev
      return [{ id: Date.now(), ...video }, ...prev]
    })
  }

  return (
    <WorkoutContext.Provider value={{
      currentWorkout, workoutHistory, savedRoutines, favoriteVideos,
      startWorkout, completeWorkout, saveRoutine, saveFavoriteVideo,
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export const useWorkout = () => useContext(WorkoutContext)
