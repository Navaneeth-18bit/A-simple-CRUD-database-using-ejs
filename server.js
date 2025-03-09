const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')


const app = express()
const port = 3000;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))


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

app.post('/save',(req,res) => {
    const {student_id,student_name,room_no} = req.body


    console.log(student_id,student_name,room_no)
})

