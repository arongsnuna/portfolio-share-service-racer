import { User, Comment } from '../db';

class commentService {
    // 댓글 조회
    static async findAll({ wantedId }) {
        try {
            const comment = await Comment.findAll({ wantedId });

            return comment;
        } catch (err) {
            throw new Error(`findAll() 에러 발생: ${err.message}`);
        }
    }

    // 댓글 추가
    static async createComment({ userId, wantedId, newComment }) {
        try {
            const user = await User.findById({ _id: userId });
            const { commentContent } = newComment;

            const createdComment = await Comment.create({ userId, wantedId, commentContent });
            return createdComment;
        } catch (err) {
            throw new Error(`createComment() 에러 발생: ${err.message}`);
        }
    }

    // 댓글 수정
    static async updateComment({ user_id, commentId, newComment }) {
        try {
            const user = await User.findById({ user_id: user_id });
            const { commentContent } = newComment;

            if (user.id !== user_id) {
                throw new Error(`댓글을 수정할 권한이 없습니다.`);
            }

            const comment = await Comment.findById({ commentId });
            if (!comment) {
                throw new Error(`${commentId} 코멘트는 존재하지 않습니다.`);
            }
            const updatedComment = await Comment.update({ user_id, commentId, commentContent });

            return updatedComment;
        } catch (err) {
            throw new Error(`updateComment() 에러 발생: ${err.message}`);
        }
    }

    // 댓글 삭제
    static async deleteComment({ user_id, commentId }) {
        try {
            const user = await User.findById({ user_id: user_id });
            if (user.id !== user_id) {
                throw new Error(`댓글을 삭제할 권한이 없습니다.`);
            }

            const comment = await Comment.findById({ commentId });
            if (!comment) {
                throw new Error(`${commentId} 코멘트는 존재하지 않습니다.`);
            }

            const deletedComment = await Comment.delete({ user_id, commentId });
            return deletedComment;
        } catch (err) {
            throw new Error(`deleteComment() 에러 발생: ${err.message}`);
        }
    }
}

export { commentService };
