import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function EducationDetail() {
    const [inputItems, setInputItems] = useState([]);
    const [inputAddId, setInputAddId] = useState(0);
    const [originItems, setOriginItems] = useState([]);

    const AddInput = () => {
        const input = {
            id: inputAddId,
            eduSchool: '',
            eduMajor: '',
            eduStart: '',
            eduEnd: '',
            eduDegree: '',
            isSubmit: false,
            isEdit: false,
        };

        setInputItems((prevInputItems) => [...prevInputItems, input]);
        setInputAddId((prevInputAddId) => prevInputAddId + 1);
    };

    const handleSubmit = (index) => {
        const newItem = { ...inputItems[index], isSubmit: true, isEdit: false };
        const newItems = [...inputItems];
        newItems.splice(index, 1, newItem);
        setInputItems(newItems);
    };

    const handleEdit = (index) => {
        const newItem = { ...inputItems[index], isEdit: true };
        const newItems = [...inputItems];
        newItems.splice(index, 1, newItem);
        setInputItems(newItems);
        setOriginItems(inputItems);
    };

    const handleDelete = (id, index) => {
        if (!inputItems[index].isEdit) {
            const newItems = inputItems.filter((item) => item.id !== id);
            setInputItems(newItems);
        } else {
            setInputItems(originItems);
        }
    };

    return (
        <div>
            {inputItems.map((item, index) => (
                <div key={item.id}>
                    {item.isSubmit && item.isEdit === false ? (
                        <div>
                            <p>
                                {item.eduSchool ? item.eduSchool : '미입력'}
                                <br />
                                {item.eduMajor ? item.eduMajor : '미입력'}
                                <br />
                                {item.eduStart ? item.eduStart : '미입력'}
                                <br />
                                {item.eduEnd ? item.eduEnd : '미입력'}
                                <br />
                                {item.eduDegree ? item.eduDegree : '미입력'}
                                <br />
                                <Button className='position-absolute end-0 translate-middle' variant='outline-primary' onClick={() => handleEdit(index)}>
                                    Edit
                                </Button>{' '}
                            </p>
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
                                    value={item.eduSchool}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, eduSchool: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='전공'
                                    value={item.eduMajor}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, eduMajor: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='입학일자'
                                    value={item.eduStart}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, eduStart: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='졸업일자'
                                    value={item.eduEnd}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, eduEnd: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='text'
                                    placeholder='학위'
                                    value={item.eduDegree}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, eduDegree: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-3 text-center'>
                                <React.Fragment>
                                    <Button key={item.id} variant='primary' onClick={() => handleSubmit(index)}>
                                        확인
                                    </Button>{' '}
                                    <Button variant='secondary' onClick={() => handleDelete(item.id, index)}>
                                        취소
                                    </Button>{' '}
                                </React.Fragment>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className='mb-3 text-center'>
                {inputItems.length < 10 && (
                    <Button variant='primary' onClick={AddInput}>
                        +
                    </Button>
                )}
            </div>
        </div>
    );
}

export default EducationDetail;
