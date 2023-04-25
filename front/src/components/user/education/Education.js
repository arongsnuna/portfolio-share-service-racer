import React from 'react';
import { Card, Row } from 'react-bootstrap';
import EducationDetail from './EducationDetail';

function EducationCreate() {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'>학력</Card.Title>
            <Card.Body>
                <Row>
                    <div>
                        <EducationDetail />
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default EducationCreate;
