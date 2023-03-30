import jwt from 'jsonwebtoken'
import {JWT_SECRETE} from '../variables.js'

const genererJWT =(id)=>{

    return jwt.sign({id},
        JWT_SECRETE,{
        expiresIn: "30d",
    });
};


export default genererJWT