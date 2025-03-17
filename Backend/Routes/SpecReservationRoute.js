import express from 'express'

import { createReservation,filterReservation,getOneReservations,getReservations, updateReservation } from '../Controllers/SpectacleReservecontroller.js'


const router = express.Router();

router.post('/createReservation',createReservation)
router.get('/getallreservations',getReservations)
router.get('/getonereservation/:id',getOneReservations)
router.put('/updateReservation/:id',updateReservation)
router.get('/filterreservation',filterReservation)




export default router;