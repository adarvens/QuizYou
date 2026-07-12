import { appState } from './state.js';

const BACKEND_URL = 'http://localhost:5001';
//Updated API fetching and JWT headers
function getHeaders() {
  const token = localStorage.getItem('quizyou_jwt');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export async function fetchCourses() {
  const res = await fetch(`${BACKEND_URL}/api/courses`, { headers: getHeaders() });
  return res.ok ? await res.json() : [];
}

export async function fetchQuizzesForCourse(courseId) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${courseId}/quizzes`, {
    headers: getHeaders()
  });
  return res.ok ? await res.json() : [];
}

export async function fetchQuizDetails(quizId) {
  const res = await fetch(`${BACKEND_URL}/api/quizzes/${quizId}`, {
    headers: getHeaders()
  });
  return res.ok ? await res.json() : {};
}


export const FALLBACK_STUDENTS = [
  { "id": "dbacon89", "firstName": "David", "lastName": "Bacon", "email": "dbacon89@bu.edu", "password": "password" },
  { "id": "saranneh", "firstName": "Saranne", "lastName": "Hobbs", "email": "saranneh@bu.edu", "password": "password" },
  { "id": "smuren", "firstName": "Sophia", "lastName": "Muren", "email": "smuren@bu.edu", "password": "password" },
  { "id": "chaman11", "firstName": "Amir M", "lastName": "Chaman", "email": "chaman11@bu.edu", "password": "password" },
  { "id": "abhikoka", "firstName": "Abhishikth", "lastName": "Koka", "email": "abhikoka@bu.edu", "password": "password" },
  { "id": "csmith00", "firstName": "Cole", "lastName": "Smith", "email": "csmith00@bu.edu", "password": "password" }
];

export const FALLBACK_QUESTIONS = [
  {
    "id": 1,
    "subject": "Testing",
    "question": "Which type of testing ensures that new code changes do not break existing functionality?",
    "options": [
      "Unit Testing",
      "Regression Testing",
      "Integration Testing",
      "System Testing"
    ],
    "correctAnswer": 1
  },
  {
    "id": 2,
    "subject": "Agile",
    "question": "What is the primary purpose of a Daily Standup meeting in Scrum?",
    "options": [
      "To give detailed status updates to the project manager",
      "To assign tasks to team members for the day",
      "To sync team progress, identify blockers, and plan the next 24 hours",
      "To demonstrate finished features to stakeholders"
    ],
    "correctAnswer": 2
  },
  {
    "id": 3,
    "subject": "Design Patterns",
    "question": "Which design pattern restricts the instantiation of a class to one single instance?",
    "options": [
      "Factory Pattern",
      "Observer Pattern",
      "Singleton Pattern",
      "Strategy Pattern"
    ],
    "correctAnswer": 2
  },
  {
    "id": 4,
    "subject": "Git",
    "question": "Which Git command updates your local branch with changes from a remote repository and merges them?",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git checkout"
    ],
    "correctAnswer": 1
  }
];

export async function loadData() {
  // Try loading students.json
  try {
    const res = await fetch('students.json');
    if (!res.ok) throw new Error('Not found');
    appState.students = await res.json();
  } catch (err) {
    console.warn("Using fallback students.json (e.g. running via file:// protocol)");
    appState.students = FALLBACK_STUDENTS;
  }

  // Try loading questions.json
  try {
    const res = await fetch('questions.json');
    if (!res.ok) throw new Error('Not found');
    appState.allQuestions = await res.json();
  } catch (err) {
    console.warn("Using fallback questions.json (e.g. running via file:// protocol)");
    appState.allQuestions = FALLBACK_QUESTIONS;
  }
}
