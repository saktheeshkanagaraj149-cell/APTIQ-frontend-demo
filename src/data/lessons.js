/**
 * Placeholder data for learning paths, chapters, and lessons.
 * Each path contains chapters, and each chapter has lesson cards.
 */

export const learningPaths = [
    {
        id: 'quantitative',
        title: 'Quantitative Aptitude',
        icon: 'calculator',
        color: 'bg-yellow-accent',
        progress: 65,
        totalChapters: 8,
        completedChapters: 5,
        chapters: [
            {
                id: 'ch-1',
                title: 'Number Systems',
                lessons: [
                    { id: 'l-1', title: 'Types of Numbers', duration: '15 min', completed: true },
                    { id: 'l-2', title: 'Divisibility Rules', duration: '20 min', completed: true },
                    { id: 'l-3', title: 'HCF & LCM', duration: '25 min', completed: true },
                    { id: 'l-4', title: 'Practice Problems', duration: '30 min', completed: false },
                ],
            },
            {
                id: 'ch-2',
                title: 'Percentages',
                lessons: [
                    { id: 'l-5', title: 'Basic Concepts', duration: '15 min', completed: true },
                    { id: 'l-6', title: 'Profit & Loss', duration: '20 min', completed: true },
                    { id: 'l-7', title: 'Successive Changes', duration: '20 min', completed: false },
                    { id: 'l-8', title: 'Practice Problems', duration: '30 min', completed: false },
                ],
            },
            {
                id: 'ch-3',
                title: 'Ratio & Proportion',
                lessons: [
                    { id: 'l-9', title: 'Fundamentals', duration: '15 min', completed: true },
                    { id: 'l-10', title: 'Mixtures & Alligations', duration: '25 min', completed: false },
                    { id: 'l-11', title: 'Partnership', duration: '20 min', completed: false },
                ],
            },
            {
                id: 'ch-4',
                title: 'Time & Work',
                lessons: [
                    { id: 'l-12', title: 'Basic Problems', duration: '20 min', completed: false },
                    { id: 'l-13', title: 'Pipes & Cisterns', duration: '20 min', completed: false },
                    { id: 'l-14', title: 'Efficiency Method', duration: '25 min', completed: false },
                ],
            },
            {
                id: 'ch-5',
                title: 'Time, Speed & Distance',
                lessons: [
                    { id: 'l-15', title: 'Average Speed', duration: '20 min', completed: false },
                    { id: 'l-16', title: 'Trains & Boats', duration: '25 min', completed: false },
                    { id: 'l-17', title: 'Relative Speed', duration: '20 min', completed: false },
                ],
            },
        ],
    },
    {
        id: 'logical',
        title: 'Logical Reasoning',
        icon: 'brain',
        color: 'bg-sky-soft',
        progress: 40,
        totalChapters: 6,
        completedChapters: 2,
        chapters: [
            {
                id: 'ch-6',
                title: 'Coding-Decoding',
                lessons: [
                    { id: 'l-18', title: 'Letter Coding', duration: '15 min', completed: true },
                    { id: 'l-19', title: 'Number Coding', duration: '15 min', completed: true },
                    { id: 'l-20', title: 'Practice Set', duration: '25 min', completed: false },
                ],
            },
            {
                id: 'ch-7',
                title: 'Blood Relations',
                lessons: [
                    { id: 'l-21', title: 'Direct Relations', duration: '15 min', completed: true },
                    { id: 'l-22', title: 'Coded Relations', duration: '20 min', completed: false },
                ],
            },
            {
                id: 'ch-8',
                title: 'Syllogisms',
                lessons: [
                    { id: 'l-23', title: 'Venn Diagrams', duration: '20 min', completed: false },
                    { id: 'l-24', title: 'Statement-Conclusion', duration: '25 min', completed: false },
                ],
            },
        ],
    },
    {
        id: 'verbal',
        title: 'Verbal Ability',
        icon: 'book-open',
        color: 'bg-pink-light',
        progress: 20,
        totalChapters: 5,
        completedChapters: 1,
        chapters: [
            {
                id: 'ch-9',
                title: 'Reading Comprehension',
                lessons: [
                    { id: 'l-25', title: 'Passage Analysis', duration: '20 min', completed: true },
                    { id: 'l-26', title: 'Inference Questions', duration: '20 min', completed: false },
                ],
            },
            {
                id: 'ch-10',
                title: 'Sentence Correction',
                lessons: [
                    { id: 'l-27', title: 'Grammar Rules', duration: '25 min', completed: false },
                    { id: 'l-28', title: 'Error Spotting', duration: '20 min', completed: false },
                ],
            },
        ],
    },
    {
        id: 'data-interpretation',
        title: 'Data Interpretation',
        icon: 'bar-chart-2',
        color: 'bg-green-soft',
        progress: 10,
        totalChapters: 4,
        completedChapters: 0,
        chapters: [
            {
                id: 'ch-11',
                title: 'Tables & Charts',
                lessons: [
                    { id: 'l-29', title: 'Bar Charts', duration: '20 min', completed: false },
                    { id: 'l-30', title: 'Pie Charts', duration: '20 min', completed: false },
                    { id: 'l-31', title: 'Line Graphs', duration: '20 min', completed: false },
                ],
            },
        ],
    },
];
