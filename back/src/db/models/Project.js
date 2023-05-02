import { ProjectModel } from '../schemas/project';
import { UserModel } from '../schemas/user';
import fs from 'fs';

class Project {
    // 유저의 모든 프로젝트 정보 조회
    static async findAll({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        const projects = await ProjectModel.find({ userId: user._id });

        return projects;
    }

    // 유저의 특정 프로젝트 정보 조회
    static async findById({ projectId }) {
        const project = await ProjectModel.findById({ _id: projectId });

        return project;
    }

    // 프로젝트 정보 추가
    static async create({ user_id, projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink }) {
        const user = await UserModel.findOne({ id: user_id });
        const createProject = await ProjectModel.create({
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
            userId: user._id,
        });

        return createProject;
    }

    // 프로젝트 정보 수정
    static async update({
        user_id,
        projectId,
        projectName,
        projectStartDate,
        projectEndDate,
        projectDescription,
        projectGitLink,
    }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedProject = await ProjectModel.updateOne(
            { userId: user._id, _id: projectId },
            {
                projectName,
                projectStartDate,
                projectEndDate,
                projectDescription,
                projectGitLink,
            }
        );

        return updatedProject;
    }

    // 프로젝트 정보 삭제
    static async delete({ user_id, projectId }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedProject = await ProjectModel.deleteOne({ _id: projectId, userId: user._id });

        return deletedProject;
    }
}

export { Project };
