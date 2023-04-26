import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function ProjectDetail() {
    const [inputItems, setInputItems] = useState([]);
    const [inputAddId, setInputAddId] = useState(0);
    const [originItems, setOriginItems] = useState([]);

    const AddInput = () => {
        const input = {
            id: inputAddId,
            projectName: '',
            projectStart: '',
            projectEnd: '',
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
                                {item.projectName ? item.projectName : '미입력'}
                                <br />
                                {item.projectStart ? item.projectStart : '미입력'}
                                <br />
                                {item.projectEnd ? item.projectEnd : '미입력'}
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
                                    placeholder='프로젝트 명'
                                    value={item.projectName}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, projectName: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='프로젝트 시작 날짜'
                                    value={item.projectStart}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, projectStart: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='프로젝트 종료 날짜'
                                    value={item.projectEnd}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, projectEnd: e.target.value } : prevItem)))
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

export default ProjectDetail;
