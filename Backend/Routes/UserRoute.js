import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuth.js';
import {createUsers,userlogin,getAllusers,getCurrentUser} from '../Controllers/UserController.js'

const router = express.Router();



router.post('/register',createUsers)
router.post('/login',userlogin)
router.get('/getusers',getAllusers)
router.get('/getcurrentuser',ensureAuthenticated,getCurrentUser)


export default router;