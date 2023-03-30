import mongoose from 'mongoose'


const applicationSchema = mongoose.Schema({

    medicalUnit:{
        type: String,
        require: true,

    },
    startDate:{
      type: Date,
      require: true,
      default: Date.now()
    },

    endDate:{
        type: Date,
        require: true,
        default: Date.now()
    },

    doctorName:{
        type: String,
        require: true,
    },

    medicalDiagnostic:{
        type: String,
        require: true,
    },

    coverageDays:{
        type: Number,
        require: true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
{

timestamps: true

});

const Application= mongoose.model('Application', applicationSchema);

export default Application;