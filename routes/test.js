// Express routes
const router = require('express').Router();

// Create Test Models
let tests = [
  { id: 0, subject: 'English', score: 78, studentId: 0 },
  { id: 1, subject: 'Math', score: 61, studentId: 1 },
  { id: 2, subject: 'Science', score: 95, studentId: 2 },
  { id: 3, subject: 'History', score: 88, studentId: 3 },
  { id: 4, subject: 'Economics', score: 98, studentId: 4 },
  { id: 5, subject: 'Biology', score: 84, studentId: 5 },
];

// Get Tests
router.get('/', function(req, res, next) {
  res.json({ tests });
});

// Get Test by Id
router.get('/:id', function(req, res, next) {
  let test = tests.filter(test => test.id === +req.params.id);
  res.json({ test });
});

// Add Test
router.post('/', function(req, res, next) {
  let newId = tests.length + 1;
  let test = {
    id: newId,
    subject: req.body.subject,
    score: req.body.score,
    studentId: req.body.studentId
  };
  tests.push(test);
  res.json({ tests });
});

// Delete Test
router.delete('/:id', function(req, res, next) {
  let newTests = tests.filter(test => test.id != req.params.id);
  tests = newTests;
  res.json({ tests });
});

// Update Test
router.put('/:id', function(req, res, next) {
  let updatedTest = tests.filter(test => test.id === +req.params.id);
  updatedTest = {
    id: req.params.id,
    subject: req.body.subject,
    score: req.body.score,
    studentId: req.body.studentId
  };
  tests[req.params.id] = updatedTest;
  res.json({ tests });
});

module.exports = router;