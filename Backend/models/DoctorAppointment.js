import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DoctorAppointmentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
   
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true,
        enum: ['09:00 AM - 10:00 AM', '04:00 PM - 06:00 PM']
    },
    doctor: {
        type: String,
        required: true
    },
    doctorfee: {
        type: Number,
        default: 2500
    }
});

const DoctorAppointment = mongoose.model('doctorappointments', DoctorAppointmentSchema);

export default DoctorAppointment;