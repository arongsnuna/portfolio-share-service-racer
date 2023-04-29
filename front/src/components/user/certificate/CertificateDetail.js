import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as Api from '../../../api';

import CertificateForm from './CertificateForm';
import CertificateP from './CertificateP';

function CertificateDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false); // 추가 버튼 클릭 유무
    const [isEdit, setIsEdit] = useState(false); // 편집 버튼 클릭 유무
    const [currentEditId, setcurrentEditId] = useState(''); // Edit 버튼을 클릭 시 버튼 표시를 구분하기 위한 값

    const [certName, setCertName] = useState(''); // 자격증 명
    const [certAcDate, setcertAcDate] = useState(''); // 취득일자

    const onChangeName = (e) => {
        setCertName(e.target.value);
    };

    const onChangeDate = (e) => {
        setcertAcDate(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setCertName('');
        setcertAcDate('');
    };

    const fetchCert = async (ownerId) => {
        try {
            const { userId } = ownerId;
            // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
            const res = await Api.get('users', userId);
            // 사용자 정보는 response의 data임.
            const ownerData = res.data.certs;
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
                // "cert/user_id" 엔드포인트로 post요청함.
                await Api.post(`cert/`, {
                    certName,
                    certAcDate,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchCert({ userId });

                setCertName('');
                setcertAcDate('');
            } catch (err) {
                console.log('자격증 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                // "cert/user_id/cert_id" 엔드포인트로 put요청함.
                await Api.put(`cert/${portfolioOwnerId}/${item._id}`, {
                    certName,
                    certAcDate,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchCert({ userId });
            } catch (err) {
                console.log('자격증 수정에 실패하였습니다.', err);
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
        setCertName(item.certName);
        setcertAcDate(item.certAcDate);
        setcurrentEditId(item._id);
        setIsEdit(true);
    };

    const handleCancel = () => {
        fetchCert({ userId });
        setIsToggle(false);
        setIsEdit(false);
    };

    const handleDelete = async (id) => {
        try {
            // "cert/user_id/cert_id" 엔드포인트로 delete 요청함.
            await Api.delete(`cert/${portfolioOwnerId}/${id}`);

            fetchCert({ userId });
        } catch (err) {
            console.log('자격증 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchCert({ userId });
    }, [userId]);

    const formSendFunction = { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDate };
    const currentData = { certName, certAcDate, currentEditId };
    const pSendFunction = { handleEdit };
    const isFlag = { isEditable };

    return (
        <div>
            {dbItem.map((item) => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <CertificateP pSendFunction={pSendFunction} isFlag={isFlag} item={item} />
                    ) : (
                        <CertificateForm formSendFunction={formSendFunction} currentData={currentData} item={item} />
                    )}
                </div>
            ))}
            {isToggle === true ? (
                <div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='text' placeholder='자격증 명' value={certName} onChange={onChangeName} />
                    </div>
                    <div className='mb-2'>
                        <Form.Control style={{ width: '100%' }} type='date' placeholder='취득일자' value={certAcDate} onChange={onChangeDate} />
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
                // <CertificateForm formSendFunction={formSendFunction} currentData={currentData} item={item} />
                ''
            )}
            {isEditable && (
                <div className='mb-3 text-center'>
                    {dbItem.length < 10 && (
                        <Button variant='primary' onClick={AddInput} disabled={isToggle || isEdit ? true : false}>
                            +
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CertificateDetail;
