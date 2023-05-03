import is from '@sindresorhus/is';
import { Router } from 'express';
import { wantedService } from '../services/wantedService';

const wantedRouter = Router();

// 전체 모집 정보 조회
wantedRouter.get('/', async (req, res, next) => {
    try {
        console.log('라우터들어옴')
        const wanted = await wantedService.findAll();
        res.status(200).json(wanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 추가
wantedRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        
        const userId = req.currentUserId;
        
        const { wantedTitle, wantedContent } = req.body;
        
        const newWanted = { wantedTitle, wantedContent };

        if (!wantedTitle || !wantedContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdWanted = await wantedService.createWanted({ userId, newWanted });
        res.status(201).json(createdWanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 수정
wantedRouter.put('/:wantedId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { wantedId } = req.params;
        const { wantedTitle, wantedContent } = req.body;

        if (!wantedTitle || !wantedContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newWanted = { wantedTitle, wantedContent };

        const updatedWanted = await wantedService.updateWanted({ userId, wantedId, newWanted });
        res.status(200).json(updatedWanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 삭제
wantedRouter.delete('/:wantedId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { wantedId } = req.params;

        const deletedWanted = await wantedService.deleteWanted({ userId, wantedId });

        res.status(200).json(deletedWanted);
    } catch (error) {
        next(error);
    }
});

export { wantedRouter };
