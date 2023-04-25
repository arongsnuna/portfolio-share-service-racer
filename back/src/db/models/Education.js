import { UserModel } from '../schemas/user';
import { EducationModel } from '../schemas/education';
// crud
// eduSchool, eduMajor, eduStart, eduEnd, eduDegree

class Education {
    // 특정 유저의 전체 학력 조회
    static async findAll({ user_id }) {
        const user = await UserModel.findById({ userId: user_id }); // id를 뭐라 고쳐야되지?
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        return user.educations;
    }
    // 특정 유저의 특정 학력 조회
    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id }); //모르게써
        return user;
    }

    // 특정 유저의 학력 추가
    static async create({ user_id, id, eduSchool, eduMajor, eduStart, eduEnd, eduDegree }) {
        const user = await UserModel.findOne({ id: user_id });
        const newEducation = { id, eduSchool, eduMajor, eduStart, eduEnd, eduDegree };

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        user.educations.push(newEducation);

        await user.save();
        return user;
    }

    // 특정 유저의 학력 수정
    static async update({ user_id, education_id, fieldToUpdate, newValue }) {
        const user = await UserModel.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        const education = user.educations.id(education_id);

        if (!education) {
            throw new Error(`${education_id} 학력은 존재하지 않습니다.`);
        }

        education[fieldToUpdate] = newValue;
        await user.save();
        return education;
    }

    // 특정 유저의 학력 삭제
    static async delete({ user_id, education_id }) {
        const user = await UserModel.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const education = user.educations.id(education_id);

        if (!education) {
            throw new Error('이 학력 정보는 존재하지 않습니다.');
        }
        education.remove();
        await user.save();
        return education;
    }
}

export { Education };
