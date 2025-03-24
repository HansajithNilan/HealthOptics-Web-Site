import mongoose from "mongoose";

const spectReserveSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phonenumber: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  
frametype:{
    type:String,
    require:true,
},
  brand: {
    type: String,
    require: true,
  },
  frameshape: {
    type: String,
    require: true,
  },
  hingetype: {
    type: String,
    require: true,
  },
  framematerial: {
    type: String,
    require: true,
  },
  
  framesize: {
    type: String,
    require: true,
  },
  imageurlcolor:{
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },

});

const specReserveModel = mongoose.model(
  "spectacleReservations",
  spectReserveSchema
);
export default specReserveModel;
