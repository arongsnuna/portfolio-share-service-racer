import { User, Education } from "../db";

class educationService{
    // 특정 유저의 학력 추가
    static async createEducation({user_id, newEducation}){
        const educations = await Education.create({user_id, newEducation});
        return educations ;
    }

    // 아이디를 통한 특정 유저의 학력 조회 
    static async findAll({user_id}){
        const educations = await Education.findAll({user_id});
        return educations;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({user_id, education_id, fieldToUpdate, newValue}){
        const education = await Education.update({user_id, education_id, fieldToUpdate, newValue});
        return education;
    }
    
    // 특정 유저의 학력 삭제
    static async deletedEducation({user_id, education_id}){
        const user = await Education.delet({user_id, education_id});
        return user ;
    }

}
export { educationService };


