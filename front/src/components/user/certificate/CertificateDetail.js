import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function CertificateDetail() {
    const [inputItems, setInputItems] = useState([]);
    const [inputAddId, setInputAddId] = useState(0);
    const [originItems, setOriginItems] = useState([]);

    const AddInput = () => {
        const input = {
            id: inputAddId,
            certName: '',
            certAcdate: '',
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

    const handelEdit = (index) => {
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
                                {item.certName ? item.certName : '미입력'}
                                <br />
                                {item.certAcdate ? item.certAcdate : '미입력'}
                                <br />
                                <Button className='position-absolute end-0 translate-middle' variant='outline-primary' onClick={() => handelEdit(index)}>
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
                                    placeholder='자격증 명'
                                    value={item.certName}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, certName: e.target.value } : prevItem)))
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    type='date'
                                    placeholder='취득일자'
                                    value={item.certAcdate}
                                    onChange={(e) =>
                                        setInputItems((prevInputItems) => prevInputItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, certAcdate: e.target.value } : prevItem)))
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

export default CertificateDetail;
