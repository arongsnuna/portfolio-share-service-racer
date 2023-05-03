import { Router } from 'express';
import is from '@sindresorhus/is';
import { educationService } from '../services/educationService';
import { util } from '../utils/util';

const eduRouter = Router();
// eduSchool eduMajor eduEnterDate eduGraduateDate eduDegree

// 전체 학력 정보 조회
eduRouter.get('/', async (req, res, next) => {
    const user_id = req.currentUserId;
    try {
        const educations = await educationService.findAll({ user_id });
        res.status(200).json(educations);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 추가
eduRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Context-Type을 application/json으로 설정해주세요');
        }
        const user_id = req.currentUserId;
        const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = req.body;
        const newEducation = { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree };

        if (!eduSchool || !eduMajor || !eduEnterDate || !eduGraduateDate || !eduDegree) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }
        if (!util.regexp(eduEnterDate)) {
            throw new Error('입학일자 값을 확인해주세요.');
        }
        if (!util.regexp(eduGraduateDate)) {
            throw new Error('졸업일자 값을 확인해주세요.');
        }
        const createdEducation = await educationService.createEducation({ user_id, newEducation });
        res.status(201).json(createdEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 수정
eduRouter.put('/:education_id', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Context-Type을 application/json으로 설정해주세요');
        }
        const user_id = req.currentUserId;
        const { education_id } = req.params;
        const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = req.body;

        if (!eduSchool || !eduMajor || !eduEnterDate || !eduGraduateDate || !eduDegree) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }
        if (!util.regexp(eduEnterDate)) {
            throw new Error('입학일자 값을 확인해주세요.');
        }
        if (!util.regexp(eduGraduateDate)) {
            throw new Error('졸업일자 값을 확인해주세요.');
        }

        const newEducation = { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree };
        const updatedEducation = await educationService.updateEducation({ user_id, education_id, newEducation });
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 삭제
eduRouter.delete('/:education_id', async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { education_id } = req.params;
        const deletedEducation = await educationService.deletedEducation({ user_id, education_id });
        res.status(200).json(deletedEducation);
    } catch (error) {
        next(error);
    }
});

export { eduRouter };
