import { User, Wanted } from '../db';

class wantedService {
    //전체 모집 정보를 얻음
    static async findAll() {
        try {
            const wanted = await Wanted.findAll();
            return wanted;
        } catch (err) {
            throw new Error()
        }
    }
    
    //특정 모집 정보를 얻음
    static async findWanted({ wantedId }) {
        try {
            const wanted = await Wanted.findById({ wantedId });

            if (!wanted) {
                throw new Error(`${wantedId} 모집 정보는는 존재하지 않습니다.`);
            }

            return wanted;
        } catch (err) {
            throw new Error(`findWanted() 에러 발생: ${err.message}`);
        }
    }

    //모집 정보 추가
    static async createWanted({ userId, newWanted }) {
        try {
            const user = await User.findById({ _id : userId });
            const { wantedTitle, wantedContent } = newWanted;

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            const createdWanted = await Wanted.create({ userId, wantedTitle, wantedContent });
            
            return createdWanted;
        } catch (err) {
            throw new Error(`createWanted() 에러 발생: ${err.message}`);
        }
    }

    //모집 정보 수정
    static async updateWanted({ userId, wantedId, newWanted }) {
        try{  
            const user = await User.findById({ _id: userId });
            const { wantedTitle, wantedContent } = newWanted;

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== userId) {
                throw new Error(`모집 정보를 수정할 수 있는 권한이 없습니다.`);
            }

            const wanted = await Wanted.findById({ wantedId });
            if (!wanted) {
                throw new Error(`이 모집 정보는 존재하지 않습니다.`);
            }

            const updatedWanted = await Wanted.update({ userId, wantedId, wantedTitle, wantedContent });

            return updatedWanted;
        } catch (err) {
            throw new Error(`updateWanted() 에러 발생: ${err.message}`);
        }
    }

    //모집 정보 삭제
    static async deleteWanted({ userId, wantedId }) {
        try {    
            const user = await User.findById({ _id: userId });

            if (!user) {
                throw new Error(`${userId} 유저는 존재하지 않습니다.`);
            }

            if (user.id !== userId) {
                throw new Error(`모집 정보를 삭제할 수 있는 권한이 없습니다.`);
            }

            const wanted = await Wanted.findById({ wantedId });
            if (!wanted) {
                throw new Error(`이 모집 정보는 존재하지 않습니다.`);
            }

            const deletedWanted = await Wanted.delete({ userId, wantedId });

            return deletedWanted;
        } catch (err) {
            throw new Error(`deleteWanted() 에러 발생: ${err.message}`);
        }
    }
}

export { wantedService };