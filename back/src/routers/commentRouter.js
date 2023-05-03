import is from '@sindresorhus/is';
import { Router } from 'express';
import { commentService } from '../services/commentService';
const commentRouter = Router();

//해당 게시글의 모든 댓글 조회
commentRouter.get('/:wantedId', async (req, res, next) => {
    try {
        const { wantedId } = req.params;
        const comments = await commentService.findAll({ wantedId });
        res.status(201).json(comments);
    } catch (error) {
        next(error);
    }
});

// 댓글 추가
commentRouter.post('/:wantedId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        const userId = req.currentUserId;
        const { wantedId } = req.params;
        const { commentContent } = req.body;
        const newComment = { commentContent };

        if (!commentContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdComment = await commentService.createComment({ userId, wantedId, newComment });
        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 수정
commentRouter.put('/:commentId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const { commentId } = req.params;
        const { commentContent } = req.body;
        const newComment = { commentContent };

        if (!commentContent) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }
        const updatedComment = await commentService.updateComment({ user_id, commentId, newComment });
        console.log(updatedComment);
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 삭제
commentRouter.delete('/:commentId', async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { commentId } = req.params;

        const deletedComment = await commentService.deleteComment({ user_id, commentId });

        res.status(200).json(deletedComment);
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
