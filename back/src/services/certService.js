import { User, Cert } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certService {
    // 유저의 전체 자격증 정보 조회
    static async findAll({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw new Error(`${userId} 유저는 존재하지 않습니다.`);
        }

        const certs = await Cert.findAll({ userId });
        if (!certs) {
            throw new Error(`${userId} 유저의 자격증 정보가 존재하지 않습니다.`);
        }

        return certs;
    }

    // 유저의 개별 자격증 정보 추가
    static async createCert({ userId, newCert }) {
        const user = await User.findById({ _id: userId });
        const { certName, certAcDate } = newCert;

        const certs = await Cert.findAll({ userId });
        const certExists = certs.some((cert) => cert.certName === newCert.certName);
        if (certExists) {
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const createdCert = await Cert.create({ userId, certName, certAcDate });

        return createdCert;
    }

    // 유저의 개별 자격증 정보 수정
    static async updateCert({ userId, certId, newCert }) {
        const user = await User.findById({ _id: userId });
        const { certName, certAcDate } = newCert;

        const cert = await Cert.findById({ certId, userId: userId });
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const certs = await Cert.findAll({ userId });
        const certExists = certs.some((cert) => cert.certName === newCert.certName);
        if (certExists) {
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const updatedCert = await Cert.update({ userId, certId, certName, certAcDate });

        return updatedCert;
    }

    // 유저의 개별 자격증 정보 삭제
    static async deleteCert({ userId, certId }) {
        const user = await User.findById({ _id: userId });

        const cert = await Cert.findById({ certId });
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const deletedCert = await Cert.delete({ userId, certId });

        return deletedCert;
    }
}

export { certService };
