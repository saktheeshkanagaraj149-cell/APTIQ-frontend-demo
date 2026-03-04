/**
 * classStore.js – Shared in-memory + localStorage store.
 * Simulates backend data for teacher/student platform.
 */

const KEYS = {
    classes: 'aptiq_classes',
    tests: 'aptiq_tests',
    results: 'aptiq_results',
    notes: 'aptiq_notes',
    enrollments: 'aptiq_enrollments',
};

function load(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function uid() {
    return Math.random().toString(36).slice(2, 10).toUpperCase();
}

// ── Classes ───────────────────────────────────────────────
export function createClass({ name, teacherEmail, teacherName }) {
    const classes = load(KEYS.classes);
    const newClass = {
        id: uid(),
        joinCode: uid().slice(0, 6),
        name,
        teacherEmail,
        teacherName,
        createdAt: new Date().toISOString(),
        studentCount: 0,
    };
    classes.push(newClass);
    save(KEYS.classes, classes);
    return newClass;
}

export function getClassesByTeacher(teacherEmail) {
    return load(KEYS.classes).filter(c => c.teacherEmail === teacherEmail);
}

export function getAllClasses() {
    return load(KEYS.classes);
}

export function getClassByJoinCode(code) {
    return load(KEYS.classes).find(c => c.joinCode === code.toUpperCase()) || null;
}

// ── Enrollments ───────────────────────────────────────────
export function enrollStudent({ studentEmail, studentName, classId, joinCode }) {
    const enrollments = load(KEYS.enrollments);
    const existing = enrollments.find(e => e.studentEmail === studentEmail && e.classId === classId);
    if (existing) return { success: false, message: 'Already enrolled' };

    enrollments.push({ studentEmail, studentName, classId, joinCode, enrolledAt: new Date().toISOString() });
    save(KEYS.enrollments, enrollments);

    // Increment student count
    const classes = load(KEYS.classes);
    const cls = classes.find(c => c.id === classId);
    if (cls) { cls.studentCount += 1; save(KEYS.classes, classes); }

    return { success: true };
}

export function getEnrollmentsByStudent(studentEmail) {
    return load(KEYS.enrollments).filter(e => e.studentEmail === studentEmail);
}

export function getEnrollmentsByClass(classId) {
    return load(KEYS.enrollments).filter(e => e.classId === classId);
}

// ── Tests ─────────────────────────────────────────────────
export function createTest({ title, classId, teacherEmail, questions }) {
    const tests = load(KEYS.tests);
    const newTest = {
        id: uid(),
        title,
        classId,
        teacherEmail,
        questions, // [{ question, options: [A,B,C,D], correct: 'A' }]
        createdAt: new Date().toISOString(),
    };
    tests.push(newTest);
    save(KEYS.tests, tests);
    return newTest;
}

export function getTestsByTeacher(teacherEmail) {
    return load(KEYS.tests).filter(t => t.teacherEmail === teacherEmail);
}

export function getTestsForStudent(studentEmail) {
    const enrollments = load(KEYS.enrollments).filter(e => e.studentEmail === studentEmail);
    const classIds = enrollments.map(e => e.classId);
    return load(KEYS.tests).filter(t => classIds.includes(t.classId));
}

export function getTestById(testId) {
    return load(KEYS.tests).find(t => t.id === testId) || null;
}

// ── Results ───────────────────────────────────────────────
export function submitResult({ testId, testTitle, studentEmail, studentName, score, total, answers, timeTaken }) {
    const results = load(KEYS.results);
    const result = {
        id: uid(),
        testId,
        testTitle,
        studentEmail,
        studentName,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        answers,
        timeTaken,
        submittedAt: new Date().toISOString(),
    };
    results.push(result);
    save(KEYS.results, results);
    return result;
}

export function getResultsByStudent(studentEmail) {
    return load(KEYS.results).filter(r => r.studentEmail === studentEmail);
}

export function getResultsByTeacher(teacherEmail) {
    const tests = load(KEYS.tests).filter(t => t.teacherEmail === teacherEmail);
    const testIds = tests.map(t => t.id);
    return load(KEYS.results).filter(r => testIds.includes(r.testId));
}

export function hasStudentTakenTest(studentEmail, testId) {
    return load(KEYS.results).some(r => r.studentEmail === studentEmail && r.testId === testId);
}

// ── Notes (Webhook) ───────────────────────────────────────
export function postNote({ teacherEmail, teacherName, classId, className, title, content }) {
    const notes = load(KEYS.notes);
    const note = {
        id: uid(),
        teacherEmail,
        teacherName,
        classId,
        className,
        title,
        content,
        postedAt: new Date().toISOString(),
    };
    notes.push(note);
    save(KEYS.notes, notes);

    // Simulate webhook dispatch
    console.log('[WEBHOOK] Note posted:', { event: 'note.created', data: note });
    return note;
}

export function getNotesByClass(classId) {
    return load(KEYS.notes).filter(n => n.classId === classId).sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
}

export function getNotesByTeacher(teacherEmail) {
    return load(KEYS.notes).filter(n => n.teacherEmail === teacherEmail).sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
}

export function getNotesForStudent(studentEmail) {
    const enrollments = load(KEYS.enrollments).filter(e => e.studentEmail === studentEmail);
    const classIds = enrollments.map(e => e.classId);
    return load(KEYS.notes).filter(n => classIds.includes(n.classId)).sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
}

// ── Seed demo data ────────────────────────────────────────
export function seedDemoData() {
    if (load(KEYS.classes).length > 0) return; // Already seeded

    const demoClass = createClass({ name: 'Aptitude Batch A', teacherEmail: 'teacher@demo.com', teacherName: 'Prof. Demo' });
    const test = createTest({
        title: 'Quantitative Aptitude Quiz 1',
        classId: demoClass.id,
        teacherEmail: 'teacher@demo.com',
        questions: [
            { question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: '30' },
            { question: 'A train travels 360 km in 4 hours. What is its speed?', options: ['80 km/h', '90 km/h', '95 km/h', '100 km/h'], correct: '90 km/h' },
            { question: 'If 8 men complete a task in 12 days, how many days for 16 men?', options: ['4', '6', '8', '10'], correct: '6' },
        ],
    });
    postNote({ teacherEmail: 'teacher@demo.com', teacherName: 'Prof. Demo', classId: demoClass.id, className: 'Aptitude Batch A', title: 'Welcome!', content: 'Welcome to Aptitude Batch A. Please complete Quiz 1 by this weekend.' });
    return { demoClass, test };
}
