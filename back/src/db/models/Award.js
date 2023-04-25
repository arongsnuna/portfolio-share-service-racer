import { AwardModel } from "../schemas/award";
import { UserModel } from "../schemas/user";

class Award {
  //유저의 모든 수상내역 조회
  static async findAll({ user_id }) {
    const user = await UserModel.findById(user_id);

    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }
    return user.awards;
  }

  //수상내역 추가
  static async create({ user_id, newAward }) {
    const user = await UserModel.findbyId(user_id);
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    user.awards.push(newAward);
    await user.save();

    return user;
  }
  //수상내역을 수정, 삭제
  static async update({ user_id, award_id, fieldToUpdate, newValue }) {
    const user = await UserModel.findbyId(user_id);
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    const award = user.awards.id(award_id);
    if (!award) { 
        throw new Error("이 수상내역은 존재하지 않습니다.");
    }

    award[fieldToUpdate] = newValue;
    await user.save();
    return award;
  }

  static async delete({ user_id, award_id }) {
    const user = await UserModel.findbyId(user_id);
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${user_id} 유저는 존재하지 않습니다.`)
    }

    const award = user.awards.id(award_id);
    if (!award) { 
        throw new Error("이 수상내역은 존재하지 않습니다.");
    }

    award.remove();
    await user.save();
    
    return award;
  }
}

export { Award };