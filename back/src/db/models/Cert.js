import { CertModel } from '../schemas/cert';
import { UserModel } from '../schemas/user';

class Cert {
    // 유저의 모든 자격증 정보 조회
    static async findAll({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        const certs = await CertModel.find({ userId: user._id });

        return certs;
    }

    // 유저의 특정 자격증 정보 조회
    static async findById({ certId }) {
        const cert = await CertModel.findById({ _id: certId });

        return cert;
    }

    // 자격증 정보 추가
    static async create({ user_id, certName, certAcDate }) {
        const user = await UserModel.findOne({ id: user_id });
        const createCert = await CertModel.create({ certName, certAcDate, userId: user._id });

        return createCert;
    }

    // 자격증 정보 수정
    static async update({ user_id, certId, certName, certAcDate }) {
        const user = await UserModel.findOne({ id: user_id });
        const updatedCert = await CertModel.updateOne({ userId: user._id, _id: certId }, { certName, certAcDate });

        return updatedCert;
    }

    // 자격증 정보 삭제
    static async delete({ user_id, certId }) {
        const user = await UserModel.findOne({ id: user_id });
        const deletedCert = await CertModel.deleteOne({ _id: certId, userId: user._id });

        return deletedCert;
    }
}

export { Cert };
