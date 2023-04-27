import is from '@sindresorhus/is';
import { Router } from 'express';
import { certService } from '../services/certService';

const certRouter = Router();

// 전체 자격증 정보 조회
certRouter.get('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const certs = await certService.findAll({ user_id });
        res.status(200).json(certs);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 추가
certRouter.post('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;
    const { certName, certAcdate } = req.body;
    const newCert = { certName, certAcdate };

    try {
        const createdCert = await certService.createCert({ user_id, newCert });
        res.send(createdCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 수정
certRouter.put('/:user_id/:cert_id', async (req, res, next) => {
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
certRouter.delete('/:user_id/:cert_id', async (req, res, next) => {
    const { user_id, cert_id } = req.params;
    try {
        const deletedCert = await certService.deleteCert({ user_id, cert_id });
        res.status(200).json(deletedCert);
    } catch (error) {
        next(error);
    }
});

export { certRouter };
