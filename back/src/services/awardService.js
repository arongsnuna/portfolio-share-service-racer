import { User } from "../db";

class awardService {

  //유저의 전체 수상내역 조회
  static async findAll({ userId }) {
    const user = await User.findById({ userId });

    if(!user) {
        throw new Error(`${userId} 유저는 존재하지 않습니다!!!`)
    }

    return user.awards;
  }
  
  //유저 본인이 로그인했다면 개별 수상내역을 추가
  static async createAward({ userId, newAward }) {
    const user = await User.findById({userId});
    const { awardName, awardInstitution, awardDescription } = newAward;
    const awardDate = new Date(newAward.awardDate).toISOString().substring(0, 10);

    if(!user) {
      throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }
    if (user.id !== userId) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    //기존 award 배열에 동일한 이름이 있다면 true를 반환
    const awardExists = user.awards.some(award => award.awardName === newAward.awardName);
    if (awardExists) {
      throw new Error(`${newAward.awardName} 수상내역은 이미 존재합니다.`)
    }
    
    const newData = { awardName, awardDate, awardInstitution, awardDescription };

    user.awards.push(newData);
    await user.save();
    return user;
  }

  //개별 수상내역 수정(awardId 로 populate)
  static async updateAward({userId, awardId, newAward}) {
    const user = await User.findById({userId});
    const { awardName, awardInstitution, awardDescription } = newAward;
    const awardDate = new Date(newAward.awardDate).toISOString().substring(0, 10);

    if (!user) {
      throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== userId) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    const award = user.awards.id(awardId);
    if (!award) {
      throw new Error(`이 수상내역은 존재하지 않습니다.`);
    }

    //기존 award 배열에 동일한 이름이 있다면 true를 반환
    const awardExists = user.awards.some(award => award.awardName === newAward.awardName);
    if (awardExists) {
      throw new Error(`${newAward.awardName} 수상내역은 이미 존재합니다.`)
    }   

    const newData = { awardName, awardDate, awardInstitution, awardDescription };
    Object.entries(newData).forEach(([key, value]) => {
      award[key] = value;
    });

    await user.save();
    return award;
  }

  //개별 수상내역 삭제(awardId 로 populate)
  static async deleteAward({userId, awardId}) {
    const user = await User.findById({userId});

    if (!user) {
      throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== userId) {
      throw new Error(`수상내역을 삭제할 수 있는 권한이 없습니다.`);
    }

    const award = user.awards.id(awardId);
    if (!award) {
      throw new Error(`이 수상내역은 존재하지 않습니다.`);
    }

    award.remove();
    await user.save();
    return award;
  } 

}

export { awardService };