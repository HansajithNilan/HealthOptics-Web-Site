import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuth.js';
import {createUsers,userlogin,getAllusers,getCurrentUser, adminlogin, getUser, UpdateUser, deleteUser, getquery, getdatatype } from '../Controllers/UserController.js'
import { adminAuthorized } from '../middlewares/adminlogin.js';

const router = express.Router();



router.post('/register',createUsers)
router.post('/login',userlogin)
router.get('/getusers',getAllusers)
router.get('/getcurrentuser',ensureAuthenticated,getCurrentUser)
router.get('/adminlogin',ensureAuthenticated,adminAuthorized(),adminlogin)
router.get('/getUser/:id',getUser)
router.put('/updateUser/:id',UpdateUser)
router.delete('/deleteUser',deleteUser)
router.get('/getquery',getquery)
router.get('/datatype',getdatatype)



export default router;