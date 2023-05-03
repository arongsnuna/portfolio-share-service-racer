import is from '@sindresorhus/is';
import { Router } from 'express';
import { awardService } from '../services/awardService';
import { util } from '../utils/util';

const awardRouter = Router();

//전체 수상내역 조회
awardRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const awards = await awardService.findAll({ userId });
        res.status(200).json(awards);
    } catch (error) {
        next(error);
    }
    
});

//수상내역 추가
awardRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { awardName, awardDate, awardInstitution, awardDescription } = req.body;

        const newAward = { awardName, awardDate, awardInstitution, awardDescription };

        if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
            throw new Error({ message: '모든 값을 입력했는지 확인해주세요.' });
        }

        if (!util.regexp(awardDate)) {
            throw new Error('취득일자 값을 확인해주세요');
        }

        const createdAward = await awardService.createAward({ userId, newAward });

        res.status(201).send(createdAward);
    } catch (error) {
        next(error);
    }
});

//수상내역 수정
awardRouter.put('/:awardId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { awardId } = req.params;
        const { awardName, awardDate, awardInstitution, awardDescription } = req.body;

        const newAward = { awardName, awardDate, awardInstitution, awardDescription };
    
        if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
            throw new Error({ message: '모든 값을 입력했는지 확인해주세요.' });
        }

        if (!util.regexp(awardDate)) {
            throw new Error('취득일자 값을 확인해주세요');
        }
    
        const updatedAward = await awardService.updateAward({ userId, awardId, newAward });
        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
});

//수상내역 삭제
awardRouter.delete('/:awardId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { awardId } = req.params;

        const deletedAward = await awardService.deleteAward({ userId, awardId });

        res.status(200).json(deletedAward);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
