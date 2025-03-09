const mongoose = require('mongoose')

const HostelSchema = new mongoose.Schema({
    student_id: {
        type: String,
       
    },
    student_name: {
        type: String,
        
    },
    room_no: {
        type: Number,
    }
})

module.exports = mongoose.model('Hostel', HostelSchema)