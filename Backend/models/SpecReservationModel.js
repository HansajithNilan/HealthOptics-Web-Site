import mongoose from "mongoose";

const spectReserveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required:true,
  },
  gender:{
    type:String,
    required:true,
  },
  
frametype:{
    type:String,
    required:true,
},
  brand: {
    type: String,
    required:true,
  },
  frameshape: {
    type:String,
    required:true,
  },
 
  framematerial: {
    type:String,
    required:true,
  },
  
  framesize: {
    type: String,
    required:true,
  },
  imageurlcolor:{
    type: String,
    required:true,
  },
  quantity: {
    type: Number,
    required:true,
  },
price:{
  type: Number,
  require: true,

}
});

const specReserveModel = mongoose.model(
  "spectacleReservations",
  spectReserveSchema
);
export default specReserveModel;
