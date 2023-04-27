import { User, Education } from "../db";

class educationService{
    // 특정 유저의 학력 추가
    static async createEducation({userId, newEducation}){
        const user = await User.findById({userId});
        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        if(user.id !== userId){
            throw new Error(`권한이 없습니다.`);
        }
        user.educations.push(newEducation);
        await user.save()
        return user;
    }

    // 아이디를 통한 특정 유저의 학력 조회 
    static async findAll({userId}){
        const user = await User.findAll({userId});
        return user.educations;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({userId, educationId, toUpdate}){
        const user = await User.findById({userId});
        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        if(user.id!== userId){
            throw new Error(`권한이 없습니다.`);
        }

        const education = await user.educations.id(educationId);
        if(!education){
            throw new Error(`${educationId} 학력은 존재하지 않습니다.`);
        }
        
        if(toUpdate.eduSchool){
            const fieldToUpdate = "eduSchool";
            const newValue = toUpdate.eduSchool;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }
        if(toUpdate.eduMajor){
            const fieldToUpdate = "eduMajor";
            const newValue = toUpdate.eduMajor;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }
        if(toUpdate.eduStart){
            const fieldToUpdate = "eduStart";
            const newValue = toUpdate.eduStart;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }
        if(toUpdate.eduEnd){
            const fieldToUpdate = "eduEnd";
            const newValue = toUpdate.eduEnd;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }
        if(toUpdate.eduDegree){
            const fieldToUpdate = "eduDegree";
            const newValue = toUpdate.eduDegree;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }
        return education;
    }
    
    // 특정 유저의 학력 삭제
    static async deletedEducation({userId, educationId}){
        const user = await User.findById({userId});
        if(!user){
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }
        const education = await user.educations.id(educationId);
        if(!education){
            throw new Error(`${educationId} 학력은 존재하지 않습니다.`);
        }
        if(user.id!== userId){
            throw new Error(`권한이 없습니다.`);
        }
        education.remove();
        await user.save();
        return user;
    }

}
export { educationService };


