Notes App - Ocean Professional

Quick start:
1) npm install
2) npm start
App runs at http://localhost:3000

Environment:
- REACT_APP_USE_MOCK=true uses localStorage (default).
- Set REACT_APP_USE_MOCK=false and REACT_APP_API_BASE_URL to point at your backend (e.g., http://localhost:4000).

Mock tuning:
- REACT_APP_MOCK_FAILURE_RATE=0.05 to simulate 5% transient failures.

UI:
- Top nav with search.
- Grid of notes, FAB to create.
- Modal for create/edit with validation.
