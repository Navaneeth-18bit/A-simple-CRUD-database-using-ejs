const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')


const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hosteldb')
const Hostel = require('./model/Hostel')


const app = express()
const port = 3000;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',async(req,res) => {

    const hostel = await Hostel.find()
    res.render('index', {hostel})
})

app.get('/create',async(req,res) => {

    const hostel = await Hostel.find()
    res.render('create', {hostel})
})

app.get('/update',async(req,res) => {

    const hostel = await Hostel.find()
    res.render('update', {hostel})
})

app.get('/delete',async(req,res) => {

    const hostel = await Hostel.find()
    res.render('delete', {hostel})
})


app.listen((port), () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.render('index')
})

 app.get('/create', (req,res) => {
    res.render('create')
 })


 app.get('/update', (req,res) => {
    res.render('update')
 })

app.get('/delete', (req,res) => {   
    res.render('delete')
})  

app.get('/read', (req,res) => {
    res.render('read')
})  

app.post('/save',async(req,res) => {
    const {student_id,student_name,room_no} = req.body

    const hostel = new Hostel({student_id,student_name,room_no})
    await hostel.save()

    res.redirect('/')

    
})


async function updateDocument()
{
    const client = new MongoClient('mongodb://localhost:27017/hosteldb');
    const database = client.db('hosteldb');
    const collection = database.collection('hostel');

    const filter = { student_id: '1' };
    const updateDoc = {
        $set: {
            student_name: 'Amit',
            room_no: 101
        },
    };
}
