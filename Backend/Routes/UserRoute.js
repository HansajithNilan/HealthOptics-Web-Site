import express from 'express'

import {createUsers,userlogin} from '../Controllers/UserController.js'

const router = express.Router();



router.post('/register',createUsers)
router.post('/login',userlogin)


export default router;