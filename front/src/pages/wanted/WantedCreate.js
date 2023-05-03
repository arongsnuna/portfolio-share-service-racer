import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function WantedCreate() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.

    const [wantedTitle, setWantedTitle] = useState('');
    const [wantedContent, setWantedContent] = useState('');

    const onChangeTitle = (e) => {
        setWantedTitle(e.target.value);
    };

    const onChangeContent = (e) => {
        setWantedContent(e.target.value);
    };

    const handleSubmit = async (id) => {
        try {
            // "/wanted" 엔드포인트로 post요청함.(userId는 req.currentUserId 사용)
            await Api.post(`wanted/`, {
                wantedTitle,
                wantedContent,
            });

            navigate('/wanted');
        } catch (err) {
            console.log('팀원구하기 정보 추가에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }
    }, [userState, navigate]);

    return (
        <Container>
            <Row>
                <Col xs={8} className='text-left'>
                    <h3>팀원 구하기</h3>
                    <p>
                        팀원 모집을 확인하고 프로젝트에 참여해보세요.
                        <br />
                        원하는 프로젝트가 없을 경우 직접 팀원을 모집할 수 있어요.
                    </p>
                </Col>
            </Row>
            <Row>
                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>제목</Card.Title>
                        <Form.Control placeholder='제목을 입력해주세요' value={wantedTitle} onChange={onChangeTitle} />
                    </Card.Body>
                    <Card.Body>
                        <Card.Title>본문</Card.Title>
                        <Form.Control
                            placeholder='본문을 입력해주세요'
                            as='textarea'
                            rows={4}
                            value={wantedContent}
                            onChange={onChangeContent}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Col className='mb-3 text-center'>
                <Button variant='primary' className='me-3' onClick={() => handleSubmit()}>
                    게시글 작성
                </Button>
                <Button variant='danger' onClick={() => navigate('/wanted')}>
                    게시글 취소
                </Button>
            </Col>
        </Container>
    );
}

export default WantedCreate;
