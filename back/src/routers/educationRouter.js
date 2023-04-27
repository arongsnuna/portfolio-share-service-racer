import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationService } from '../services/educationService';

const eduRouter = Router();
// eduSchool eduMajor eduStart eduEnd eduDegree

eduRouter.get('/education', async (req, res, next) => {
    res.json('');
});

eduRouter.get('/education/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const educations = await educationService.findAll({ userId });
        res.status(200).json(educations);
    } catch (error) {
        next(error);
    }
});

eduRouter.post('/education/:userId', async (req, res, next) => {
    const userId = req.params;
    const newEducation = req.body;
    try {
        const updatedUser = await educationService.createEducation({ userId, newEducation });
        res.send(updatedUser);
    } catch (error) {
        next(error);
    }
});

eduRouter.patch('/education/:userId/:educationId', async (req, res, next) => {
    const { userId, educationId } = req.params;
    const { fieldToUpdate, newValue } = req.body;
    try {
        const updatedEducation = await educationService.updateEducation({ userId, educationId, fieldToUpdate, newValue });
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
});
eduRouter.delete('/education/:userId/:educationId', async (req, res, next) => {
    const { userId, educationId } = req.params;
    try {
        const deletedEducation = await educationService.deletedEducation({ userId, educationId });
        res.status(200).json(deletedEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 삭제
educationRouter.delete('/:user_id/:education_id', async (req, res, next) => {
    const { user_id, education_id } = req.params;
    try {
        const deletedEducation = await educationService.deletedEducation({ user_id, education_id });
        res.status(200).json(deletedEducation);
    } catch (error) {
        next(error);
    }
});

export { educationRouter };
