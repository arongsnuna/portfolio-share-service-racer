import React from 'react';
import { Button, Form } from 'react-bootstrap';

function ProjectForm({ formSendFunction, currentData, item }) {
    const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeStartDate, onChangeEndDate, onChangeDescription } = formSendFunction;
    const { projectName, projectStartDate, projectEndDate, projectDescription, currentEditId } = currentData;

    return (
        <div>
            <div>
                <div className='mb-2'>
                    <Form.Control style={{ width: '100%' }} type='text' placeholder='프로젝트 명' value={projectName} onChange={onChangeName} />
                </div>
                <div className='mb-2'>
                    <Form.Control
                        style={{ width: '100%' }}
                        type='date'
                        placeholder='프로젝트 시작일자'
                        value={projectStartDate}
                        onChange={onChangeStartDate}
                    />
                </div>
                <div className='mb-2'>
                    <Form.Control
                        style={{ width: '100%' }}
                        type='date'
                        placeholder='프로젝트 종료일자'
                        value={projectEndDate}
                        onChange={onChangeEndDate}
                    />
                </div>
                <div className='mb-2'>
                    <Form.Control
                        style={{ width: '100%' }}
                        type='text'
                        placeholder='프로젝트 설명'
                        value={projectDescription}
                        onChange={onChangeDescription}
                    />
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
        </div>
    );
}

export default ProjectForm;
