const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;
const Student = require('./models/student');
const Job = require('./models/job');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentRoutes);

// Route to fetch all students
app.get('/api/students/all', async (req, res) => {
    try {
        const allStudents = await Student.find(); // Assuming Student is your mongoose model
        res.json(allStudents);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/jobs/all', async (req, res) => {
    try {
        const allJobs = await Job.find(); // Assuming Student is your mongoose model
        res.json(allJobs);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/jobs', async (req, res) => {
    try {
        const { jobName, companyName, location, jobDescription, jobId } = req.body;
        const newJob = new Job({ jobName, companyName, location, jobDescription, jobId });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error adding new job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// MongoDB connection
mongoose.connect('mongodb+srv://murex:2feb262005@cluster0.wbq3uwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error('Error connecting to MongoDB:', err));
