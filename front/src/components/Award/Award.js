import React from 'react';
import { Card, Row } from 'react-bootstrap';
import AwardContent from './AwardContent';

function Award({ portfolioOwnerId }) {
    return (
        <Card className='ms-3' style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'> 수상 이력 </Card.Title>
            <Card.Body>
                <Row>
                    <AwardContent portfolioOwnerId={portfolioOwnerId} />
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Award;
