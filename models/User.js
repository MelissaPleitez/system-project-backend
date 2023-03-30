import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generarId from '../helpers/genererId.js'


const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim: true,
    },
    employeeId:{
        type: String,
        require: true, 
    },

    password:{
        type: String,
        require: true,  
    },
    
    email:{
        type: String,
        require: true,
        unique:true,
        trim:true,
    },

    role: 

        {
            
          type: String,
          require: true,
            
        } 

    
    ,

    token:{
      type: String,
      default: generarId(),
    },

    confirm:{
       type: Boolean,
       default:false
    }

},

{
    timestamps: true
}


);

userSchema.pre('save', async function (next){
//no permite el hash a el mismo password
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log('antes de agregar usuario')
})

userSchema.methods.verifyPassword= async function(fomPassword){
    return await bcrypt.compare(fomPassword, this.password)
}

 
const User= mongoose.model('User', userSchema);

export default User;