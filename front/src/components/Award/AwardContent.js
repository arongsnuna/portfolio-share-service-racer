import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

function AwardContent({ portfolioOwnerId }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const [editCurrentId, setEditCurrentId] = useState('');

    const [awardName, setAwardName] = useState('');
    const [awardDate, setAwardDate] = useState('');
    const [awardInstitution, setAwardInstitution] = useState('');
    const [awardDescription, setAwardDescription] = useState('');

    const onChangeName = (e) => {
        setAwardName(e.target.value);
    };

    const onChangeDate = (e) => {
        setAwardDate(e.target.value);
    };

    const onChangeInstitution = (e) => {
        setAwardInstitution(e.target.value);
    };

    const onChangeDescription = (e) => {
        setAwardDescription(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setAwardName('');
        setAwardDate('');
        setAwardInstitution('');
        setAwardDescription('');
    };

    const fetchCert = async (ownerId) => {
        try {
            const { userId } = ownerId;
            const res = await Api.get('users', userId);
            const ownerData = res.data.awards;
            setDbItem(ownerData);
        } catch (err) {
            console.log('사용자 데이터 불러오기에 실패하였습니다.', err);
        }
    };

    const userId = portfolioOwnerId;

    useEffect(() => {
        fetchCert({ userId });
    }, [userId, isToggle]);

    const handleSubmit = async (id) => {
        const item = dbItem.filter((item) => item._id === id)[0];

        if (item === undefined || item.isSave === false) {
            try {
                await Api.post(`award/${portfolioOwnerId}`, {
                    awardName,
                    awardDate,
                    awardInstitution,
                    awardDescription,
                });

                setIsToggle(false);

                fetchCert({ userId });

                setAwardName('');
                setAwardDate('');
                setAwardInstitution('');
                setAwardDescription('');
            } catch (err) {
                console.log('수상이력 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                await Api.put(`award/${portfolioOwnerId}/${item._id}`, {
                    awardName,
                    awardDate,
                    awardInstitution,
                    awardDescription,
                });

                setIsToggle(false);
                fetchCert({ userId });
            } catch (err) {
                console.log('수상이력 수정에 실패하였습니다.', err);
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
        setAwardName(item.awardName);
        setAwardDate(item.awardDate);
        setAwardInstitution(item.awardInstitution);
        setAwardDescription(item.awardDescription);

        setEditCurrentId(item.id);
    };

    const handleCancel = () => {
        fetchCert({ userId });
        setIsToggle(false);
    };

    const handleDelete = async (id) => {
        try {
            await Api.delete(`award/${portfolioOwnerId}/${id}`);
            fetchCert({ userId });
        } catch (err) {
            console.log('수상이력 삭제에 실패하였습니다.', err);
        }
    };

    return (
        <div>
            {dbItem.map((item) => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <div>
                            <p>
                                {item.awardName}
                                <br />
                                {item.awardDate}
                                <br />
                                {item.awardInstitution}
                                <br />
                                {item.awardDescription}
                                <br />
                            </p>
                            <div className='mb-3 text-center'>
                                <Button variant='outline-info' onClick={() => handleEdit(item._id)}>
                                    편집
                                </Button>
                                <br />
                            </div>
                            <hr className='one' />
                        </div>
                    ) : (
                        <div>
                            <Form.Group className='mb-2'>
                                <Form.Control style={{ width: '100%' }} type='text' placeholder='수상명' value={awardName} onChange={onChangeName} />
                            </Form.Group>

                            <Form.Group className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='Date'
                                    placeholder='수상일자'
                                    value={awardDate}
                                    onChange={onChangeDate}
                                />
                            </Form.Group>

                            <Form.Group className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='수상기관'
                                    value={awardInstitution}
                                    onChange={onChangeInstitution}
                                />
                            </Form.Group>

                            <Form.Group className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='수여내용'
                                    value={awardDescription}
                                    onChange={onChangeDescription}
                                />
                            </Form.Group>

                            <div className='mb-3 text-center'>
                                {editCurrentId !== item.id ? (
                                    <React.Fragment>
                                        <Button variant='pimary' onClick={() => handleSubmit(item._id)}>
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

            {isToggle === true ? (
                <div>
                    <Form.Group className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='수상명' value={awardName} onChange={onChangeName} />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='date' placeholder='수상일자' value={awardDate} onChange={onChangeDate} />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Control
                            style={{ width: '100%' }}
                            type='text'
                            placeholder='수상기관'
                            value={awardInstitution}
                            onChange={onChangeInstitution}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Control
                            style={{ width: '100%' }}
                            type='text'
                            placeholder='수여내용'
                            value={awardDescription}
                            onChange={onChangeDescription}
                        />
                    </Form.Group>

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

            <div className='mb-3 text-center'>
                <Button variant='primary' onClick={AddInput} disabled={isToggle ? true : false}>
                    +
                </Button>
            </div>
        </div>
    );
}

export default AwardContent;
