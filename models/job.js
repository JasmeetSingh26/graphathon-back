const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobName: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobId: { type: Number, required: true },
    jobEnd: { type: Date, required: true }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;