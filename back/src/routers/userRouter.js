import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import multer from 'multer';
import fs from 'fs';
import mime from 'mime';

const path = require('path');

const userAuthRouter = Router();

// 파일 저장을 위한 storage 생성
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/users')); // 파일 업로드 위치 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // 파일 이름 설정
    },
});

const upload = multer({ storage: storage });

// 회원가입
userAuthRouter.post('/register', async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인
userAuthRouter.post('/login', async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

// 유저의 전체 목록 불러오기
userAuthRouter.get('/userlist', login_required, async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

// 유저인증??
userAuthRouter.get('/current', login_required, async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const userId = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
            userId,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

// 유저정보 수정
userAuthRouter.put('/:id', login_required, upload.single('userImage'), async function (req, res, next) {
    try {
        // URI로부터 사용자 id를 추출함.
        const userId = req.currentUserId;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;
        const gitLink = req.body.gitLink ?? null;
        const uploadImage = req.file ?? null;

        // 업로드 된 파일을 서버의 파일 시스템에 저장
        const filePath = path.join(__dirname, '../uploads/users', Date.now() + uploadImage.originalname);
        const fileStream = fs.createWriteStream(filePath);
        fileStream.on('error', (err) => {
            console.error(err);
        });

        let userImage = {};

        if (uploadImage) {
            // 이미지파일의 경로를 불러와 데이터 URI로 변환(로컬 파일 시스템의 경로를 사용하기 때문)
            // 이미지 파일 이름
            const imageName = uploadImage.filename;
            // 이미지 파일 경로
            const imagePath = path.join(__dirname, '../uploads/users', imageName);
            // 이미지 파일 읽기
            const imageData = fs.readFileSync(imagePath);
            // MIME 타입을 가져오기
            const mimeType = mime.lookup(imagePath);
            // 데이터 URI로 변환
            const imageUri = `data:${mimeType};base64,${imageData.toString('base64')}`;

            userImage = { uploadImage, imageUri };

            // 파일 저장 및 처리 로직
            fileStream.write(uploadImage.buffer);
            fileStream.end();
        } else {
            userImage = uploadImage;

            fileStream.write(uploadImage.buffer);
            fileStream.end();
        }

        const toUpdate = { name, email, password, description, gitLink, userImage };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({ userId, toUpdate });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// 유저정보 불러오기
userAuthRouter.get('/:id', login_required, async function (req, res, next) {
    try {
        const userId = req.params.id;

        const currentUserInfo = await userAuthService.getUserInfo({ userId });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        try {
            const imageUri = currentUserInfo.userImage.imageUri;
            res.status(200).send({
                userInfo: currentUserInfo,
                imagePath: imageUri,
            });
        } catch (error) {
            res.status(200).send({
                userInfo: currentUserInfo,
                imagePath: 'http://placekitten.com/200/200',
            });
        }
    } catch (error) {
        next(error);
    }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get('/afterlogin', login_required, function (req, res, next) {
    res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
});

export { userAuthRouter };
