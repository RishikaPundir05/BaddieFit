import mongoose from 'mongoose'

const { Schema, model } = mongoose

// ─── User ───────────────────────────────────────────────
export const User = model('User', new Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}))

// ─── Routine ─────────────────────────────────────────────
const ExerciseSchema = new Schema({
  exercise: { type: String, required: true },
  reps:     Number,
  duration: Number,   // seconds
  rest:     { type: Number, default: 30 },
}, { _id: false })

export const Routine = model('Routine', new Schema({
  user:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name:      { type: String, required: true },
  category:  { type: String, required: true },
  exercises: [ExerciseSchema],
  createdAt: { type: Date, default: Date.now },
}))

// ─── WorkoutLog ──────────────────────────────────────────
export const WorkoutLog = model('WorkoutLog', new Schema({
  user:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category:    { type: String, required: true },
  mode:        { type: String, enum: ['video', 'routine', 'juststart'] },
  duration:    Number,   // minutes
  completedAt: { type: Date, default: Date.now },
}))

// ─── Reward ──────────────────────────────────────────────
export const Reward = model('Reward', new Schema({
  user:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message:  { type: String, required: true },
  used:     { type: Boolean, default: false },
  earnedAt: { type: Date, default: Date.now },
}))

// ─── FavoriteVideo ───────────────────────────────────────
export const FavoriteVideo = model('FavoriteVideo', new Schema({
  user:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  savedAt: { type: Date, default: Date.now },
}))
