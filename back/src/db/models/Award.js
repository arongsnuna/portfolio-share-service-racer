import { AwardModel } from '../schemas/award';
import { UserModel } from '../schemas/user';

class Award {
    // 유저의 모든 수상 정보 조회
    static async findAll({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        const awards = await AwardModel.find({ userId: user._id });

        return awards;
    }

    // 유저의 특정 수상 정보 조회
    static async findById({ awardId }) {
        const award = await AwardModel.findById({ _id: awardId });

        return award;
    }

    // 수상 정보 추가
    static async create({ user_id, awardName, awardDate, awardInstitution, awardDescription }) {
        const user = await UserModel.findOne({ id: user_id });
        const createAward = await AwardModel.create({
            awardName,
            awardDate,
            awardInstitution,
            awardDescription,
            userId: user._id,
        });

        return createAward;
    }

    // 수상 정보 수정
    static async update({ user_id, awardId, awardName, awardDate, awardInstitution, awardDescription }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedAward = await AwardModel.updateOne(
            { userId: user._id, _id: awardId },
            { awardName, awardDate, awardInstitution, awardDescription }
        );

        return updatedAward;
    }

    // 수상 정보 삭제
    static async delete({ user_id, awardId }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedAward = await AwardModel.deleteOne({ _id: awardId, userId: user._id });

        return deletedAward;
    }
}

export { Award };
