import {UserModel} from "../schemas/user";
// crud
// eduSchool, eduMajor, eduStart, eduEnd, eduDegree

class Education {
  // 특정 유저의 학력 추가
  static async create({ userId, newEducation }) {
    const user = await UserModel.findById({userId});
    if(!user){
      throw new Error(`${userId} 유저는 존재하지 않습니다.`);
    }
    user.educations.push(newEducation);

    await user.save();
    return user;
  }

  // 특정 유저의 학력 조회
  static async findAll({userId}) {
    const user = await UserModel.findById({userId});
    if(!user){
      throw new Error(`${userId} 유저는 존재하지 않습니다.`);
    }
    return user.educations;
  }

  // 특정 유저의 학력 수정
  static async update({ userId, educationId, fieldToUpdate, newValue }) {
    const user = await UserModel.findById({userId});
    if(!user){
      throw new Error(`${userId} 유저는 존재하지 않습니다.`);
    }
    const education = user.educations.id(educationId);

    if(!education){
      throw new Error(`${educationId} 학력은 존재하지 않습니다.`)
    }
    if(user.id !== userId){
      throw new Error(`${userId} 유저는 권한이 없습니다.`)
    }
    education[fieldToUpdate] = newValue;
    await user.save();
    return education;
  }

  // 특정 유저의 학력 삭제
  static async delete({userId, educationId}){
    const user = await UserModel.findById({userId});
    if(!user){
      throw new Error(`${userId} 유저는 존재하지 않습니다.`);
    }
    if(user.id !== userId){
      throw new Error(`${userId} 유저는 권한이 없습니다.`)
    }
    const education = user.educations.id(educationId);
    education.remove();
    await user.save();
    return user;

  }
}

export { Education };
