import { useState } from 'react'
import YouTube from 'react-youtube'
import { useWorkout } from '../context/WorkoutContext.jsx'
import toast from 'react-hot-toast'

function extractVideoId(url) {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return url.length === 11 ? url : null
}

export default function YouTubePlayer({ defaultVideoId, onComplete }) {
  const { saveFavoriteVideo, favoriteVideos } = useWorkout()
  const [videoId, setVideoId] = useState(defaultVideoId || '')
  const [inputUrl, setInputUrl] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)

  function handleLoadUrl() {
    const id = extractVideoId(inputUrl)
    if (id) { setVideoId(id); setInputUrl('') }
    else toast.error('Invalid YouTube URL')
  }

  function handleSaveFavorite() {
    if (!videoId) return
    saveFavoriteVideo({ videoId, savedAt: new Date().toISOString() })
    toast.success('Saved to favorites! ⭐')
  }

  const opts = {
    width: '100%',
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      {videoId && (
        <div className="rounded-2xl overflow-hidden">
          <YouTube videoId={videoId} opts={opts} className="w-full" />
        </div>
      )}

      {/* URL Input */}
      <div className="glass-card p-4 space-y-3">
        <p className="text-white/60 text-sm">Paste a YouTube link:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLoadUrl()}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-2
                       text-white placeholder-white/30 text-sm focus:outline-none
                       focus:border-white/50 transition-colors"
          />
          <button
            onClick={handleLoadUrl}
            className="bg-blue-500 hover:bg-blue-400 text-white font-display font-bold
                       px-4 py-2 rounded-2xl transition-colors active:scale-95"
          >
            Load
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSaveFavorite}
            className="flex-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300
                       font-display font-bold text-sm py-2 rounded-2xl
                       active:scale-95 transition-transform"
          >
            ⭐ Save Favorite
          </button>
          {favoriteVideos.length > 0 && (
            <button
              onClick={() => setShowFavorites(v => !v)}
              className="flex-1 bg-white/10 border border-white/20 text-white/70
                         font-display font-bold text-sm py-2 rounded-2xl
                         active:scale-95 transition-transform"
            >
              📋 My Favorites ({favoriteVideos.length})
            </button>
          )}
        </div>

        {showFavorites && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {favoriteVideos.map(v => (
              <button
                key={v.id}
                onClick={() => { setVideoId(v.videoId); setShowFavorites(false) }}
                className="w-full text-left text-white/70 hover:text-white text-sm
                           py-1.5 px-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                📹 {v.videoId} · {new Date(v.savedAt).toLocaleDateString()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        className="w-full btn-primary bg-gradient-to-r from-green-500 to-teal-500 text-white"
      >
        ✅ Workout Complete!
      </button>
    </div>
  )
}
