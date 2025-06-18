// Import necessary modules
const express = require('express'); // Import Express framework
const ejs = require('ejs'); // Import EJS templating engine
const bodyParser = require('body-parser'); // Middleware to parse request body
const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hosteldb'); // Establish connection to MongoDB database
const Hostel = require('./model/Hostel'); // Import Hostel model to interact with database

// Initialize Express app
const app = express();
const port = 3000; // Define port number for server

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', async (req, res) => {
    const hostel = await Hostel.find(); // Fetch all hostel records from database
    res.render('index', { hostel }); // Render 'index' view and pass hostel data
});

app.get('/create', async (req, res) => {
    const hostel = await Hostel.find(); // Fetch all hostel records
    res.render('create', { hostel }); // Render 'create' view with hostel data
});

app.get('/update', async (req, res) => {
    const hostel = await Hostel.find(); // Fetch all hostel records
    res.render('update', { hostel }); // Render 'update' view with hostel data
});

app.get('/delete', async (req, res) => {
    const hostel = await Hostel.find(); // Fetch all hostel records
    res.render('delete', { hostel }); // Render 'delete' view with hostel data
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define additional routes for rendering views
app.get('/', (req, res) => {
    res.render('index'); // Render index page
});

app.get('/create', (req, res) => {
    res.render('create'); // Render create page
});

app.get('/update', (req, res) => {
    res.render('update'); // Render update page
});

app.get('/delete', (req, res) => {
    res.render('delete'); // Render delete page
});

app.get('/read', (req, res) => {
    res.render('read'); // Render read page
});

// Route to save hostel data
app.post('/save', async (req, res) => {
    const { student_id, student_name, room_no } = req.body; // Extract form data from request
    const hostel = new Hostel({ student_id, student_name, room_no }); // Create new hostel entry
    await hostel.save(); // Save to database
    res.redirect('/'); // Redirect to homepage
});

// Route to search student data
app.post('/search-data', async (req, res) => {
    try {
        const hostel = await Hostel.findOne({ student_id: req.body.student_id }); // Find student by ID
        if (!hostel) {
            return res.render('update', { hostel: null, error: 'Student not Found' }); // Show error if student not found
        }
        res.render('update', { hostel, error: null }); // Render update view with found student data
    } catch (err) {
        return res.render('update', { hostel: null, error: 'Something went wrong' }); // Handle errors
    }
});

// Route to update student data
app.post('/update/:id', async (req, res) => {
    try {
        await Hostel.updateOne({ student_id: req.params.id }, { // Update student details
            student_id: req.body.student_id,
            student_name: req.body.student_name,
            room_no: req.body.room_no
        });
        res.redirect('/update'); // Redirect to update page
    } catch (err) {
        return res.send('Something went wrong'); // Handle errors
    }
});

// Route to delete student record
app.post('/delete', async (req, res) => {
    try {
        await Hostel.deleteOne({ student_id: req.body.student_id }); // Delete student from database
        res.redirect('/delete'); // Redirect to delete page
    } catch (err) {
        return res.send('Something went wrong'); // Handle errors
    }
});