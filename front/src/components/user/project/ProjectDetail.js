import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as Api from '../../../api';

function ProjectDetail({ portfolioOwnerId }) {
    const [dbItem, setDbItem] = useState([]);
    const [toggle, setToggle] = useState(false); // 추가 버튼 클릭 유무
    const [save, setSave] = useState(false); // 확인 버튼 클릭 유무
    const [edit, setEdit] = useState(''); // 수정 버튼 클릭 유무

    const [projectName, setProjectName] = useState('');
    const [projectStart, setProjectStart] = useState('');
    const [projectEnd, setProjectEnd] = useState('');

    const onChangeName = (e) => {
        setProjectName(e.target.value);
    };

    const onChangeStart = (e) => {
        setProjectStart(e.target.value);
    };

    const onChangeEnd = (e) => {
        setProjectEnd(e.target.value);
    };

    const AddInput = () => {
        setToggle(true);

        setProjectName('');
        setProjectStart('');
        setProjectEnd('');
    };

    const certfetch = async (ownerId) => {
        const { userId } = ownerId;
        // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
        const res = await Api.get('users', userId);
        // 사용자 정보는 response의 data임.
        const ownerData = res.data.certs;
        // portfolioOwner을 해당 사용자 정보로 세팅함.
        setDbItem(ownerData);
        console.log(ownerData);
    };

    const userId = portfolioOwnerId;

    useEffect(() => {
        certfetch({ userId });
    }, [userId, save]);

    const handleSubmit = async (id) => {
        const item = dbItem.filter((item) => item.id === id)[0];
        if (item.isSave === false || !item) {
            try {
                // "cert/user_id" 엔드포인트로 post요청함.
                await Api.post(`cert/${portfolioOwnerId}`, {
                    projectName,
                    projectStart,
                    projectEnd,
                });

                setSave(true);
                setToggle(false);

                setProjectName('');
                setProjectStart('');
                setProjectEnd('');
            } catch (err) {
                console.log('프로젝트 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                // "cert/user_id/cert_id" 엔드포인트로 put요청함.
                await Api.put(`cert/${portfolioOwnerId}/${item.id}`, {
                    projectName,
                    projectStart,
                    projectEnd,
                });
            } catch (err) {
                console.log('프로젝트 수정에 실패하였습니다.', err);
            }
        }
    };

    const handleEdit = (id) => {
        const item = dbItem.filter((item) => item.id === id)[0];
        item.isEdit = true;
        setProjectName(item.projectName);
        setProjectStart(item.projectStart);
        setProjectEnd(item.projectEnd);
        setEdit(item.id);
    };

    const handleCancel = () => {
        certfetch({ userId });
    };

    const handleDelete = async (id) => {
        try {
            // "cert/user_id/cert_id" 엔드포인트로 delete 요청함.
            await Api.delete(`cert/${portfolioOwnerId}/${id}`);

            certfetch({ userId });
        } catch (err) {
            console.log('프로젝트 삭제에 실패하였습니다.', err);
        }
    };

    return (
        <div>
            {dbItem.map((item) => (
                <div key={item.id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <div>
                            <p>
                                {item.projectName}
                                <br />
                                {item.projectStart}
                                <br />
                                {item.projectEnd}
                                <br />
                            </p>
                            <br />
                            <Button
                                className='position-absolute end-0 translate-middle'
                                variant='outline-primary'
                                onClick={() => handleEdit(item.id)}>
                                Edit
                            </Button>{' '}
                            <br />
                            <hr className='one' />
                        </div>
                    ) : (
                        <div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='프로젝트 이름'
                                    value={projectName}
                                    onChange={onChangeName}
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='프로젝트 시작 날짜'
                                    value={projectStart}
                                    onChange={onChangeStart}
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='프로젝트 종료 날짜'
                                    value={projectEnd}
                                    onChange={onChangeEnd}
                                />
                            </div>
                            <div className='mb-3 text-center'>
                                {edit !== item.id ? (
                                    <React.Fragment>
                                        <Button variant='primary' onClick={() => handleSubmit(item.id)}>
                                            확인
                                        </Button>{' '}
                                        <Button variant='secondary' onClick={() => handleCancel()}>
                                            취소
                                        </Button>{' '}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Button variant='primary' onClick={() => handleSubmit(item.id)}>
                                            확인
                                        </Button>{' '}
                                        <Button variant='danger' onClick={() => handleDelete(item.id)}>
                                            삭제
                                        </Button>{' '}
                                        <Button variant='secondary' onClick={() => handleCancel()}>
                                            취소
                                        </Button>{' '}
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {toggle === true ? (
                <div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='프로젝트 이름' value={projectName} onChange={onChangeName} />
                    </div>
                    <div className='mb-2'>
                        <Form.Control
                            style={{ width: '100%' }}
                            type='date'
                            placeholder='프로젝트 시작 날짜'
                            value={projectStart}
                            onChange={onChangeStart}
                        />
                    </div>
                    <div className='mb-2'>
                        <Form.Control
                            style={{ width: '100%' }}
                            type='date'
                            placeholder='프로젝트 종료 날짜'
                            value={projectEnd}
                            onChange={onChangeEnd}
                        />
                    </div>
                    <div className='mb-3 text-center'>
                        <React.Fragment>
                            <Button variant='primary' onClick={() => handleSubmit()}>
                                확인
                            </Button>{' '}
                            <Button variant='secondary' onClick={() => handleCancel()}>
                                취소
                            </Button>{' '}
                        </React.Fragment>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className='mb-3 text-center'>
                {dbItem.length < 10 && (
                    <Button variant='primary' onClick={AddInput}>
                        +
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ProjectDetail;
