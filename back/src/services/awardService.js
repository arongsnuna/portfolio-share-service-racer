import { User, Award } from '../db';

class awardService {
    //유저의 전체 수상내역 조회
    static async findAll({ userId }) {
        try {
            const user = await User.findById({ userId });
            
            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            const awards = await Award.findAll({ userId });
            if (!awards) {
                throw new Error(`${userId} 유저의 자격증 정보가 존재하지 않습니다.`)
            }

            return awards;
        } catch (err) {
            throw new Error(`findAll() 에러 발생: ${err.message}`);
        }
    }

    //유저의 개별 수상내역 추가
    static async createAward({ userId, newAward }) {
        try {
            const user = await User.findById({ _id: userId });

            const { awardName, awardDate, awardInstitution, awardDescription } = newAward;

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== userId) {
                throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
            }

            const createdAward = await Award.create({ userId, awardName, awardDate, awardInstitution, awardDescription });
            
            return createdAward;
        } catch (err) {
            throw new Error(`createAward() 에러 발생: ${err.message}`);
        }
    }

    //유저의 개별 수상내역 수정
    static async updateAward({ userId, awardId, newAward }) {
        try{  
            const user = await User.findById({ _id: userId });
            const { awardName, awardDate, awardInstitution, awardDescription } = newAward;

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== userId) {
                throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
            }

            const award = await Award.findById({ awardId, userId: userId });
            if (!award) {
                throw new Error('이 수상내역은 존재하지 않습니다.');
            }

            const updatedAward = await Award.update({ userId, awardId, awardName, awardDate });

            return updatedAward;
        } catch (err) {
            throw new Error(`updateAward() 에러 발생: ${err.message}`);
        }

    }

    //개별 수상내역 삭제(awardId 로 populate)
    static async deleteAward({ userId, awardId }) {
        try {    
            const user = await User.findById({ _id: userId });

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== userId) {
                throw new Error(`수상내역을 삭제할 수 있는 권한이 없습니다.`);
            }

            const award = await Award.findById({ awardId });
            if (!award) {
                throw new Error(`이 수상내역은 존재하지 않습니다.`);
            }

            const deleteAward = await Award.delete({ userId, awardId });

            return deleteAward;
        } catch (err) {
            throw new Error(`deleteAward() 에러 발생: ${err.message}`);
        }
    }
}

export { awardService };
