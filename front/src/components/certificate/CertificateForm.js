import React from 'react';
import { Button, Form } from 'react-bootstrap';

function CertificateForm({ formSendFunction, currentData, item }) {
    const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDate } = formSendFunction;
    const { certName, certAcDate, currentEditId } = currentData;

    return (
        <div>
            <div>
                <div className='mb-2'>
                    <Form.Control
                        style={{ width: '100%' }}
                        type='text'
                        placeholder='자격증 명'
                        value={certName}
                        onChange={onChangeName}
                    />
                </div>
                <div className='mb-2'>
                    <Form.Control
                        style={{ width: '100%' }}
                        type='date'
                        placeholder='취득일자'
                        value={certAcDate}
                        onChange={onChangeDate}
                    />
                </div>
                <div className='mb-3 text-center'>
                    {currentEditId !== item._id ? (
                        <React.Fragment>
                            <Button className='me-2' variant='primary' onClick={() => handleSubmit(item._id)}>
                                확인
                            </Button>
                            <Button variant='secondary' onClick={() => handleCancel()}>
                                취소
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button className='me-2' variant='primary' onClick={() => handleSubmit(item._id)}>
                                확인
                            </Button>
                            <Button className='me-2' variant='danger' onClick={() => handleDelete(item._id)}>
                                삭제
                            </Button>
                            <Button variant='secondary' onClick={() => handleCancel()}>
                                취소
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CertificateForm;
