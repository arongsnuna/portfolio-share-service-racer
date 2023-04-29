import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

function AwardContent({ portfolioOwnerId }) {
    const [dbItem, setDbItem] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [save, setSave] = useState(false);
    const [edit, setEdit] = useState('');

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
        setToggle(true);

        setAwardName('');
        setAwardDate('');
        setAwardInstitution('');
        setAwardDescription('');
    };

    const certfetch = async (ownerId) => {
        const { userId } = ownerId;
        const res = await Api.get('users', userId);
        const ownerData = res.data.awards;
        setDbItem(ownerData);
    };

    const userId = portfolioOwnerId;

    useEffect(() => {
        certfetch({ userId });
    }, [userId, save, toggle]);

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

                setSave(true);
                setToggle(false);

                certfetch({ userId });

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

                setToggle(false);
                certfetch({ userId });
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

        setEdit(item.id);
    };

    const handleCancel = () => {
        certfetch({ userId });
        setToggle(false);
    };

    const handleDelete = async (id) => {
        try {
            await Api.delete(`award/${portfolioOwnerId}/${id}`);
            certfetch({ userId });
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
                                <div className='mb-3 text-center'>
                                    <Button variant='outline-info' onClick={() => handleEdit(item._id)}>
                                        편집
                                    </Button>
                                    <br />
                                    <hr className='one' />
                                </div>
                            </p>
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
                                {edit !== item.id ? (
                                    <React.Fragment>
                                        <Button variant='pimary' onClick={() => handleSubmit(item._id)}>
                                            확인
                                        </Button>{' '}
                                        <Button variant='secondary' onClick={() => handleCancel()}>
                                            취소
                                        </Button>{' '}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Button variant='primary' onClick={() => handleSubmit(item._id)}>
                                            확인
                                        </Button>{' '}
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

            {toggle === true ? (
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
                <Button variant='primary' onClick={AddInput}>
                    +
                </Button>
            </div>
        </div>
    );
}

export default AwardContent;
