import User from '../models/User.js'
import genererJWT from '../helpers/genererJWT.js'


const register= async (req, res)=>{

  try {
    const {email, role}=req.body;
    const user= new User({email, role});

    
    await user.save();
    res.status(201).json(user)
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
     
  }

  

  const confirm= async (req, res)=>{
    const {token}= req.params

    const confirmUser = await User.findOne({user: token});

    if(!confirmUser){
      const error = Error('Invalid user');
      return res.status(404).json({msg:error.message})
    }

    console.log(confirmUser);

    try {
      
      confirmUser.token=null;
      confirmUser.confirm = true;
      await confirmUser.save()


      res.json({url:'User confirm!'})


    } catch (error) {
      console.log(error)
    }

  }




  const autUser = async (req, res)=>{

    const {email, password}= req.body;


    const userLog= await User.findOne({email}); 

    if(!userLog){
      const error = Error('The user is not in the DB');
   
      
      
     return res.status(403).json({msg:error.message });
     
    }

    if(await userLog.verifyPassword(password)){


      return res.json({token: genererJWT(userLog.id) })
      // res.json({msg: "Correct password" })
    }else{

      const error = Error('Invalid Password');
      
      
     return  res.status(403).json({msg:error.message });
    } 


   
    return res.json({msg: "User auth!"})
  };




  const employeeDash= (req, res)=>{

    const{user}= req;
 

     res.send(user)
  }


  const hrDash= (req, res)=>{

    const{user}= req;


    res.json(user)
  }





  export{
    register,
    employeeDash,
    hrDash,
    confirm,
    autUser
  }