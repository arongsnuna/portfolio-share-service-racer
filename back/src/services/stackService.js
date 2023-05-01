import { User, Stack} from '../db'; 

class stackService{
    // 전체 스택 정보 조회
    static async findAll({ user_id }){
        const user = await User.findById({ user_id });

        if (!user){
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        const stacks = await Stack.findAll({ user_id });
        if (!stacks){
            throw new Error(`${user_id} 유저의 스택 정보가 존재하지 않습니다.`);
        }
        return stacks;
    }
    // 스택 정보 추가
    static async createStack({ user_id, newStack}){
        const user = await User.findById({ user_id: user_id});
        if(!user){
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error(`스택 정보를 추가할 수 있는 권한이 없습니다.`);
        }

        const stacks = await Stack.findAll({ user_id });
        const stackExists = stacks.some((stack) => stack.stackName === newStack.stackName);
        if (stackExists ){
            throw new Error(`${newStack.stackName} 프로젝트는 이미 존재합니다.`);
        }

        const {stackName, stackDescription} = newStack;
        const createdStack = await Stack.create({ user_id, stackName, stackDescription });

        return createdStack;
    }

    // 스택 정보 수정
    static async updateStack({ user_id, stack_id, newStack }){
        const user = await User.findById({ user_id: user_id });
        if(!user){
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }
        if (user.id !== user_id){
            throw new Error('스택 정보를 수정할 수 있는 권한이 없습니다.');
        }

        const stack = await Stack.findById({ stack_id, userId: user_id });
        if (!stack) {
            throw new Error('이 스택 정보는 존재하지 않습니다.');
        }
        const stacks = await Stack.findAll({ user_id });
        const stackExists = stacks.some((stack) => stack.stackName === newStack.stackName);
        if (stackExists ) {
            throw new Error(`${newStack.stackName} 스택은 이미 존재합니다.`);
        }

        const { stackName, stackDescription } = newStack;
        const updatedStack = await Stack.update({ user_id, stack_id, stackName, stackDescription });
        return updatedStack;
    }

    // 스택 정보 삭제
    static async deleteStack({ user_id, stack_id }){
        const user = await User.findById({ user_id: user_id});
        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('스택 정보를 삭제할 수 있는 권한이 없습니다.');
        }

        const stack = await Stack.findById({ stack_id });
        if(!stack){
            throw new Error('이 스택 정보는 존재하지 않습니다.');
        }

        const deletedStack = await Stack.delete({ user_id, stack_id });

        return deletedStack;
   }
}

export { stackService };
