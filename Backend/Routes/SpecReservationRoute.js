import express from 'express'

import { createReservation,deleteReservation,filterReservation,getbynumber,getOneReservations,getreservationDetails,getReservations, updateReservation } from '../Controllers/SpectacleReservecontroller.js'
import { generateNumber } from '../middlewares/generatenumber.js';

const router = express.Router();

router.post('/createReservation/:number',createReservation)
router.get('/getallreservations',getReservations)
router.get('/getonereservation/:id',getOneReservations)
router.get('/getreservationDetails/:email',getreservationDetails)
router.put('/updateReservation/:id',updateReservation)
router.get('/filterreservation',filterReservation)
router.delete('/deletereservation/:id',deleteReservation)
router.get('/getreservationnumber/:number',getbynumber)




export default router;