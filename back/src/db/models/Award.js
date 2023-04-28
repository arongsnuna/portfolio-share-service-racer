import { UserModel } from "../schemas/user";

class Award {
  //유저의 모든 수상내역 조회
  static async findAll({ userId }) {
    const user = await UserModel.findOne(userId);

    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }
    return user.awards;
  }

  //수상내역 추가
  static async create({ userId, newAward }) {
    const user = await UserModel.findOne({id: userId});
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }

    user.awards.push(newAward);
    await user.save();

    return user;
  }
  //수상내역을 수정, 삭제
  static async update({ userId, awardId, fieldToUpdate, newValue }) {
    const user = await UserModel.findOne({id: userId});
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }

    const award = user.awards.id(awardId);
    if (!award) { 
        throw new Error("이 수상내역은 존재하지 않습니다.");
    }

    award[fieldToUpdate] = newValue;
    await user.save();
    return award;
  }

  static async delete({ userId, awardId }) {
    const user = await UserModel.findOne({id: userId});
    //해당 유저가 존재하지 않을 경우 에러 발생.
    if(!user) {
        throw new Error(`${userId} 유저는 존재하지 않습니다.`)
    }

    const award = user.awards.id(awardId);
    if (!award) { 
        throw new Error("이 수상내역은 존재하지 않습니다.");
    }

    award.remove();
    await user.save();
    
    return award;
  }
}

export { Award };