import is from '@sindresorhus/is';
import { Router } from 'express';
import { certService } from '../services/certService';
import { util } from '../utils/util';

const certRouter = Router();

// 전체 자격증 정보 조회
certRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const certs = await certService.findAll({ userId });
        res.status(200).json(certs);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 추가
certRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { certName, certAcDate } = req.body;

        const newCert = { certName, certAcDate };

        if (!certName || !certAcDate) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!util.regexp(certAcDate)) {
            throw new Error('취득일자 값을 확인해주세요');
        }

        const createdCert = await certService.createCert({ userId, newCert });
        res.status(201).json(createdCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 수정
certRouter.put('/:certId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { certId } = req.params;
        const { certName, certAcDate } = req.body;

        if (!certName || !certAcDate) {
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!util.regexp(certAcDate)) {
            throw new Error('취득일자 값을 확인해주세요');
        }

        const newCert = { certName, certAcDate };

        const updatedCert = await certService.updateCert({ userId, certId, newCert });
        res.status(200).json(updatedCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 삭제
certRouter.delete('/:certId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { certId } = req.params;

        const deletedCert = await certService.deleteCert({ userId, certId });

        res.status(200).json(deletedCert);
    } catch (error) {
        next(error);
    }
});

export { certRouter };
