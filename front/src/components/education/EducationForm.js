import React from 'react';
import { Button, Form } from 'react-bootstrap';

function EducationForm({ formSendFunction, currentData, isFlag, item }) {
    const {
        handleSubmit,
        handleCancel,
        handleDelete,
        onChangeSchool,
        onChangeMajor,
        onChangeEnterDate,
        onChangeGraduateDate,
        onChangeDegree,
    } = formSendFunction;
    const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree, currentEditId } = currentData;
    const { isDateValid } = isFlag;

    return (
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
                <Form.Control
                    style={{ width: '100%' }}
                    type='text'
                    placeholder='전공'
                    value={eduMajor}
                    onChange={onChangeMajor}
                />
            </div>
            <div className='mb-2'>
                <Form.Control
                    style={{ width: '100%' }}
                    type='date'
                    placeholder='입학일자'
                    value={eduEnterDate}
                    onChange={onChangeEnterDate}
                />
            </div>
            <div className='mb-2'>
                <Form.Control
                    style={{ width: '100%' }}
                    type='date'
                    placeholder='졸업일자'
                    value={eduGraduateDate}
                    onChange={onChangeGraduateDate}
                />
                {eduEnterDate && eduGraduateDate && !isDateValid && (
                    <Form.Text className='date-success'>입학날짜보다 졸업일자가 이전입니다.</Form.Text>
                )}
            </div>
            <div className='mb-2'>
                <Form.Control
                    style={{ width: '100%' }}
                    type='text'
                    placeholder='학위'
                    value={eduDegree}
                    onChange={onChangeDegree}
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
    );
}

export default EducationForm;
