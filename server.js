const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 9000; // Custom port number

// Importing Student and Job models
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
        const allStudents = await Student.find();
        res.json(allStudents);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch all jobs
app.get('/api/jobs/all', async (req, res) => {
    try {
        const allJobs = await Job.find();
        res.json(allJobs);
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to add a new job
app.post('/api/jobs', async (req, res) => {
    try {
        const { jobName, companyName, location, jobDescription, jobId ,jobEnd} = req.body;
        const newJob = new Job({ jobName, companyName, location, jobDescription, jobId ,jobEnd});
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error adding new job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// MongoDB connection
mongoose.connect('mongodb+srv://abhishekpatwal0013:123@cluster0.bnbp2zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
