import mongoose from "mongoose";
const Schema = mongoose.Schema;

const variantSchema = new Schema({
  framesize: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
});

const spectacleSchema = new Schema({
  model: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  gender: { type: String, required: true },
  frameshape: { type: String, required: true },
  framematerial: { type: String, required: true },
  frametype: { type: String, required: true },
  hingetype: { type: String, required: true },
  description: { type: String, required: true },
  framesize1: { type: String },
  framesize2: { type: String },
  framesize3: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  imageurlcolor1: { type: [String], default: [] },
  imageurlcolor2: { type: [String], default: [] },
  imageurlcolor3: { type: [String], default: [] },
  variants: [variantSchema]
});

const SpectacleModel = mongoose.model('spectacle', spectacleSchema);
export default SpectacleModel;