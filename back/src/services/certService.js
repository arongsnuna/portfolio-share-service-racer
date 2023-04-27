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
        const user = await User.findById({ user_id });
        const id = uuidv4();
        const certName = newCert.certName;
        const certAcdate = new Date(newCert.certAcdate).toISOString().substring(0, 10);

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error(`자격증 정보를 추가할 수 있는 권한이 없습니다.`);
        }

        if (!id || !certName || !certAcdate) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newData = { id, certName, certAcdate };
        // const certs = await Cert.create({ user_id, id, certName, certAcdate });

        user.certs.push(newData);
        await user.save();
        return user;
    }

    // 유저의 개별 자격증 정보 수정
    static async updateCert({ user_id, cert_id, newCert }) {
        console.log('Service 요청 들어옴');
        const user = await User.findById({ user_id });
        const newName = newCert.certName;
        const newAcdate = newCert.certAcdate;

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('자격증 정보를 수정할 수 있는 권한이 없습니다.');
        }

        const cert = user.certs.filter((data) => data.id === cert_id);

        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        cert[0].certName = newName;
        cert[0].certAcdate = newAcdate;
        await user.save();
        return user;
    }

    // 유저의 개별 자격증 정보 삭제
    static async deleteCert({ user_id, cert_id }) {
        const user = await User.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        if (user.id !== user_id) {
            throw new Error('자격증 정보를 삭제할 수 있는 권한이 없습니다.');
        }

        const cert = user.certs.filter((data) => data.id === cert_id);

        if (!cert) {
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        cert[0].remove();
        await user.save();
        return user;
    }
}

export { certService };
