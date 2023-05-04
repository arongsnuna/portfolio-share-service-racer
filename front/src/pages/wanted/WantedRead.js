/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

import { DateTime } from 'luxon';

const CommentToRelative = ({ date }) => {
    const preDate = new Date(date);
    const luxonDate = DateTime.fromJSDate(preDate);
    return <>{luxonDate.toRelative()}</>;
};

function WantedUpdate() {
    const navigate = useNavigate();
    const [commentSaveContent, setCommentSaveContent] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [writerName, setWriterName] = useState('');
    const [writerDescription, setWriterDescription] = useState('');
    const [writerImage, setWriterImage] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [isSave, setIsSave] = useState(false);

    const userState = useContext(UserStateContext);
    const { state } = useLocation();
    const { wanted } = state;

    const isWantedEditable = (userState.user._id ?? userState.user.id) === wanted.userId;

    const onChangeSaveComment = (e) => {
        setCommentSaveContent(e.target.value);
    };

    const onChangeComment = (e) => {
        setCommentContent(e.target.value);
    };

    const fetchWriterInfo = useCallback(async () => {
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
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('작성자 불러오기에 실패하였습니다.', err);
        }
    }, [wanted.userId]);

    const fetchCommentList = useCallback(async () => {
        try {
            const res = await Api.get(`comment/${wanted._id}`);
            setCommentList(res.data);
            setIsSave(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('');
        }
    }, [wanted._id, isSave]);

    const handleSubmit = async () => {
        try {
            // "comment/wantedId" 엔드포인트로 post요청함.
            await Api.post(`comment/${wanted._id}`, {
                commentSaveContent,
            });

            setCommentSaveContent('');

            setIsSave(true);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('댓글 추가에 실패하였습니다.', err);
        }
    };

    const handleCommentEdit = (id) => {
        setCommentList((prevComments) => {
            return prevComments.map((comment) => {
                if (comment._id === id) {
                    return {
                        ...comment,
                        isEdit: true,
                    };
                } else {
                    return comment;
                }
            });
        });
        const comment = commentList.filter((comment) => comment._id === id)[0];
        setCommentContent(comment.commentContent);
    };

    const handleCommentEditSubmit = async (id) => {
        try {
            // "comment/commentId" 엔드포인트로 put요청함.
            await Api.put(`comment/${id}`, {
                commentContent,
            });

            setCommentContent('');

            setIsSave(true);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('댓글수정에 실패하였습니다.');
        }
    };

    const handleCommentEditRemove = async (id) => {
        try {
            // "comment/commentId" 엔드포인트로 delete요청함.
            await Api.delete(`comment/${id}`);

            setCommentContent('');

            setIsSave(true);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('댓글삭제에 실패하였습니다.');
        }
    };

    const handleCancel = (id) => {
        setCommentList((prevComments) => {
            return prevComments.map((comment) => {
                if (comment._id === id) {
                    return {
                        ...comment,
                        isEdit: false,
                    };
                } else {
                    return comment;
                }
            });
        });
    };

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }

        fetchWriterInfo();
        fetchCommentList();
    }, [userState, navigate, fetchWriterInfo, fetchCommentList]);

    return (
        <Container>
            <Row xs='auto'>
                <Col xs={6} className='text-left'>
                    <h3>팀원 구하기</h3>
                    <p>
                        팀원 모집을 확인하고 프로젝트에 참여해보세요.
                        <br />
                        원하는 프로젝트가 없을 경우 직접 팀원을 모집할 수 있어요.
                    </p>
                </Col>
                <Col xs={6} className='mb-3 text-end'>
                    {isWantedEditable && (
                        <Button
                            className='me-3'
                            variant='primary'
                            onClick={() => navigate('/wanted/update', { state: { wanted: wanted } })}>
                            수정하기
                        </Button>
                    )}
                    <Button className='me-3' variant='primary' onClick={() => navigate('/wanted')}>
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
                        <Row xs='auto'>
                            <Col>
                                <Card.Img
                                    style={{ width: '5rem', height: '5rem', borderRadius: '70%', overflow: 'hidden' }}
                                    className='mb-3'
                                    src={writerImage}
                                    alt='페이지 작성자'
                                />
                            </Col>
                            <Col>
                                <Row className='mt-3  text-end'>{writerName}</Row>
                                <Row style={{ color: 'grey', fontSize: '0.8em' }} className='mt-2'>
                                    {writerDescription}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Card.Subtitle className='mb-3'>{commentList.length}개의 댓글</Card.Subtitle>
                            <Form.Control
                                placeholder='댓글을 작성하세요.'
                                as='textarea'
                                rows={3}
                                value={commentSaveContent}
                                onChange={onChangeSaveComment}
                            />
                        </Row>
                        <Row>
                            <Col className='p-0'>
                                <Button className='mt-3' variant='primary' onClick={() => handleSubmit(wanted.userId)}>
                                    댓글 작성
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        {commentList.map((comment) => (
                            <div key={comment._id}>
                                <Row xs='auto'>
                                    <Col>
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
                                            <CommentToRelative date={comment.createdAt} />
                                        </Row>
                                    </Col>
                                </Row>

                                {comment.isEdit === true ? (
                                    <Row>
                                        <Col xs={9}>
                                            <Form.Control
                                                placeholder='댓글을 작성하세요.'
                                                as='textarea'
                                                rows={2}
                                                value={commentContent}
                                                onChange={onChangeComment}
                                            />
                                        </Col>
                                        <Col xs={3}>
                                            <Button
                                                className='me-3'
                                                variant='primary'
                                                onClick={() => handleCommentEditSubmit(comment._id)}>
                                                확인
                                            </Button>
                                            <Button
                                                className='me-3'
                                                variant='danger'
                                                onClick={() => handleCommentEditRemove(comment._id)}>
                                                삭제
                                            </Button>
                                            <Button variant='secondary' onClick={() => handleCancel(comment._id)}>
                                                취소
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row>
                                        <Col xs={6}>{comment.commentContent}</Col>
                                        <Col xs={6} className='mb-3 text-end'>
                                            {(userState.user._id ?? userState.user.id) === comment.userId && (
                                                <Button
                                                    variant='primary'
                                                    className='me-3'
                                                    onClick={() => handleCommentEdit(comment._id)}>
                                                    댓글 수정
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                )}

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
