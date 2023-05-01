import is from '@sindresorhus/is';
import { Router } from 'express';
import { stackService } from '../services/stackService';

const stackRouter = Router();

// 전체 스택 조회
stackRouter.get('/', async(req,res,next)=>{
    const user_id = req.currentUserId;

    try{
        const stacks = await stackService.findAll({ user_id });
        res.status(200).json(stacks)
    }catch(error){
        next(error);
    }
});

// 스택 정보 추가
stackRouter.post('/', async(req, res, next) => {
    try{
        if(is.emptyObject(req.body)){
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const {stackName, stackDescription} = req.body;

        const newStack = {stackName, stackDescription};

        if(!stackName || !stackDescription){
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdStack = await stackService.createStack({ user_id, newStack });
        res.status(201).json(createdStack);

    }catch(error){
        next(error);
    }

})

// 스택 정보 수정
stackRouter.put('/:stack_id', async(req, res, next) => {
    try{
        if(is.emptyObject(req.body)){
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const { stack_id } = req.params;
        const { stackName, stackDescription } = req.body;

        if(!stackName || !stackDescription){
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newStack = {stackName, stackDescription};
        const updatedStack = await stackService.updateStack({ user_id, stack_id, newStack });
        res.status(200).json(updatedStack);
    }catch(error){
        next(error);
    }
})

// 스택 정보 삭제
stackRouter.delete('/:stack_id', async(req,res,next) => {
    try{
        const user_id = req.currentUserId;
        const { stack_id } = req.params;

        const deletedStack = await stackService.deleteStack({ user_id, stack_id });
        res.status(200).json(deletedStack);

    }catch(error){
        next(error);
    }
})

export {stackRouter};