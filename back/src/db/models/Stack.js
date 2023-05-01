import { StackModel } from '../schemas/stack';
import { UserModel } from '../schemas/user';

class Stack {
    // 유저의 모든 스텍 정보 조회
    static async findAll({ user_id }){
        const user = await UserModel.findOne({ id: user_id });
        const stacks = await StackModel.find({ userId: user._id});
        return stacks;
    }

    static async findById({ stack_id }){
        const stack = await StackModel.findById({ _id: stack_id });

        return stack;
    }

    // 스택 정보 추가
    static async create({ user_id, stackName, stackDescription }){
        const user = await UserModel.findOne({ id: user_id });
        const createStack = await StackModel.create({ stackName, stackDescription, userId: user._id });

        return createStack;
    }

    // 스택 정보 수정
    static async update({ user_id, stack_id, stackName, stackDescription }){
        const user = await UserModel.findOne({ id: user_id });
        const updatedStack = await StackModel.updateOne(
            { userId: user._id, _id: stack_id },
            { stackName, stackDescription }
        );
        return updatedStack;
    }

    // 스택 정보 삭제
    static async delete({user_id, stack_id}){
        const user = await UserModel.findOne({ id: user_id });
        const deletedStack = await StackModel.deleteOne({ _id: stack_id, userId: user._id});

        return deletedStack;
    }
}

export { Stack };