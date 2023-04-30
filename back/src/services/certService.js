import { User, Cert } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certService {
    // 유저의 전체 자격증 정보 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const certs = await Cert.findAll({ user_id });
        if (!certs) {
            throw new Error(`${user_id} 유저의 자격증 정보가 존재하지 않습니다.`);
        }

        return certs;
    }

    // 유저의 개별 자격증 정보 추가
    static async createCert({ user_id, newCert }) {
        const user = await User.findById({ user_id: user_id });
        const { certName, certAcDate } = newCert;

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error(`자격증 정보를 추가할 수 있는 권한이 없습니다.`);
        }

        const certExists = user.certs.some((cert) => cert.certName === newCert.certName);
        if (certExists) {
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const createdCert = await Cert.create({ user_id, certName, certAcDate });

        return createdCert;
    }

    // 유저의 개별 자격증 정보 수정
    static async updateCert({ user_id, certId, newCert }) {
        const user = await User.findById({ user_id: user_id });
        const { certName, certAcDate } = newCert;

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('자격증 정보를 수정할 수 있는 권한이 없습니다.');
        }

        const cert = await Cert.findById({ certId, userId: user_id });
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const certs = await Cert.findAll({ user_id });
        const certExists = certs.some((cert) => cert.certName === newCert.certName);
        if (certExists) {
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const updatedCert = await Cert.update({ user_id, certId, certName, certAcDate });

        return updatedCert;
    }

    // 유저의 개별 자격증 정보 삭제
    static async deleteCert({ user_id, certId }) {
        const user = await User.findById({ user_id: user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('자격증 정보를 삭제할 수 있는 권한이 없습니다.');
        }

        const cert = await Cert.findById({ certId });
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const deletedCert = await Cert.delete({ user_id, certId });

        return deletedCert;
    }
}

export { certService };
