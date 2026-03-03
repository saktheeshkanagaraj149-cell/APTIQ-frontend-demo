/**
 * Placeholder badge definitions.
 * Each badge has an id, name, description, icon name (Lucide), and earned status.
 */

export const badges = [
    { id: 'b-1', name: 'First Steps', description: 'Complete your first lesson', icon: 'footprints', earned: true },
    { id: 'b-2', name: 'Quiz Whiz', description: 'Score 100% on any test', icon: 'zap', earned: true },
    { id: 'b-3', name: 'Bookworm', description: 'Complete 10 lessons', icon: 'book-open', earned: true },
    { id: 'b-4', name: 'Speed Demon', description: 'Finish a test under half time', icon: 'timer', earned: true },
    { id: 'b-5', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: 'flame', earned: true },
    { id: 'b-6', name: 'Top 10', description: 'Reach top 10 on leaderboard', icon: 'trophy', earned: true },
    { id: 'b-7', name: 'Centurion', description: 'Answer 100 questions correctly', icon: 'check-circle', earned: false },
    { id: 'b-8', name: 'Scholar', description: 'Complete an entire learning path', icon: 'graduation-cap', earned: false },
    { id: 'b-9', name: 'Night Owl', description: 'Study after midnight', icon: 'moon', earned: false },
    { id: 'b-10', name: 'Social Butterfly', description: 'Share your score 5 times', icon: 'share-2', earned: false },
    { id: 'b-11', name: 'Perfectionist', description: 'Score 100% on 5 tests', icon: 'star', earned: false },
    { id: 'b-12', name: 'Marathon Runner', description: 'Complete 50 tests', icon: 'award', earned: false },
];

export const streakData = {
    currentStreak: 12,
    longestStreak: 21,
    todayCompleted: true,
    weekData: [
        { day: 'Mon', completed: true },
        { day: 'Tue', completed: true },
        { day: 'Wed', completed: true },
        { day: 'Thu', completed: true },
        { day: 'Fri', completed: true },
        { day: 'Sat', completed: false },
        { day: 'Sun', completed: true },
    ],
};
