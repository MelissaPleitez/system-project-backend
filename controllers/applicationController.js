import Application from '../models/Application.js'


const addApplication=  async (req, res)=>{

   
    const application = new Application(req.body);
    application.user = req.user._id

    try {
        
        const applicationSave= await application.save()
        res.json(applicationSave);
      
         
        
    } catch (error) {
        console.log(error);
    }

};



const getApplication= async (req, res)=>{
   
    if (req.user.role === "hr") {
        const applications = await Application.find()
        // si el role es 'hr', se muestra toda la data
        res.json(applications);
      } else {
        // si el role no es 'hr', se muestra solo la data creada por el usuario
        const applications = await Application.find().where('user').equals(req.user);
        res.json(applications)
      }
   ;
}; 




const getApplications= async (req, res)=>{
    const {id}= req.params;

    const applications = await Application.findById(id);

    if(!applications){
        res.status(404).json({mgs: "No found"})
    }

    if(applications.user._id.toString() !== req.user._id.toString()){

        return res.json({msg: "no valid"});

    }
  
    if(applications){
        res.json({applications});
    }

    // console.log(applications)
};


// const updateApplication= async (req, res)=>{
    
// };




const deleteApplication= async (req, res)=>{

    const {id}= req.params;

    const applications = await Application.findById(id);

    if(!applications){
        res.status(404).json({mgs: "No found"})
    }

    if (req.user.role === "hr") {
        await applications.deleteOne()
        res.json({mgs: "Application deleted!"})
      } else{

        if(applications.user._id.toString() !== req.user._id.toString()){

            return res.json({msg: "no valid"});
    
        }

      }

    try {

        await applications.deleteOne()
        res.json({mgs: "Application deleted!"})
        
    } catch (error) {
        console.log(error)
    }

   
};

export {
    addApplication,
    getApplication,
    deleteApplication,
    getApplications,
    
}