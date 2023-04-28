import { set } from 'mongoose';
import { User, Education } from '../db';
import { v4 as uuidv4 } from 'uuid';
// eduSchool, eduMajor, eduStart, eduEnd, eduDegree
class educationService {
    // 아이디를 통한 특정 유저의 전체 학력 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        return user.educations;
    }

    // 특정 유저의 학력 추가
    static async createEducation({ user_id, newEducation }) {
        const user = await User.findById({ user_id });

        // eduSchool, eduMajor, eduStart, eduEnd, eduDegree
        const eduSchool = newEducation.eduSchool;
        const eduMajor = newEducation.eduMajor;
        const eduStart = new Date(newEducation.eduStart).toISOString().substring(0, 10);
        const eduEnd = new Date(newEducation.eduEnd).toISOString().substring(0, 10);
        const eduDegree = newEducation.eduDegree;

        const setEducation = { eduSchool, eduMajor, eduStart, eduEnd, eduDegree };

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 추가할 수 있는 권한이 없습니다.`);
        }
        if (!eduSchool || !eduMajor || !eduStart || !eduEnd || !eduDegree) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        user.educations.push(setEducation);
        await user.save();
        return user;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({ user_id, education_id, newEducation }) {
        console.log('Service 요청 들어옴');
        const user = await User.findById({ user_id });
        const newSchool = newEducation.eduSchool;
        const newMajor = newEducation.eduMajor;
        const newStart = newEducation.eduStart;
        const newEnd = newEducation.eduEnd;
        const newDegree = newEducation.eduDegree;

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 수정할 권한이 없습니다.`);
        }

        const education = user.educations.filter((data) => data.id === education_id);

        if (!education) {
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }

        education[0].eduSchool = newSchool;
        education[0].eduMajor = newMajor;
        education[0].eduStart = newStart;
        education[0].eduEnd = newEnd;
        education[0].eduDegree = newDegree;
        await user.save();
        return user;
    }

    // 특정 유저의 학력 삭제
    static async deletedEducation({ user_id, education_id }) {
        const user = await User.findById({ user_id });
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id) {
            throw new Error(`학력 정보를 삭제할 권한이 없습니다.`);
        }
        const education = user.educations.filter((data) => data.id === education_id);
        if (!education) {
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }

        education[0].remove();
        await user.save();
        return user;
    }
}
export { educationService };
