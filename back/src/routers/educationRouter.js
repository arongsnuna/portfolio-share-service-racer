import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {educationService} from "../services/educationService";

const eduRouter = Router();
//populate 넣어서
// eduSchool eduMajor eduStart eduEnd eduDegree
eduRouter.get("education", login_required, async (req,res,next)=>{
    res.json("");
});
eduRouter.post('/education/:user_id', async (req, res, next)=>{
    const user_id = req.params;
    const newEducation = req.body;
    try{
        const updatedUser = await educationService.createEducation({user_id, newEducation});
        res.send(updatedUser);
    }catch(error){
        next(error);
    }
    
})

eduRouter.get('/education/:user_id', async(req, res, next)=>{
    const {user_id} = req.params;
    try{
        const educations = await educationService.findAll({user_id});
        res.status(200).json(educations);
    }catch(error){
        next(error);
    }

});

eduRouter.patch("/education/:user_id/:education_id", async(req,res,next)=>{
    const {user_id, education_id} = req.params;
    const {fieldToUpdate, newValue} = req.body;
    try{
        const updatedEducation = await educationService.updateEducation({user_id, education_id, fieldToUpdate, newValue});
        res.status(200).json(updatedEducation);
    }catch(error){
        next(error);
    }
})
eduRouter.delete("education/:user_id/:education_id", async(req, res, next)=>{
    const {user_id, education_id} = req.params;
    try{
        const deletedEducation = await educationService.deletedEducation({user_id,education_id});
        res.status(200).json(deletedEducation);
    }catch(error){
        next(error)
    }
})


module.exports = eduRouter;