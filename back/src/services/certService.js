import { User, Cert } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class certService {
    // 유저의 전체 자격증 정보 조회
    static async findAll({ user_id }) {
        const user = await User.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        return user.certs;
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
            throw new Error(`${newCert.certName} 수상내역은 이미 존재합니다.`);
        }

        const newData = { certName, certAcDate };
        // const certs = await Cert.create({ user_id, id, certName, certAcdate });

        user.certs.push(newData);
        await user.save();
        return user;
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

        const cert = user.certs.id(certId);
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const certExists = user.certs.some((cert) => cert.certName === newCert.certName);
        if (certExists) {
            throw new Error(`${newCert.certName} 수상내역은 이미 존재합니다.`);
        }

        const newData = { certName, certAcDate };
        Object.entries(newData).forEach(([key, value]) => {
            cert[key] = value;
        });

        await user.save();
        return cert;
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

        const cert = user.awards.id(certId);
        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        cert.remove();
        await user.save();
        return user;
    }
}

export { certService };
