import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationService } from '../services/educationService';

const eduRouter = Router();
// eduSchool eduMajor eduStart eduEnd eduDegree

eduRouter.get('/education', async (req, res, next) => {
    res.json('');
});

// 전체 학력 정보 조회
eduRouter.get('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;
    try {
        const educations = await educationService.findAll({ user_id });
        res.status(200).json(educations);
    } catch (error) {
        next(error);
    }
});

eduRouter.post('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;
    const { eduSchool, eduMajor, eduStart, eduEnd, eduDegree } = req.body;
    const newEducation = { eduSchool, eduMajor, eduStart, eduEnd, eduDegree };
    try {
        const createdEducation = await educationService.createEducation({ user_id, newEducation });
        res.send(createdEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 수정
eduRouter.put('/:user_id/:education_id', async (req, res, next) => {
    const { user_id, education_id } = req.params;
    const { eduSchool, eduMajor, eduStart, eduEnd, eduDegree } = req.body;
    const newEducation = { eduSchool, eduMajor, eduStart, eduEnd, eduDegree };
    console.log(user_id, education_id);

    try {
        const updatedEducation = await educationService.updateEducation({ user_id, education_id, newEducation });
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 삭제
eduRouter.delete('/:user_id/:education_id', async (req, res, next) => {
    const { user_id, education_id } = req.params;
    try {
        const deletedEducation = await educationService.deletedEducation({ user_id, education_id });
        res.status(200).json(deletedEducation);
    } catch (error) {
        next(error);
    }
});

export { eduRouter };
