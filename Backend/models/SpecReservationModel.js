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
  address:{
    type:String,
    require:true,

  },

  frametype:{ //fullrim , halfrim ,rimless
    type:String,
    require:true
  },
  framematerial:{//metal plastic ,titanium,acetate
    type:String,
    require:true

  },
  lenstype:{ //Single Vision ,Bifocal,Progressive,Blue Light Blocking,Anti-Reflective
    type:String,
    require:true
  },
  quantity:{
    type:Number,
    require:true
  }

});

const specReserveModel = mongoose.model('spectacleReservations',spectReserveSchema)
export default specReserveModel;  