import specReserveModel from "../models/SpecReservationModel.js";
import SpectacleModel from "../models/Spectacle.js";


export const createReservation = async (req, res) => {
  try {
    const { name, phonenumber, address, email, frametype, brand, frameshape, framematerial, framesize, imageurlcolor, quantity, gender, price } = req.body;

    if (!name || !phonenumber || !address || !email || !frametype || !brand || !frameshape || !framematerial || !framesize || !imageurlcolor || !quantity || !gender || !price) {
      return res.status(422).json({ message: `Please fill all fields` });
    }

    const reservation = await specReserveModel.create({
      name, phonenumber, address, email, frametype, brand, gender, frameshape, framematerial, framesize, imageurlcolor, quantity, price
    });

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getReservations = async (req,res)=>{

    try {
        const Reservations  = await specReserveModel.find()

        if(!Reservations){
            return  res.status(422).json({message:'Reservations Not Found!'})
        }

        res.status(200).json(Reservations)
        
    } catch (error) {
        return res.status(500).json({Message:error.Message});
        
    }


}

export const getOneReservations = async(req,res)=>{
    try {

        const {id} = req.params;

        if(!id){
            return  res.status(422).json({message:'Id not found!'})
        }
        const Reservation = await specReserveModel.findOne({_id:id}) //when we use findone it must be a object

        if(!Reservation){
         return   res.status(422).json({message:"Reservation Not Found!"})
        }
        res.status(200).json(Reservation)
        
    } catch (error) {
       return res.status(404).json({message:error.message})
    }
}

// export const getonereservation = async(req,res)=>{
//     try {
//         const {phonenumber}
//     } catch (error) {
        
//     }
// }

export const updateReservation =async(req,res)=>{

    try {

        const {id} = req.params

        if(!id){
            res.status(422).json({message:"Id not Found !"})
        }
        const Reservation = await specReserveModel.findByIdAndUpdate(id,req.body)
        

        const updateReservation = await specReserveModel.findOne({_id:id})
        return res.status(200).json(updateReservation)
       

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const filterReservation =async(req,res)=>{

    try {

        const {name} = req.query;

        if(!name){
            res.status(422).json({message:"Reservation not found"})
        }
        const filterReservation = await specReserveModel.find({name:name})
        res.status(200).json(filterReservation)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }

}

export const deleteReservation = async(req,res)=>{

    try{
        const {id} = req.params;

        if(!id){
            return res.status(422).json({message:"Id not found"})

        }
        const result = await specReserveModel.findByIdAndDelete(id)

        return res.status(200).json({message:"Reservation Deleted Successfull:"})

    }catch(err){
        return res.status(500).json({message:err.message})
    }

}

export const getallimageurls = async(req,res)=>{

    try {
        const spectaclesmageurls = await SpectacleModel.distinct({imageurlcolor1,})

        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}