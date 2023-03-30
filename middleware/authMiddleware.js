import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import {JWT_SECRETE} from '../variables.js'

const middlewareAuth = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    

    try {

      token= req.headers.authorization.split(' ')[1];

      const decoded= jwt.verify(token, JWT_SECRETE);

     req.user= await User.findById(decoded.id).select("-password -token -confirmado");
    

    return  next();
      
    } catch (error) {

      const e = Error('invalid');
      
      
    }
  }

  if(!token){
    const error = Error('no exist');
    
  }

  

    next();
};

export default middlewareAuth;
