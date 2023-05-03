import { User, Award } from '../db';

class awardService {
    //유저의 전체 수상내역 조회
    static async findAll({ user_id }) {
        try {
            const user = await User.findById({ user_id });

            if (!user) {
                throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
            }

            const awards = await Award.findAll({ user_id });
            if (!awards) {
                throw new Error(`${user_id} 유저의 자격증 정보가 존재하지 않습니다.`);
            }

            return awards;
        } catch (err) {
            throw new Error(`findAll() 에러 발생: ${err.message}`);
        }
    }

    //유저의 개별 수상내역 추가
    static async createAward({ user_id, newAward }) {
        try {
            const user = await User.findById({ user_id: user_id });

            const { awardName, awardDate, awardInstitution, awardDescription } = newAward;

            if (!user) {
                throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== user_id) {
                throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
            }

            const createdAward = await Award.create({ user_id, awardName, awardDate, awardInstitution, awardDescription });

            return createdAward;
        } catch (err) {
            throw new Error(`createAward() 에러 발생: ${err.message}`);
        }
    }

    //유저의 개별 수상내역 수정
    static async updateAward({ user_id, awardId, newAward }) {
        try {
            const user = await User.findById({ user_id: user_id });
            const { awardName, awardDate, awardInstitution, awardDescription } = newAward;

            if (!user) {
                throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== user_id) {
                throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
            }

            const award = await Award.findById({ awardId, userId: user_id });
            if (!award) {
                throw new Error('이 수상내역은 존재하지 않습니다.');
            }

            const updatedAward = await Award.update({ user_id, awardId, awardName, awardDate });

            return updatedAward;
        } catch (err) {
            throw new Error(`updateAward() 에러 발생: ${err.message}`);
        }
    }

    //개별 수상내역 삭제(awardId 로 populate)
    static async deleteAward({ user_id, awardId }) {
        try {
            const user = await User.findById({ user_id: user_id });

            if (!user) {
                throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== user_id) {
                throw new Error(`수상내역을 삭제할 수 있는 권한이 없습니다.`);
            }

            const award = await Award.findById({ awardId });
            if (!award) {
                throw new Error(`이 수상내역은 존재하지 않습니다.`);
            }

            const deleteAward = await Award.delete({ user_id, awardId });

            return deleteAward;
        } catch (err) {
            throw new Error(`deleteAward() 에러 발생: ${err.message}`);
        }
    }
}

export { awardService };
