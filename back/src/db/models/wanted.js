import { WantedModel } from '../schemas/wanted';
import { UserModel } from '../schemas/user';

class Wanted {
    // 모든 모집 정보 조회
    static async findAll() {
        const wanted = await WantedModel.find({});
        return wanted;
    }

    // 특정 모집 정보 조회
    static async findById({ wantedId }) {
        const wanted = await WantedModel.findById({ _id: wantedId });
        return wanted;
    }

    // 모집 정보 추가
    static async create({ user_id, wantedTitle, wantedContent }) {
        const user = await UserModel.findOne({ id: user_id });
        const createWanted = await WantedModel.create({ wantedTitle, wantedContent, userId: user._id });
        return createWanted;
    }

    // 모집 정보 수정
    static async update({ user_id, wantedId, wantedTitle, wantedContent }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedWanted = await WantedModel.updateOne({ userId: user._id, _id: wantedId }, { wantedTitle, wantedContent });
        return updatedWanted;
    }

    // 모집 정보 삭제
    static async delete({ user_id, wantedId }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedWanted = await WantedModel.deleteOne({ _id: wantedId, userId: user._id });

        return deletedWanted;
    }
    
    // 코멘트 추가
    static async createComment({ user_id, wantedId, commentContent }) { 
        const user = await UserModel.findOne({ id: user_id });
        const newComment = { userId: user._id, commentContent };
        const updatedWanted = await WantedModel.findOneAndUpdate(
            { _id: wantedId },
            { $push: { comment: newComment } },
            { new: true }
        );
        return updatedWanted;
    }

    // 코멘트 수정
    static async updateComment({ user_id, wantedId, commentId, commentContent }) {
        const user = await UserModel.findOne({ id: user_id });
    
        const updatedWanted = await WantedModel.findOneAndUpdate(
            { _id: wantedId },
            { $set: { 'comment.$[elem].commentContent': commentContent } },
            { new: true, arrayFilters: [{ 'elem._id': commentId, 'elem.userId': user._id }] }
        );
        return updatedWanted;
    }

// 코멘트 삭제
    static async deleteComment({ user_id, wantedId, commentId }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedWanted = await WantedModel.findOneAndUpdate(
            { _id: wantedId, comment: { $elemMatch: { _id: commentId, userId: user._id } } },
            { $pull: { comment: { _id: commentId } } },
            { new: true }
        );
        return updatedWanted;
    }
}

export { Wanted };
