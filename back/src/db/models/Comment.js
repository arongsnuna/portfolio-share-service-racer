import { UserModel } from '../schemas/user';
import { CommentModel } from '../schemas/comment';

class Comment {
    // 게시물에 달린 모든 댓글 조회
    static async findAll({ wantedId }) {
        const comment = await CommentModel.find({ wantedId: wantedId });

        return comment;
    }

    // 특정 댓글 조회
    static async findById({ commentId }) {
        const comment = await CommentModel.findById({ _id: commentId });
        return comment;
    }

    // 댓글 추가
    static async create({ userId, wantedId, commentContent }) {
        const user = await UserModel.findOne({ _id: userId });

        const createdComment = await CommentModel.create({
            wantedId,
            commentContent,
            userId: user._id,
            userName: user.name,
            userImageUri: user.userImage.imageUri,
        });

        return createdComment;
    }

    // 댓글 수정
    static async update({ user_id, commentId, commentContent }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedComment = await CommentModel.updateOne({ userId: user._id, _id: commentId }, { commentContent });

        return updatedComment;
    }

    // 댓글 삭제
    static async delete({ user_id, commentId }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedComment = await CommentModel.deleteOne({ _id: commentId, userId: user._id });

        return deletedComment;
    }
}

export { Comment };
