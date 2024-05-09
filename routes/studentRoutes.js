const express = require('express');
const Student = require('../models/student');

const router = express.Router();

// Route to create a new student
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
