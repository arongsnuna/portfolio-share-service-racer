import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();
// eduSchool eduMajor eduStart eduEnd eduDegree

// educationRouter.get("/education",  async (req,res,next)=>{
//     res.send("hello")
// });

// 전체 학력 정보 조회
educationRouter.get('/:userId', async(req, res, next)=>{
    const {userId} = req.params;
    try{
        const educations = await educationService.findAll({userId});
        res.status(200).json(educations);
    }catch(error){
        next(error);
    }

});

// 전체 학력 정보 추가
// educationRouter.post('/:userId', async (req, res, next)=>{
//     const userId = req.params;
//     const newEducation = req.body;
//     try{
//         const updatedUser = await educationService.createEducation({userId, newEducation});
//         res.send(updatedUser);
//     }catch(error){
//         next(error);
//     }
    
// })
educationRouter.post('/:userId', async (req, res, next)=>{
    const {userId} = req.params;
    const {eduSchool, eduMajor, eduStart, eduEnd, eduDegree} = req.body;
    const newEducation = {eduSchool, eduMajor, eduStart, eduEnd, eduDegree};
    try{
        const createdEducation = await educationService.createEducation({userId, newEducation});
        res.send(createdEducation);
    }catch(error){
        next(error);
    }
    
});


// 학력 정보 수정
educationRouter.put('/:userId/:educationId', async(req, res, next)=>{
    const { userId, educationId } = req.params;
    const {eduSchool, eduMajor, eduStart, eduEnd, eduDegree} = req.body;
    const newEducation = {eduSchool, eduMajor, eduStart, eduEnd, eduDegree};

    try{
        const updatedEducation = await educationService.updateEducation({userId, educationId, newEducation});
        res.status(200).json(updatedEducation);
    }catch(error){
        next(error);
    }
});

// 학력 정보 삭제
educationRouter.delete("/:userId/:educationId", async(req, res, next)=>{
    const {userId, educationId} = req.params;
    try{
        const deletedEducation = await educationService.deletedEducation({userId,educationId});
        res.status(200).json(deletedEducation);
    }catch(error){
        next(error);
    }
});



export {educationRouter};