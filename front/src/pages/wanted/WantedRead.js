import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

import moment from 'moment';

function WantedUpdate() {
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');
    const [writerName, setWriterName] = useState('');
    const [writerDescription, setWriterDescription] = useState('');
    const [writerImage, setWriterImage] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [isSave, setIsSave] = useState(false);

    const userState = useContext(UserStateContext);
    const { state } = useLocation();
    const { wanted } = state;

    const onChangeComment = (e) => {
        setCommentContent(e.target.value);
    };

    const fetchWriterInfo = async () => {
        try {
            const userId = wanted.userId;
            // "/user/user_id" 엔드포인트로 get요청함.(userId는 req.currentUserId 사용)
            const res = await Api.get(`user/${userId}`);
            const writerInfo = res.data.userInfo;

            setWriterName(writerInfo.name);
            setWriterDescription(writerInfo.description);

            if (!writerInfo.userImage) {
                setWriterImage('http://placekitten.com/200/200');
            } else {
                setWriterImage(writerInfo.userImage.imageUri);
            }
        } catch (err) {
            console.log('작성자 불러오기에 실패하였습니다.', err);
        }
    };

    const fetchCommentList = async () => {
        try {
            await Api.get(`comment/${wanted._id}`).then((res) => setCommentList(res.data));
            setIsSave(false);
        } catch (err) {
            console.log('');
        }
    };

    const handelSubmit = async () => {
        try {
            // "comment/wantedId" 엔드포인트로 post요청함.
            await Api.post(`comment/${wanted._id}`, {
                commentContent,
            });

            setCommentContent('');

            setIsSave(true);
        } catch (err) {
            console.log('댓글 추가에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }

        fetchWriterInfo();
        fetchCommentList();
    }, [userState, navigate, isSave]);

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
                <Col className='position-relative'>
                    <Button
                        className='m-3 position-absolute bottom-0 end-0'
                        variant='primary'
                        onClick={() => navigate('/wanted')}>
                        목록으로
                    </Button>
                </Col>
            </Row>
            <Row>
                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>{wanted.wantedTitle}</Card.Title>
                        <Card.Subtitle>
                            작성자 : {writerName} &nbsp;&nbsp;&nbsp;&nbsp; 작성일시 : {wanted.createdAt}
                        </Card.Subtitle>
                        <hr />
                    </Card.Body>
                    <Card.Body>
                        <Card.Text>{wanted.wantedContent}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Row>
                            <Col xs={1}>
                                <Card.Img
                                    style={{ width: '5rem', height: '5rem', borderRadius: '70%', overflow: 'hidden' }}
                                    className='mb-3'
                                    src={writerImage}
                                    alt='페이지 작성자'
                                />
                            </Col>
                            <Col>
                                <Row className='mt-3'>{writerName}</Row>
                                <Row style={{ color: 'grey', fontSize: '0.8em' }} className='mt-2'>
                                    {writerDescription}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Card.Subtitle className='mb-3'>13개의 댓글</Card.Subtitle>
                            <Form.Control
                                placeholder='댓글을 작성하세요.'
                                as='textarea'
                                rows={3}
                                value={commentContent}
                                onChange={onChangeComment}
                            />
                        </Row>
                        <Row>
                            <Col className='p-0'>
                                <Button className='mt-3' variant='primary' onClick={handelSubmit}>
                                    댓글 작성
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        {commentList.map((comment) => (
                            <div key={comment._id}>
                                <Row>
                                    <Col xs={1}>
                                        <Card.Img
                                            style={{ width: '5rem', height: '5rem', borderRadius: '70%', overflow: 'hidden' }}
                                            className='mb-3'
                                            src={comment.userImageUri ? comment.userImageUri : 'http://placekitten.com/200/200'}
                                            alt='댓글 작성자'
                                        />
                                    </Col>
                                    <Col>
                                        <Row className='mt-3'>{comment.userName}</Row>
                                        <Row style={{ color: 'grey', fontSize: '0.8em' }} className='mt-2'>
                                            {comment.createdAt}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>{comment.commentContent}</Col>
                                </Row>
                                <hr />
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default WantedUpdate;
