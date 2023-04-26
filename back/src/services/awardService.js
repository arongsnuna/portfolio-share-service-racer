import { User, Award } from "../db";
//여기에는 비즈니스 로직. 예컨대 동일한 이름의 수상내역은 넣을수없다.
class awardService {
  //유저의 전체 수상내역 조회
  static async findAll({ user_id }) {
    const user = await User.findById({user_id});

    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    return user.awards;
  }
  
  //유저 본인이 로그인했다면 개별 수상내역을 추가
  static async createAward({ user_id, newAward }) {
    const user = await User.findById({user_id});
    if(!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }
    if (user.id !== user_id) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    //기존 award 배열에 동일한 이름이 있다면 true를 반환
    const awardExists = user.awards.some(award => award.awardName === newAward.awardName);
    if (awardExists) {
      throw new Error(`${newAward.awardName} 수상내역은 이미 존재합니다.`)
    }
    
    user.awards.push(newAward);
    await user.save();
    return user;
  }

  //개별 수상내역 수정(award_id 로 populate)
  static async updateAward({user_id, award_id, revisedAward}) {
    const user = await User.findById({user_id});
    const award = user.awards.id(award_id);

    if (!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== user_id) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    if (!award) {
      throw new Error(`이 수상내역은 존재하지 않습니다.`);
    }

    //기존 award 배열에 동일한 이름이 있다면 true를 반환
    const awardExists = user.awards.some(award => award.awardName === revisedAward.awardName);
    if (awardExists) {
      throw new Error(`${newAward.awardName} 수상내역은 이미 존재합니다.`)
    }   

    Object.entries(revisedAward).forEach(([key, value]) => {
      award[key] = value;
    });

    await user.save();
    return award;
  }

  //개별 수상내역 삭제(award_id 로 populate)
  static async deleteAward({user_id, award_id}) {
    const user = await User.findById({user_id});
    const award = user.awards.id(award_id);
    if (!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== user_id) {
      throw new Error(`수상내역을 삭제할 수 있는 권한이 없습니다.`);
    }

    if (!award) {
      throw new Error(`이 수상내역은 존재하지 않습니다.`);
    }

    award.remove();
    await user.save();
    return award;
  } 

}

export { awardService };
