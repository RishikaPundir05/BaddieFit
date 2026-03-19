export const WORKOUT_CATEGORIES = [
  {
    id: 'legs',
    label: 'Leg Day',
    emoji: '🦵',
    gradient: 'from-pink-500 to-rose-600',
    color: '#FF6B9D',
    defaultVideoId: 'UItWltVZZmE', // example YouTube ID
  },
  {
    id: 'upper',
    label: 'Upper Body',
    emoji: '💪',
    gradient: 'from-purple-500 to-indigo-600',
    color: '#9B5DE5',
    defaultVideoId: 'vc1E5CfRfos',
  },
  {
    id: 'core',
    label: 'Core',
    emoji: '🔥',
    gradient: 'from-orange-500 to-amber-600',
    color: '#FF9F1C',
    defaultVideoId: 'DHD1-2P94DI',
  },
  {
    id: 'fullbody',
    label: 'Full Body',
    emoji: '🏋️',
    gradient: 'from-blue-500 to-cyan-500',
    color: '#00BBF9',
    defaultVideoId: 'gC_L9qAHVJ8',
  },
  {
    id: 'stretch',
    label: 'Stretch / Recovery',
    emoji: '🧘',
    gradient: 'from-teal-500 to-green-500',
    color: '#00F5D4',
    defaultVideoId: 'g_tea8ZNk5A',
  },
]

export const DEFAULT_ROUTINES = {
  legs: [
    { exercise: 'Squats',          reps: 12, rest: 30 },
    { exercise: 'Lunges',          reps: 10, rest: 30 },
    { exercise: 'Glute Bridges',   reps: 15, rest: 30 },
    { exercise: 'Calf Raises',     reps: 20, rest: 20 },
    { exercise: 'Wall Sit',        duration: 45, rest: 45 },
  ],
  upper: [
    { exercise: 'Push Ups',        reps: 10, rest: 30 },
    { exercise: 'Tricep Dips',     reps: 12, rest: 30 },
    { exercise: 'Shoulder Press',  reps: 10, rest: 30 },
    { exercise: 'Bicep Curls',     reps: 12, rest: 30 },
  ],
  core: [
    { exercise: 'Plank',           duration: 30, rest: 30 },
    { exercise: 'Crunches',        reps: 20, rest: 20 },
    { exercise: 'Leg Raises',      reps: 12, rest: 30 },
    { exercise: 'Russian Twists',  reps: 20, rest: 30 },
    { exercise: 'Mountain Climbers', duration: 30, rest: 30 },
  ],
  fullbody: [
    { exercise: 'Jumping Jacks',   duration: 30, rest: 20 },
    { exercise: 'Burpees',         reps: 8, rest: 45 },
    { exercise: 'Squats',          reps: 15, rest: 30 },
    { exercise: 'Push Ups',        reps: 10, rest: 30 },
    { exercise: 'High Knees',      duration: 30, rest: 30 },
  ],
  stretch: [
    { exercise: 'Forward Fold',    duration: 45, rest: 10 },
    { exercise: 'Hip Flexor Stretch', duration: 45, rest: 10 },
    { exercise: 'Cat-Cow Stretch', duration: 30, rest: 10 },
    { exercise: 'Child\'s Pose',   duration: 60, rest: 10 },
    { exercise: 'Cobra Stretch',   duration: 30, rest: 10 },
  ],
}

export const JUST_START_ROUTINE = [
  { exercise: 'Jumping Jacks', duration: 30, rest: 15 },
  { exercise: 'Squats',        reps: 10, rest: 15 },
  { exercise: 'Push Ups',      reps: 8,  rest: 15 },
  { exercise: 'Plank',         duration: 20, rest: 15 },
  { exercise: 'High Knees',    duration: 30, rest: 0 },
]

export function getRandomCategory() {
  return WORKOUT_CATEGORIES[Math.floor(Math.random() * WORKOUT_CATEGORIES.length)]
}
