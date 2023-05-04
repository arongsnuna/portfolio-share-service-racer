import React from 'react';
import { Card, Row } from 'react-bootstrap';
import EducationDetail from './EducationDetail';

function Education({ portfolioOwnerId, isEditable }) {
    return (
        <Card className='mb-2 ms-3 mr-5' style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'>학력</Card.Title>
            <Card.Body>
                <Row>
                    <div>
                        <EducationDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Education;
