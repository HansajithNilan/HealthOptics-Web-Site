import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    City : {
        type : String,
        required : true
    },
    State : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
   
    
    
    
    specialty : {
        type : String,
        required : true
    },
    imageurl : []
});

const Doctor = mongoose.model('doctors', doctorSchema);

export default Doctor;
