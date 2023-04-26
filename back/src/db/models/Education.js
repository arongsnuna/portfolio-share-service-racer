import {UserModel} from "../schemas/user";
// crud
// eduSchool, eduMajor, eduStart, eduEnd, eduDegree

class Education {
  // 특정 유저의 학력 추가
  static async create({ user_id, newEducation }) {
    const user = await UserModel.findById({user_id});
    if(!user){
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
    }
    user.educations.push(newEducation);

    await user.save();
    return user;
  }

  // 특정 유저의 학력 조회
  static async findAll({user_id}) {
    const user = await UserModel.findById({user_id});
    if(!user){
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
    }
    return user.educations;
  }

  // 특정 유저의 학력 수정
  static async update({ user_id, education_id, fieldToUpdate, newValue }) {
    const user = await UserModel.findById({user_id});
    if(!user){
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
    }
    const education = user.educations.id(education_id);

    if(!education){
      throw new Error(`${education_id} 학력은 존재하지 않습니다.`)
    }
    if(user.id !== user_id){
      throw new Error(`${user_id} 유저는 권한이 없습니다.`)
    }
    education[fieldToUpdate] = newValue;
    await user.save();
    return education;
  }

  // 특정 유저의 학력 삭제
  static async delete({user_id, education_id}){
    const user = await UserModel.findById({user_id});
    if(!user){
      throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
    }
    if(user.id !== user_id){
      throw new Error(`${user_id} 유저는 권한이 없습니다.`)
    }
    const education = user.educations.id(education_id);
    education.remove();
    await user.save();
    return user;

  }
}

export { Education };
