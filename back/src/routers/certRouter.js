import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { certService } from '../services/certService';

const certRouter = Router();

// 전체 자격증 정보 조회
certRouter.get('/cert/:user_id', login_required, async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const certs = await certService.findAll({ user_id });
        res.status(200).json(certs);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 추가
certRouter.post('/cert/:user_id', login_required, async (req, res, next) => {
    const { user_id } = req.params;
    const { certName, certAcdate } = req.body;
    const newCert = { certName, certAcdate };
    console.log(user_id, newCert);

    try {
        const createdCert = await certService.createCert({ user_id, newCert });
        res.send(createdCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 수정
certRouter.patch('/cert/:user_id/:cert_id', login_required, async (req, res, next) => {
    const { user_id, cert_id } = req.params;
    const { certName, certAcdate } = req.body;
    const newCert = { certName, certAcdate };

    try {
        const updatedCert = await certService.updateCert({ user_id, cert_id, newCert });
        res.status(200).json(updatedCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 삭제
certRouter.delete('/cert/:user_id/:cert_id', login_required, async (req, res, next) => {
    const { user_id, cert_id } = req.params;
    try {
        const deletedCert = await certService.deleteCert({ user_id, cert_id });
        res.status(200).json(deletedCert);
    } catch (error) {
        next(error);
    }
});

export { certRouter };
