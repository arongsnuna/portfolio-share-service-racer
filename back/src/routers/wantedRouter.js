import is from '@sindresorhus/is';
import { Router } from 'express';
import { wantedService } from '../services/wantedService';

const wantedRouter = Router();

// 전체 모집 정보 조회
wantedRouter.get('/', async (req, res, next) => {
    try {
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

        const user_id = req.currentUserId;
        const { wantedTitle, wantedContent } = req.body;

        const newWanted = { wantedTitle, wantedContent };

        if (!wantedTitle || !wantedContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdWanted = await wantedService.createWanted({ user_id, newWanted });
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

        const user_id = req.currentUserId;
        const { wantedId } = req.params;
        const { wantedTitle, wantedContent } = req.body;

        if (!wantedTitle || !wantedContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newWanted = { wantedTitle, wantedContent };

        const updatedWanted = await wantedService.updateWanted({ user_id, wantedId, newWanted });
        res.status(200).json(updatedWanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 삭제
wantedRouter.delete('/:wantedId', async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { wantedId } = req.params;

        const deletedWanted = await wantedService.deleteWanted({ user_id, wantedId });

        res.status(200).json(deletedWanted);
    } catch (error) {
        next(error);
    }
});

// 댓글 추가
wantedRouter.post('/:wantedId/comment', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        const user_id = req.currentUserId;
        const { wantedId } = req.params;
        const { commentContent } = req.body;
        const newComment = { commentContent };

        if (!commentContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdComment = await wantedService.createComment({ user_id, wantedId, newComment });
        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 수정
wantedRouter.put('/:wantedId/comment/:commentId', async (req, res, next) => {
    try {
        
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const { wantedId, commentId } = req.params;
        const { commentContent } = req.body;

        if (!commentContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const updatedComment = await wantedService.updateComment({ user_id, wantedId, commentId, commentContent });
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 삭제
wantedRouter.delete('/:wantedId/comment/:commentId', async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { wantedId, commentId } = req.params;

        const deletedComment = await wantedService.deleteComment({ user_id, wantedId, commentId });

        res.status(200).json(deletedComment);
    } catch (error) {
        next(error);
    }
});

export { wantedRouter };
