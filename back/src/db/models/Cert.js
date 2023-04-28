import { CertModel } from '../schemas/cert';
import { UserModel } from '../schemas/user';

class Cert {
    // 유저의 모든 자격증 정보 조회
    static async findAll({ user_id }) {
        const cert = await UserModel.findById({ userId: user_id });

        if (!cert) {
            throw new Error(`${user_id} 유저의 자격증 정보가 존재하지 않습니다.`);
        }
        return user.certs;
    }

    // 유저의 특정 자격증 정보 조회
    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }

    // 자격증 정보 추가
    static async create({ user_id, id, certName, certAcdate }) {
        const user = await UserModel.findOne({ id: user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const newCert = { id, certName, certAcdate };

        user.awards.push(newCert);
        await user.save();
        return user;
    }

    // 자격증 정보 수정
    static async update({ user_id, cert_id, fieldToUpdate, newValue }) {
        const user = await UserModel.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const cert = user.cert.id(cert_id);
        if (!cert) {
            throw new Error('이 자격증정보는 존재하지 않습니다.');
        }

        cert[fieldToUpdate] = newValue;
        await user.save();
        return cert;
    }

    // 자격증 정보 삭제
    static async delete({ user_id, cert_id }) {
        const user = await UserModel.findById({ user_id });

        if (!user) {
            throw new Error(`${user_id} 유저는 존재하지 않습니다.`);
        }

        const cert = user.cert.id(cert_id);
        if (!cert) {
            throw new Error('이 자격증정보는 존재하지 않습니다.');
        }

        cert.remove();
        await user.save();

        return cert;
    }
}

export { Cert };
