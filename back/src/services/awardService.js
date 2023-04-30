import { User, Award } from '../db';

class awardService {
    //유저의 전체 수상내역 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });
        
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const awards = await Award.findAll({ user_id });
        if (!awards) {
            throw new Error(`${user_id} 유저의 자격증 정보가 존재하지 않습니다.`)
        }

        return awards;
    }

    //유저의 개별 수상내역 추가
    static async createAward({ user_id, newAward }) {
        const user = await User.findById({ user_id: user_id });

        const { awardName, awardDate, awardInstitution, awardDescription } = newAward;

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
        }

        // const awardExists = user.awards.some((award) => award.awardName === newAward.awardName);
        // if (awardExists) {
        //     throw new Error(`${newAward.awardName} 수상내역은 이미 존재합니다.`);
        // }

        const createdAward = await Award.create({ user_id, awardName, awardDate, awardInstitution, awardDescription });

        return createdAward;
    }

    //유저의 개별 수상내역 수정
    static async updateAward({ user_id, awardId, newAward }) {
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

    }

    //개별 수상내역 삭제(awardId 로 populate)
    static async deleteAward({ user_id, awardId }) {
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
    }
}

export { awardService };
