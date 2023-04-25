import React from 'react';
import { Card, Row } from 'react-bootstrap';
import CertificateDetail from './CertificateDetail';

function EducationCreate() {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'>자격증</Card.Title>
            <Card.Body>
                <Row>
                    <div>
                        <CertificateDetail />
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default EducationCreate;
