const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    cgpa: { type: Number, required: true },
    college: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    location: { type: String, required: true },
    resume: { type: String, required: false },
    jobId: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
