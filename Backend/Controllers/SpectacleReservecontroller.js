import specReserveModel from "../models/SpecReservationModel.js";

export const createReservation = async(req,res)=>{
try {

    const {name,phonenumber,address,frametype,framematerial,lenstype,quantity} = req.body

    if(!name|| !phonenumber ||!address ||!frametype || !framematerial||!lenstype||!quantity){
        res.status(422).json({message:`Please fill all fields`})
    }

    

    const reservation = await specReserveModel.create({
        name,
        phonenumber,
        address,
        frametype,
        framematerial,
        lenstype,
        quantity



    })
    return res.status(200).json(reservation)

} catch (error) {
    return res.status(500).json({Message:error.Message});
}
   

    

}

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

        const {id} = req.params

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