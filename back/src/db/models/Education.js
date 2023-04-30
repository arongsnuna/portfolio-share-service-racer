import { UserModel } from '../schemas/user';
import { EducationModel } from '../schemas/education';
// crud
// eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree

class Education {
    // 특정 유저의 전체 학력 조회
    static async findAll({ user_id }) {
        const user = await UserModel.findOne({ id: user_id }); 
        const educations = await EducationModel.find({userId: user._id});
        return educations;
    }
    // 특정 유저의 특정 학력 조회
    static async findById({ education_id }) {
        const education = await EducationModel.findById({_id: education_id});
        return education;
    }

    // 특정 유저의 학력 추가
    static async create({ user_id, eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree }) {
        const user = await UserModel.findOne({ id: user_id });
        const createdEducation = await EducationModel.create({eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree, userId: user._id});
        return createdEducation;
    }

    // 특정 유저의 학력 수정
    static async update({ user_id, education_id,eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedEducation = await EducationModel.updateOne({userId: user._id, _id: education_id},{eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree});
        return updatedEducation;
    }

    // 특정 유저의 학력 삭제
    static async delete({ user_id, education_id }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedEducation = await EducationModel.deleteOne({_id: education_id, userId: user._id});
        return deletedEducation;
    }
}

export { Education };
