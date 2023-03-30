import express from 'express'
import {register, employeeDash, hrDash, confirm, autUser} from '../controllers/userController.js'
const router = express.Router();
import middlewareAuth from '../middleware/authMiddleware.js'


//rutas publicas
router.post('/',register);
router.get('/confirmation/:user',confirm);
router.post('/login/',autUser);

//rutas privadas
router.get('/employee',middlewareAuth, employeeDash);
router.get('/hr',middlewareAuth, hrDash);



export default router;