const express = require('express');
const router = express.Router();

let students = [{id: 0, name: 'Dan'}, {id: 1, name: 'Karen'}, {id: 2, name: 'Jon'}];

router.get('/', (req, res, next) => {
  try {
    res.send(students);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    res.send(students[id]);
  } catch(err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    const newStudent = req.body;
    students.push(newStudent);
    res.send(students);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedStudent = req.body;
    console.log(updatedStudent);
    students[id] = updatedStudent;
    res.send(students[id]);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    students.splice(id, 1);
    res.send(students);
  } catch(err) {
    next(err);
  }
});

module.exports = router;