import { User, Education } from "../db";
import {v4 as uuidv4} from 'uuid';
// eduSchool, eduMajor, eduStart, eduEnd, eduDegree
class educationService{
    // 아이디를 통한 특정 유저의 전체 학력 조회 
    static async findAll({userId}){
        const user = await User.findById({userId});
        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`)
        }
        return user.educations;
    }

    // 특정 유저의 학력 추가
    static async createEducation({userId, newEducation}){
        const user = await User.findById({userId});
        const id = uuidv4(); 
        // eduSchool, eduMajor, eduStart, eduEnd, eduDegree
        const eduSchool = newEducation.eduSchool;
        const eduMajor = newEducation.eduMajor;
        const eduStart = new Date(newEducation.eduStart).toISOString().substring(0,10);
        const eduEnd = new Date(newEducation.eduEnd).toISOString().substring(0,10);
        const eduDegree = newEducation.eduDegree;

        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        if(user.id !== userId){
            throw new Error(`학력 정보를 추가할 수 있는 권한이 없습니다.`);
        }
        if(!id || !eduSchool || !eduMajor || !eduStart || !eduEnd || !eduDegree){
            throw new Error('모든 값을 입력했는지 확인해주세요.')
        }
        user.educations.push(newEducation);
        await user.save()
        return user;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({userId, educationId, newEducation}){
        console.log('Service 요청 들어옴');
        const user = await User.findById({userId});
        const newSchool = newEducation.eduSchool;
        const newMajor = newEducation.eduMajor;
        const newStart = newEducation.eduStart;
        const newEnd = newEducation.eduEnd;
        const newDegree = newEducation.eduDegree;


        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        if(user.id!== userId){
            throw new Error(`학력 정보를 수정할 권한이 없습니다.`);
        }

        const education = user.educations.filter((data)=>data.id === educationId);
        
        if(!education){
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
    static async deletedEducation({userId, educationId}){
        const user = await User.findById({userId});
        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        if(user.id!== userId){
            throw new Error(`학력 정보를 삭제할 권한이 없습니다.`);
        }
        const education = user.educations.filter((data)=>data.id === educationId);
        if(!education){
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }
        
        education[0].remove();
        await user.save();
        return user;
    }

}
export { educationService };


