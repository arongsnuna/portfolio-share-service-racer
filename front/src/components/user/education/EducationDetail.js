import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as Api from '../../../api';

function EducationDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false); // 추가 버튼 클릭 유무
    const [currentEditId, setcurrentEditId] = useState(''); // 수정 버튼 클릭 유무

    const [eduSchool, setEduSchool] = useState(''); // 학교이름
    const [eduMajor, setEduMajor] = useState(''); // 전공
    const [eduEnter, setEduEnter] = useState(''); // 입학일자
    const [eduGraduate, setEduGraduate] = useState(''); // 졸업일자
    const [eduDegree, setEduDegree] = useState(''); // 학위

    const isDateValid = eduEnter < eduGraduate;

    const onChangeSchool = (e) => {
        setEduSchool(e.target.value);
    };

    const onChangeMajor = (e) => {
        setEduMajor(e.target.value);
    };

    const onChangeEnter = (e) => {
        setEduEnter(e.target.value);
    };

    const onChangeGraduate = (e) => {
        setEduGraduate(e.target.value);
    };

    const onChangeDegree = (e) => {
        setEduDegree(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setEduSchool('');
        setEduMajor('');
        setEduEnter('');
        setEduGraduate('');
        setEduDegree('');
    };

    const fetchCert = async (ownerId) => {
        try {
            const { userId } = ownerId;
            // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
            const res = await Api.get('users', userId);
            // 사용자 정보는 response의 data임.
            const ownerData = res.data.educations;
            // portfolioOwner을 해당 사용자 정보로 세팅함.
            setDbItem(ownerData);
        } catch (err) {
            console.log('DB 불러오기를 실패하였습니다.', err);
        }
    };

    const userId = portfolioOwnerId;

    const handleSubmit = async (id) => {
        const item = dbItem.filter((item) => item._id === id)[0];

        if (item === undefined || item.isSave === false) {
            try {
                if (isDateValid) {
                    // "education/user_id" 엔드포인트로 post요청함.
                    await Api.post(`educations/${portfolioOwnerId}`, {
                        eduSchool,
                        eduMajor,
                        eduEnter,
                        eduGraduate,
                        eduDegree,
                    });

                    setIsToggle(false);

                    fetchCert({ userId });

                    setEduSchool('');
                    setEduMajor('');
                    setEduEnter('');
                    setEduGraduate('');
                    setEduDegree('');
                }
            } catch (err) {
                console.log('학위 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                // "education/user_id/cert_id" 엔드포인트로 put요청함.
                await Api.put(`educations/${portfolioOwnerId}/${item._id}`, {
                    eduSchool,
                    eduMajor,
                    eduEnter,
                    eduGraduate,
                    eduDegree,
                });

                setIsToggle(false);
                fetchCert({ userId });
            } catch (err) {
                console.log('학위 수정에 실패하였습니다.', err);
            }
        }
    };

    const handleEdit = (id) => {
        setDbItem((prevItems) => {
            return prevItems.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        isEdit: true,
                    };
                } else {
                    return item;
                }
            });
        });

        const item = dbItem.filter((item) => item._id === id)[0];
        setEduSchool(item.eduSchool);
        setEduMajor(item.eduMajor);
        setEduEnter(item.eduStart);
        setEduGraduate(item.eduEnd);
        setEduDegree(item.eduDegree);
        setcurrentEditId(item.id);
    };

    const handleCancel = () => {
        fetchCert({ userId });
        setIsToggle(false);
    };

    const handleDelete = async (id) => {
        try {
            // "education/user_id/cert_id" 엔드포인트로 delete 요청함.
            await Api.delete(`educations/${portfolioOwnerId}/${id}`);

            fetchCert({ userId });
        } catch (err) {
            console.log('학위 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchCert({ userId });
    }, [userId]);

    return (
        <div>
            {dbItem.map((item) => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <div>
                            <p>
                                {item.eduSchool}
                                <br />
                                {item.eduMajor}
                                <br />
                                {item.eduStart}
                                <br />
                                {item.eduEnd}
                                <br />
                                {item.eduDegree}
                                <br />
                            </p>
                            <br />
                            {isEditable && (
                                <Button
                                    className='position-absolute end-0 translate-middle'
                                    variant='outline-primary'
                                    onClick={() => handleEdit(item._id)}>
                                    Edit
                                </Button>
                            )}
                            <br />
                            <hr className='one' />
                        </div>
                    ) : (
                        <div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='학교이름'
                                    value={eduSchool}
                                    onChange={onChangeSchool}
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control style={{ width: '100%' }} type='text' placeholder='전공' value={eduMajor} onChange={onChangeMajor} />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='입학일자'
                                    value={eduEnter}
                                    onChange={onChangeEnter}
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='졸업일자'
                                    value={eduGraduate}
                                    onChange={onChangeGraduate}
                                />
                                {!isDateValid && <Form.Text className='date-success'>입학날짜보다 졸업일자가 이전입니다.</Form.Text>}
                            </div>
                            <div className='mb-2'>
                                <Form.Control style={{ width: '100%' }} type='text' placeholder='학위' value={eduDegree} onChange={onChangeDegree} />
                            </div>
                            <div className='mb-3 text-center'>
                                {currentEditId !== item._id ? (
                                    <React.Fragment>
                                        <Button variant='primary' onClick={() => handleSubmit(item._id)}>
                                            확인
                                        </Button>
                                        <Button variant='secondary' onClick={() => handleCancel()}>
                                            취소
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Button variant='primary' onClick={() => handleSubmit(item._id)}>
                                            확인
                                        </Button>
                                        <Button variant='danger' onClick={() => handleDelete(item._id)}>
                                            삭제
                                        </Button>
                                        <Button variant='secondary' onClick={() => handleCancel()}>
                                            취소
                                        </Button>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {isToggle === true ? (
                <div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='학교이름' value={eduSchool} onChange={onChangeSchool} />
                    </div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='전공' value={eduMajor} onChange={onChangeMajor} />
                    </div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='date' placeholder='입학일자' value={eduEnter} onChange={onChangeEnter} />
                    </div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='date' placeholder='졸업일자' value={eduGraduate} onChange={onChangeGraduate} />
                        {!isDateValid && <Form.Text className='date-success'>입학날짜보다 졸업일자가 이전입니다.</Form.Text>}
                    </div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='학위' value={eduDegree} onChange={onChangeDegree} />
                    </div>
                    <div className='mb-3 text-center'>
                        <React.Fragment>
                            <Button variant='primary' onClick={() => handleSubmit()}>
                                확인
                            </Button>
                            <Button variant='secondary' onClick={() => handleCancel()}>
                                취소
                            </Button>
                        </React.Fragment>
                    </div>
                </div>
            ) : (
                ''
            )}
            {isEditable && (
                <div className='mb-3 text-center'>
                    {dbItem.length < 10 && (
                        <Button variant='primary' onClick={AddInput} disabled={isToggle ? true : false}>
                            +
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default EducationDetail;
