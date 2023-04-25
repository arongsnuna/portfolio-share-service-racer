import { User, Award } from "../db";

class awardService {
  //유저의 전체 수상내역 조회
  static async findAll({ user_id }) {
    const user = await User.findById(user_id);

    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    return user.awards;
  }
  
  //유저 본인이 로그인했다면 개별 수상내역을 추가
  static async createAward({ user_id, newAward }) {
    const user = await User.findById(user_id);

    if(!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== newAward.user) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    user.awards.push(newAward);
    await user.save();
    return user;
  }

  //개별 수상내역 수정
  static async updateAward({user_id, award_id, fieldToUpdate, newValue}) {
    const user = await User.findById(user_id);
    const award = user.awards.id(awards_id);

    if (!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== newAward.user) {
      throw new Error(`수상내역을 추가할 수 있는 권한이 없습니다.`);
    }

    if (!award) {
      throw new Error(`이 수상내역은 존재하지 않습니다.`);
    }

    award[fieldToUpdate] = newValue;
    await user.save();
    return award;
  }

  //개별 수상내역 삭제
  static async deleteAward({user_id, award_id}) {
    const user = await User.findById(user_id);
    const award = user.awards.id(awards_id);

    if (!user) {
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    if (user.id !== newAward.user) {
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
