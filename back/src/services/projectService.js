import { User, Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class projectService {
    // 유저의 전체 프로젝트 정보 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const projects = await Project.findAll({ user_id });
        if (!projects) {
            throw new Error(`${user_id} 유저의 프로젝트 정보가 존재하지 않습니다.`);
        }

        return projects;
    }

    // 유저의 개별 프로젝트 정보 추가
    static async createProject({ user_id, newProject }) {
        const user = await User.findById({ user_id: user_id });
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = newProject;

        const projects = await Project.findAll({ user_id });
        const projectExists = projects.some((project) => project.projectName === newProject.projectName);
        if (projectExists) {
            throw new Error(`${newProject.projectName} 프로젝트는 이미 존재합니다.`);
        }

        const createdProject = await Project.create({
            user_id,
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
        });

        return createdProject;
    }

    // 유저의 개별 프로젝트 정보 수정
    static async updateProject({ user_id, projectId, newProject }) {
        const user = await User.findById({ user_id: user_id });
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = newProject;

        const project = await Project.findById({ projectId, userId: user_id });
        if (!project) {
            throw new Error('이 프로젝트 정보는 존재하지 않습니다.');
        }

        const updatedProject = await Project.update({
            user_id,
            projectId,
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
        });

        return updatedProject;
    }

    // 유저의 개별 프로젝트 정보 삭제
    static async deleteProject({ user_id, projectId }) {
        const user = await User.findById({ user_id: user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('프로젝트 정보를 삭제할 수 있는 권한이 없습니다.');
        }

        const project = await Project.findById({ projectId });
        if (!project) {
            throw new Error('이 프로젝트 정보는 존재하지 않습니다.');
        }

        const deletedProject = await Project.delete({ user_id, projectId });

        return deletedProject;
    }
}

export { projectService };
