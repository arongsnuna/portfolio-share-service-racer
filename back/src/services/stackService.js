import { User, Stack} from '../db'; 

class stackService{
    // 전체 스택 정보 조회
    static async findAll({ user_id }){
        const stacks = await Stack.findAll({ user_id });
        
        return stacks;
    }
    // 개별 스택 정보 조회
    static async findOne({ stack_id}){
        const stack = await Stack.findById({ stack_id });
        return stack;
    }
    // 특정 스택 제외하고 모든 스택 조회
    static async findExcept({ user_id, stack_id }){
        const stacks = await Stack.findAll({ user_id });
        const exceptStacks = stacks.filter((stack)=>stack.stack_id === stack_id);
        return exceptStacks;
    }
    // 스택 정보 추가
    static async createStack({ user_id, newStack}){
        
        // 스택 정보 추가 권한 제한은 프론트를 통해 막아둠

        const {stackName, stackDescription} = newStack;
        const createdStack = await Stack.create({ user_id, stackName, stackDescription });

        return createdStack;
    }

    // 스택 정보 수정
    static async updateStack({ user_id, stack_id, newStack }){
        
        // 스택 정보 수정 권한 제한은 프론트를 통해 막아둠
        const { stackName, stackDescription } = newStack;
        const updatedStack = await Stack.update({ user_id, stack_id, stackName, stackDescription });
        return updatedStack;
    }

    // 스택 정보 삭제
    static async deleteStack({ user_id, stack_id }){
        // 스택 정보 삭제 권한 제한은 프론트를 통해 막아둠

        const deletedStack = await Stack.delete({ user_id, stack_id });

        return deletedStack;
   }
}

export { stackService };
