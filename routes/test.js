// Express routes
const router = require('express').Router();
const { tests } = require('../db/db');

// Get Tests
router.get('/', function(req, res, next) {
  res.json(tests);
});

// Get top scoring student
router.get('/top', function(req, res, next) {
  const topScore = tests.reduce((acc, cur) => acc.score > cur.score ? acc : cur);
  res.json(topScore);
});

// Get Test by Id
router.get('/:id', function(req, res, next) {
  let test = tests.filter(test => test.id === +req.params.id);
  res.json(test);
});

// Get mean score for student
router.get('/:id/mean', function(req, res, next) {
  const studentId = req.params.id;
  const studentTests = tests.filter(test => test.studentId == studentId);
  const meanScore = studentTests.reduce((acc, cur) => acc.score + cur.score) / studentTests.length;
  res.json(meanScore);
});

// Add Score
router.post('/', function(req, res, next) {
  let newId = tests.length + 1;
  let test = {
    id: newId,
    score: req.body.score,
    studentId: req.body.studentId,
    subject: req.body.subject,
  };
  tests.push(test);
  res.json(tests);
});

// Delete Score
router.delete('/:id', function(req, res, next) {
  let newScores = tests.filter(score => score.id !==  +req.params.id);
  tests = newScores;
  res.json(tests);
});

// Update Score
router.put('/:id', function(req, res, next) {
  tests.map(score => {
    if (score.id === +req.params.id) {
      score.score = req.body.score;
      score.studentId = req.body.studentId;
      score.subject = req.body.subject;
    }
  });
  res.json(tests);
});

module.exports = router;
