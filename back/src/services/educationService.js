import { set } from 'mongoose';
import { User, Education } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { EducationModel } from '../db/schemas/education';
// eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree
class educationService {
    // 아이디를 통한 특정 유저의 전체 학력 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        const educations = await Education.findAll({user_id});
        if(!educations){
            throw new Error(`${user_id} 유저의 학력 정보가 존재하지 않습니다.`);
        }
        return educations;
    }

    // 특정 유저의 학력 추가
    static async createEducation({ user_id, newEducation }) {
        const user = await User.findById({ user_id: user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 추가할 수 있는 권한이 없습니다.`);
        }

        const {eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree} = newEducation;
        const createdEducation = await Education.create({user_id, eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree })

        return createdEducation;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({ user_id, education_id, newEducation }) {
        const user = await User.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 수정할 권한이 없습니다.`);
        }

        const education = await Education.findById({education_id, user_id: user_id});
    
        if (!education) {
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }
        const {eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree} = newEducation;
        const updatedEducation = await Education.update({user_id, education_id, eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree });
        return updatedEducation;

    }

    // 특정 유저의 학력 삭제
    static async deletedEducation({ user_id, education_id }) {
        const user = await User.findById({ user_id: user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 삭제할 권한이 없습니다.`);
        }
        const education = await Education.findById({education_id});
        if (!education) {
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }

        const deletedEducation = await Education.delete({user_id, education_id});

        return deletedEducation ;
    }
}
export { educationService };
