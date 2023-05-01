import is from '@sindresorhus/is';
import { Router } from 'express';
import { projectService } from '../services/projectService';
import { util } from '../utils/util';

const projectRouter = Router();

// 전체 프로젝트 정보 조회
projectRouter.get('/', async (req, res, next) => {
    const user_id = req.currentUserId;

    try {
        const projects = await projectService.findAll({ user_id });
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 추가
projectRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const { projectName, projectStartDate, projectEndDate, projectDescription } = req.body;

        const newProject = { projectName, projectStartDate, projectEndDate, projectDescription };

        if (!projectName || !projectStartDate || !projectEndDate || !projectDescription) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!util.regexp(projectStartDate) || !util.regexp(projectEndDate)) {
            throw new Error('프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요');
        }

        const createdProject = await projectService.createProject({ user_id, newProject });
        res.status(201).json(createdProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 수정
projectRouter.put('/:projectId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const user_id = req.currentUserId;
        const { projectId } = req.params;
        const { projectName, projectStartDate, projectEndDate, projectDescription } = req.body;

        if (!projectName || !projectStartDate || !projectEndDate || !projectDescription) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!util.regexp(projectStartDate) || !util.regexp(projectEndDate)) {
            throw new Error('프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요');
        }

        const newProject = { projectName, projectStartDate, projectEndDate, projectDescription };

        const updatedProject = await projectService.updateProject({ user_id, projectId, newProject });
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 삭제
projectRouter.delete('/:projectId', async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { projectId } = req.params;

        const deletedProject = await projectService.deleteProject({ user_id, projectId });

        res.status(200).json(deletedProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
